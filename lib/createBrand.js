const brandRequestObject = require('./brandRequestObject')

module.exports = function(client, brand) {
  return client.request(
    `mutation {
      createBrand (
        ${brandRequestObject(brand)}
      ) {
        id
      }
    }`,
    Object.assign({}, brand)
  )
}
