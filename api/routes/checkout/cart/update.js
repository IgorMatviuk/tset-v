const cart = require('../../../fixtures/cart')

const byId = (id) => (item) => item.id === id

function update(req, res) {
  // eslint-disable-next-line
  const { item_id } = req.params
  const { variant, quantity } = req.body

  const item = cart.items.find(byId(Number(item_id)))

  if (variant) {
    item.variant_id = variant
  }

  item.quantity = quantity

  const total = cart.items.reduce((total, item) => {
    const variant = item.product.variants.find((x) => x.id === item.variant_id)
    const price = variant.discount_price || variant.price
    total += price * item.quantity
    return total
  }, 0)

  const itemsQty = cart.items.length

  cart.grand_total = total.toFixed(4)
  cart.formatted_grand_total = `${total} грн`
  cart.items_qty = itemsQty.toFixed(4)

  res.jsonp({
    data: cart
  })
}

module.exports = update
