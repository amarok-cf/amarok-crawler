const crueltyFreeKitty = require('./sources/crueltyFreeKitty')
const crueltyFreeKittyBad = require('./sources/crueltyFreeKittyBad')

setInterval(async () => {
  console.log('Crawling crueltyFreeKitty()')
  await crueltyFreeKitty()
  console.log('Crawling crueltyFreeKittyBad()')
  await crueltyFreeKittyBad()
}, 15000)
