const countriesFixture = require('../../fixtures/countries')

function countries(req, res) {
  res.jsonp({
    data: countriesFixture
  })
}

module.exports = countries
