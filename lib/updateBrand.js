const brandRequestObject = require('./brandRequestObject')

module.exports = function(client, id, brand) {
  return client.request(
    `mutation {
      updateBrand (
        ${brandRequestObject(id, brand)}
      ) {
        id
      }
    }`
  )
}
