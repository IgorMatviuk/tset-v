const _cloneDeep = require('lodash.clonedeep')
const shortid = require('shortid')

const { products } = require('../../../factories')
const cart = require('../../../fixtures/cart')

const byKey = (key, value) => (item) => item[key] === value

function add(req, res) {
  const id = req.params.id

  const productById = byKey('variant_id', id)
  const existedProduct = cart.items.find(productById)

  if (existedProduct) {
    existedProduct.quantity += 1
  } else {
    const targetProductById = byKey('id', id)
    const targetProduct = products.find((product) =>
      product.variants.find(targetProductById)
    )
    const cloneProduct = _cloneDeep(targetProduct)
    const nextItemId = shortid.generate()

    cart.items.push({
      id: nextItemId,
      variant_id: id,
      product: { ...cloneProduct },
      quantity: 1
    })
  }

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

module.exports = add
