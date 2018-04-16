require('dotenv').config()

const Raven = require('raven')
const GraphQLClient = require('graphql-request').GraphQLClient
const createBrand = require('./createBrand')
const updateBrand = require('./updateBrand')
const getBrand = require('./getBrand')
const compareBrands = require('./compareBrands')

Raven.config(process.env.SENTRY_DSN, {
  sendTimeout: 5,
  sampleRate: 0.5
}).install()

module.exports = brands => {
  const client = new GraphQLClient(process.env.GRAPHQL_URL, {
    headers: {
      Authorization: `Bearer ${process.env.GRAPHQL_AUTH_TOKEN}`
    }
  })

  return brands.forEach(brand => {
    getBrand(client, brand.objectID)
      .then(data => {
        if (!data.Brand) {
          createBrand(client, brand)
        } else {
          if (compareBrands(data.Brand, brand) !== true) {
            updateBrand(client, data.Brand.id, brand)
          }
        }
      })
      .catch(error => Raven.captureException(error))
  })
}
