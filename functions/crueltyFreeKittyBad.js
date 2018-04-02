process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const axios = require('axios')
const cheerio = require('cheerio')
const R = require('ramda')
const indexBrands = require('../lib/indexBrands')

const brands = []
const source =
  'https://www.crueltyfreekitty.com/companies-that-test-on-animals/'

module.exports = () => {
  return axios
    .get(source)
    .then(r => {
      const data = r.data
      const $ = cheerio.load(data)

      const lastUpdated = $('.entry-top > span.meta-date').text()
      const isCrueltyFree = false
      const author = 'Suzi Scheler'

      $('ul.skull > li').each((i, el) => {
        $(el).each((i, el) => {
          let title

          console.log($(el).text())

          if ($(el).find('a').length > 0) {
            title = $(el)
              .find('a')
              .text()
          } else {
            title = $(el).text()
          }

          const url = $(el)
            .find('a')
            .attr('href')

          const id = Buffer.from(`${title}${source}`, 'utf8').toString('base64')

          let isVegan = null
          let certifiedBy = null
          let notes = []
          let availability = []
          let productTypes = []
          let isNew = false

          brands.push({
            availability,
            description: null,
            isPetaMallPartner: null,
            isUsingPetaLogo: null,
            logoUrl: null,
            productTypes,
            title,
            source,
            isVegan,
            lastUpdated,
            certifiedBy,
            isNew,
            author,
            isCrueltyFree,
            notes,
            objectID: id,
            url: R.isNil(url) ? null : url
          })
        })
      })
    })
    .then(() => {
      indexBrands(brands)
    })
    .catch(error => console.log(error))
}
