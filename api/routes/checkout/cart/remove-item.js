const cart = require('../../../fixtures/cart')

function removeItem(req, res) {
  const itemIndex = cart.items.findIndex((item) => item.id === req.params.id)

  if (itemIndex > -1) {
    cart.items.splice(itemIndex, 1)

    const total = cart.items.reduce((total, item) => {
      const variant = item.product.variants.find(
        (x) => x.id === item.variant_id
      )
      const price = variant.discount_price || variant.price
      total += price * item.quantity
      return total
    }, 0)

    const itemsQty = cart.items.length

    cart.grand_total = total.toFixed(4)
    cart.formatted_grand_total = `${total} грн`
    cart.items_qty = itemsQty.toFixed(4)
  }

  res.jsonp({
    data: cart
  })
}

module.exports = removeItem
