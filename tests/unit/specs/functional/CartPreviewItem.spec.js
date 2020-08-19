import { mount } from '@vue/test-utils'
import _cloneDeep from 'lodash.clonedeep'

import CartPreviewItem from '@/components/functional/CartPreview/CartPreviewItem'

import productAttrs from '@/api/factories/product'
import createFactory from '@/api/helpers/factory'

describe('CartPreviewItem', () => {
  let cartItems
  let regularItem
  let discountItem

  function createPreviewItem(item) {
    const wrapper = mount(CartPreviewItem, {
      propsData: { item },
      mocks: {
        $i18n: {
          path: (str) => str
        }
      },
      stubs: ['NuxtLink', 'svg-icon']
    })

    return wrapper
  }

  beforeEach(() => {
    cartItems = createFactory(productAttrs, 4).map((product, index) => {
      const cartProduct = _cloneDeep(product)
      const cartItem = {
        product: cartProduct,
        variant_id: cartProduct.variants[0].id,
        quantity: index + 1
      }

      return cartItem
    })

    regularItem = cartItems.find((item) => !item.product.discount_price)
    discountItem = cartItems.find((item) => item.product.discount_price)
  })

  test('renders "regular" cart item', () => {
    const wrapper = createPreviewItem(regularItem)

    const options = wrapper.findAll('.cart-preview__option')
    expect(options.length).toEqual(regularItem.product.attributes.length)
  })

  test('renders "discount" cart item', () => {
    const wrapper = createPreviewItem(discountItem)

    expect(wrapper.find('.cart-preview__price--discount').exists()).toBe(true)
  })

  test('renders attribute options', () => {
    const wrapper = createPreviewItem(regularItem)

    const options = wrapper.findAll('.cart-preview__option')
    expect(options.length).toEqual(regularItem.product.attributes.length)
  })
})
