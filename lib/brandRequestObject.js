module.exports = function(brand) {
  return `
    title: "${brand.title}"
    source: "${brand.source}"
    isVegan:  ${brand.isVegan}
    certifiedBy: "${brand.certifiedBy}"
    lastUpdated: "${brand.lastUpdated}"
    isNew: ${brand.isNew}
    author: "${brand.author}"
    objectID: "${brand.objectID}"
    description: "${brand.description}"
    availability: "${brand.availability}"
    isCrueltyFree: ${brand.isCrueltyFree}
    isPetaMallPartner: ${brand.isPetaMallPartner}
    isUsingPetaLogo: ${brand.isUsingPetaLogo}
    logoUrl: "${brand.logoUrl}"
    notes: "${brand.notes}"
    productTypes: "${brand.productTypes}"
    url: "${brand.url}"`
}
