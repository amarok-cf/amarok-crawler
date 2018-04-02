module.exports = function(client, objectID) {
  return client.request(
    `
    query {
      Brand(objectID: "${objectID}") {
        title
        source
        isVegan
        certifiedBy
        lastUpdated
        isNew
        author
        id
        availability
        description
        isCrueltyFree
        isPetaMallPartner
        isUsingPetaLogo
        logoUrl
        notes
        productTypes
        url
      }
    }`
  )
}
