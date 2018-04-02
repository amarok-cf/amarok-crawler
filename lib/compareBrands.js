const diff = require('deep-diff').diff
const R = require('ramda')
const selectBrandData = require('./selectBrandData')

function isNull(value) {
  return value === 'null'
}

function isEmpty(value) {
  return (
    value.length === 1 && typeof R.is(String, value[0]) && value[0].length === 0
  )
}

function fixValues(value, key, obj) {
  if (R.is(Array, value)) {
    if (isEmpty(value)) {
      obj[key] = []
    }
  } else if (R.is(String, value)) {
    if (isNull(value)) {
      obj[key] = null
    }
  } else {
    obj[key] = value
  }
}

module.exports = (oldBrandDoc, newBrandDoc) => {
  const fixedOldBrandDoc = R.forEachObjIndexed(fixValues, oldBrandDoc)

  if (
    R.equals(selectBrandData(fixedOldBrandDoc), selectBrandData(newBrandDoc))
  ) {
    return true
  } else {
    const changes = diff(
      selectBrandData(fixedOldBrandDoc),
      selectBrandData(newBrandDoc)
    )

    return changes
  }
}
