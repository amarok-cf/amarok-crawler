const brandRequestObject = require('./brandRequestObject')

module.exports = function(client, id, brand) {
  return client.request(
    `mutation {
      updateBrand (
        id: "${id}"
        ${brandRequestObject(brand)}
      ) {
        id
      }
    }`
  )
}
