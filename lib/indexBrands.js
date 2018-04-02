require('dotenv').config()

const GraphQLClient = require('graphql-request').GraphQLClient
const createBrand = require('./createBrand')
const updateBrand = require('./updateBrand')
const getBrand = require('./getBrand')
const compareBrands = require('./compareBrands')

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
            .then(data => console.log(data))
            .catch(error => console.log(error))
        } else {
          if (compareBrands(data.Brand, brand) !== true) {
            updateBrand(client, data.Brand.id, brand)
              .then(data => console.log(data))
              .catch(error => console.log(error))
          }
        }
      })
      .catch(error => console.log(error))
  })
}
