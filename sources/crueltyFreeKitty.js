process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const axios = require('axios')
const cheerio = require('cheerio')
const indexBrands = require('../lib/indexBrands')

const brands = []
const source = 'http://www.crueltyfreekitty.com/list-of-cruelty-free-brands/'

module.exports = () => {
  return axios
    .get(source)
    .then(r => {
      const data = r.data
      const $ = cheerio.load(data)

      const lastUpdated = $('.entry-top > span.meta-date').text()
      const isCrueltyFree = true
      const author = 'Suzi Scheler'

      const certifications = {
        'peta-logo-small': 'PETA',
        'Leaping-Bunny-logo-small': 'Leapping Bunny'
      }

      $('.big-list-main p').each((i, el) => {
        $(el)
          .find('a[rel="nofollow"]')
          .each((i, el) => {
            const title = $(el).text()
            const url = $(el).attr('href')

            const id = Buffer.from(`${title}${source}`, 'utf8').toString(
              'base64'
            )

            let isVegan = null
            let certifiedBy = null
            let notes = []
            let availability = []
            let productTypes = []
            let isNew = false
            let nextEl = $(el).next()

            while (!nextEl.is('br')) {
              if (nextEl.is('a') && nextEl.attr('rel') !== 'nofollow') {
                certifiedBy = nextEl.attr('href')
                nextEl = nextEl.next()
              } else if (
                nextEl.is('img') &&
                nextEl.attr('src').includes('new-brand')
              ) {
                isNew = true
                nextEl = nextEl.next()
              } else if (
                nextEl.is('img') &&
                Object.keys(certifications).includes(nextEl.attr('alt'))
              ) {
                certifiedBy = certifications[nextEl.attr('alt')]
                nextEl = nextEl.next()
              } else if (nextEl.is('span.list-note')) {
                notes.push(nextEl.text())
                nextEl = nextEl.next()
              } else if (
                nextEl.is('img') &&
                nextEl.attr('alt') === 'Vegan Brand'
              ) {
                isVegan = true
                nextEl = nextEl.next()
              } else {
                nextEl = $('<br />')
              }
            }

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
              url
            })
          })
      })
    })
    .then(() => indexBrands(brands))
    .catch(error => console.log(error))
}
