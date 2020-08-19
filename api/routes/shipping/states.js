const statesFixture = require('../../fixtures/states')

function states(req, res) {
  res.jsonp({
    data: statesFixture
  })
}

module.exports = states
