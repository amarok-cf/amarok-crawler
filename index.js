const crueltyFreeKitty = require('./functions/crueltyFreeKitty')
const crueltyFreeKittyBad = require('./functions/crueltyFreeKittyBad')

async function crawl() {
  await crueltyFreeKitty()
  await crueltyFreeKittyBad()

  return true
}

crawl()
