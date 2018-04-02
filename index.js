const crueltyFreeKitty = require('./sources/crueltyFreeKitty')
const crueltyFreeKittyBad = require('./sources/crueltyFreeKittyBad')

async function crawl() {
  await crueltyFreeKitty()
  await crueltyFreeKittyBad()

  return true
}

crawl()
