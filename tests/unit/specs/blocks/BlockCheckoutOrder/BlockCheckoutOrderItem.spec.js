import { mount } from '@vue/test-utils'
import _cloneDeep from 'lodash.clonedeep'

import BlockCheckoutOrderItem from '@/components/blocks/BlockCheckoutOrder/BlockCheckoutOrderItem'

import { actionTypes as cartActionTypes } from '@/store/cart'

import productAttrs from '@/api/factories/product'
import createFactory from '@/api/helpers/factory'

describe('BlockCheckoutOrderItem', () => {
  const updateAction = `cart/${cartActionTypes.UPDATE_ITEM}`
  const removeAction = `cart/${cartActionTypes.REMOVE_ITEM}`

  let cartItems
  let regularItem
  let discountItem
  let mockStore

  function createOrderItem(item) {
    const wrapper = mount(BlockCheckoutOrderItem, {
      propsData: { item, page: 'checkout', index: 0 },
      mocks: {
        $route: {
          name: 'checkoutPage'
        },
        $t: (str) => str,
        $i18n: {
          path: (str) => str
        },
        $store: mockStore
      },
      stubs: ['svg-icon', 'NuxtLink', 'BPopover']
    })

    return wrapper
  }

  beforeEach(() => {
    cartItems = createFactory(productAttrs, 4).map((product, index) => {
      const cartItem = _cloneDeep(product)

      cartItem.quantity = index + 1

      cartItem.attributes.forEach((attribute) => {
        attribute.selected_option = attribute.options[0]
      })

      return cartItem
    })

    const regularProduct = cartItems.find((item) => !item.discount_price)
    regularItem = {
      id: 1,
      product: regularProduct,
      variant_id: regularProduct.variants[0].id,
      quantity: 1
    }

    const discountProduct = cartItems.find((item) => item.discount_price)
    discountItem = {
      id: 2,
      product: discountProduct,
      variant_id: discountProduct.variants[0].id,
      quantity: 2
    }

    mockStore = {
      state: {
        pageType: null,
        localStorage: {
          cartId: 1
        }
      },
      dispatch: jest.fn()
    }
  })

  test('has valid initial structure (regular)', () => {
    const wrapper = createOrderItem(regularItem)
    expect(wrapper).toMatchSnapshot()
  })

  test('has valid initial structure (discount)', () => {
    const wrapper = createOrderItem(discountItem)
    expect(wrapper).toMatchSnapshot()
  })

  test('updates item quantity', () => {
    const wrapper = createOrderItem(regularItem)

    expect(wrapper.vm.item.quantity).toBe(regularItem.quantity)
    const increasedQtyValue = wrapper.vm.item.quantity + 1
    wrapper.vm.onQuantityChange(increasedQtyValue)

    const payload = {
      cartId: wrapper.vm.$store.state.localStorage.cartId,
      itemId: wrapper.vm.item.id,
      body: { quantity: increasedQtyValue }
    }

    expect(mockStore.dispatch).toBeCalledWith(updateAction, payload)
  })

  test('updates item options', () => {
    const wrapper = createOrderItem(regularItem)

    const byCode = (code) => (item) => item.code === code
    const nextActiveItem = (item) => !item.disabled

    const { attributes } = wrapper.vm.item.product

    // On size update
    const sizeAttribute = attributes.find(byCode('size'))
    const nextSizeOption = wrapper.vm
      .mapOptionsWithStatus('size')
      .find(nextActiveItem)

    wrapper.vm.onOptionsChange({
      attributeCode: 'size',
      attributeId: sizeAttribute.id,
      option: nextSizeOption
    })

    const sizeUpdatePayload = {
      cartId: wrapper.vm.$store.state.localStorage.cartId,
      itemId: wrapper.vm.item.id,
      body: {
        variant: wrapper.vm.getIntersectedVariantId(),
        quantity: wrapper.vm.item.quantity
      }
    }

    expect(mockStore.dispatch).toBeCalledWith(updateAction, sizeUpdatePayload)

    // On color update
    // const colorAttribute = attributes.find(byCode('color'))
    // const nextColorOption = wrapper.vm
    //   .mapOptionsWithStatus('color')
    //   .find(nextActiveItem)

    // wrapper.vm.onOptionsChange({
    //   attributeCode: 'color',
    //   attributeId: colorAttribute.id,
    //   option: nextColorOption
    // })

    // const colorUpdatePayload = {
    //   cartId: wrapper.vm.$store.state.localStorage.cartId,
    //   itemId: wrapper.vm.item.id,
    //   body: {
    //     variant: wrapper.vm.getIntersectedVariantId(),
    //     quantity: wrapper.vm.item.quantity
    //   }
    // }

    // expect(mockStore.dispatch).toBeCalledWith(updateAction, colorUpdatePayload)
  })

  test('removes item from cart', () => {
    const wrapper = createOrderItem(regularItem)

    const { id: itemId } = wrapper.vm.item
    const { cartId } = wrapper.vm.$store.state.localStorage

    wrapper.find('.order-item__remove').trigger('click')

    expect(mockStore.dispatch).toBeCalledWith(removeAction, { cartId, itemId })
  })
})
