const cart = require('../../../fixtures/cart')

function checkout(req, res) {
  res.jsonp({
    data: cart
  })
}

module.exports = checkout
