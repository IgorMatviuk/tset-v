import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { BButton } from 'bootstrap-vue'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import _cloneDeep from 'lodash.clonedeep'

import CartPreview from '@/components/functional/CartPreview'
import CartPreviewItem from '@/components/functional/CartPreview/CartPreviewItem'

import {
  mutations as cartMutations,
  actionTypes as cartActionTypes,
  actions as cartActions
} from '@/store/cart'
import { mutations as localStorageMutations } from '@/store/localStorage'

import productAttrs from '@/api/factories/product'
import createFactory from '@/api/helpers/factory'
import cartRoute from '@/api/routes/checkout/cart'
import apiResponse from '@/tests/unit/mocks/api-response'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(PerfectScrollbar)
localVue.component('BButton', BButton)

describe('CartPreview', () => {
  let store
  let mockAddToCart
  let mockEventBus

  beforeEach(() => {
    const { data: cartData } = apiResponse(cartRoute)

    cartData.items = createFactory(productAttrs, 4).map((product, index) => {
      const cartProduct = _cloneDeep(product)
      const cartItem = {
        product: cartProduct,
        variant_id: cartProduct.variants[0].id,
        quantity: index + 1
      }

      return cartItem
    })

    const total = cartData.items.reduce((total, item) => {
      const variant = item.product.variants.find(
        (x) => x.id === item.variant_id
      )
      const price = variant.discount_price || variant.price
      total += price * item.quantity
      return total
    }, 0)

    const itemsQty = cartData.items.length

    cartData.grand_total = total.toFixed(4)
    cartData.formatted_grand_total = `${total} грн`
    cartData.items_qty = itemsQty.toFixed(4)

    const app = {
      $axios: {
        $post: jest.fn().mockResolvedValue({ data: { data: cartData } })
      }
    }

    store = new Vuex.Store({
      modules: {
        cart: {
          namespaced: true,
          state: { cartData, isLoading: false },
          mutations: { ...cartMutations },
          actions: {
            [cartActionTypes.ADD_ITEM]: cartActions[
              cartActionTypes.ADD_ITEM
            ].bind(app)
          }
        },
        localStorage: {
          namespaced: true,
          state: { cartId: null },
          mutations: { ...localStorageMutations }
        }
      }
    })

    mockEventBus = {
      $on: jest.fn().mockImplementation((event, callback) => {
        mockAddToCart = jest.fn().mockImplementation((event, payload) => {
          callback(payload)
        })
      }),
      $off: jest.fn(),
      $emit: jest.fn().mockImplementation((...args) => {
        mockAddToCart(...args)
      })
    }
  })

  function createCartPreview(data = {}) {
    const wrapper = mount(CartPreview, {
      localVue,
      store,
      mocks: {
        $t: (str) => str,
        $bus: mockEventBus,
        $i18n: {
          path: jest.fn()
        }
      },
      stubs: ['svg-icon', 'BPopover', 'NuxtLink', 'CartPreviewItem'],
      data() {
        return data
      }
    })

    return wrapper
  }

  test('renders cart items', () => {
    const wrapper = createCartPreview()

    expect(wrapper.findAllComponents(CartPreviewItem).length).toBeGreaterThan(0)
    expect(wrapper.element).toMatchSnapshot()

    wrapper.destroy()
  })

  test('toggles popover visibility', () => {
    const wrapper = createCartPreview()

    const mouseEvent = new MouseEvent('mouseup', { bubbles: true })
    document.documentElement.dispatchEvent(mouseEvent)
    expect(wrapper.vm.isVisible).toBe(false)

    expect(wrapper.vm.isVisible).toBe(false)
    wrapper.setData({ isVisible: true })
    expect(wrapper.vm.isVisible).toBe(true)

    document.documentElement.dispatchEvent(mouseEvent)
    expect(wrapper.vm.isVisible).toBe(false)
  })

  test('shows popover on "add-to-cart" emit', async () => {
    const wrapper = createCartPreview()

    const variantId = store.state.cart.cartData.items[0].variant_id

    expect(wrapper.vm.isVisible).toBe(false)
    store.dispatch(`cart/${cartActionTypes.ADD_ITEM}`, {
      cartId: null,
      itemId: variantId
    })
    wrapper.vm.$bus.$emit('add-to-cart', variantId)

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isVisible).toBe(true)
    expect(mockAddToCart).toBeCalledWith('add-to-cart', variantId)
  })
})
