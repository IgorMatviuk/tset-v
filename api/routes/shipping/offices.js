const officesFixture = require('../../fixtures/offices')

function offices(req, res) {
  res.jsonp({
    data: officesFixture
  })
}

module.exports = offices
