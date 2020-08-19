function checkout(req, res) {
  res.jsonp({
    data: {
      countries: require('../../fixtures/countries'),
      regions: require('../../fixtures/regions')
    }
  })
}

module.exports = checkout
