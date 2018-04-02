const R = require('ramda')

module.exports = brand => {
  const requiredData = [
    'title',
    'source',
    'isVegan',
    'certifiedBy',
    'author',
    'availability',
    'description',
    'isCrueltyFree',
    'isPetaMallPartner',
    'isUsingPetaLogo',
    'notes',
    'productTypes',
    'url'
  ]

  return R.pick(requiredData, brand)
}
