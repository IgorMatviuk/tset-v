const regionsFixture = require('../../fixtures/regions')

function regions(req, res) {
  res.jsonp({
    data: regionsFixture
  })
}

module.exports = regions
