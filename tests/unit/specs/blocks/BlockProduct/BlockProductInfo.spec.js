import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { BButton, BTable } from 'bootstrap-vue'

import BlockProductInfo from '@/components/blocks/BlockProduct/BlockProductInfo'

import { mutations as productMutations } from '@/store/product'
import { mutations as uiMutations } from '@/store/ui'
import { actionTypes as cartActionTypes } from '@/store/cart'
import { mutationTypes as localStorageMutationTypes } from '@/store/localStorage'

import createFactory from '@/api/helpers/factory'
import productAttrs from '@/api/factories/product'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('BButton', BButton)
localVue.component('BTable', BTable)

describe('BlockProductInfo', () => {
  let store
  let products
  let regularProduct
  let outOfStockProduct

  function createProductInfo(productProp, mocks = {}) {
    const wrapper = mount(BlockProductInfo, {
      localVue,
      store,
      propsData: {
        page: 'product',
        item: productProp,
        links: {
          prev: 'prev-product-slug',
          next: 'next-product-slug'
        }
      },
      mocks: {
        $route: {
          name: null,
          params: {
            pathMatch: productProp.variants[0].url_key
          }
        },
        $i18n: {
          path: (str) => str
        },
        ...mocks
      },
      stubs: ['svg-icon', 'NuxtLink', 'BCollapse']
    })

    return wrapper
  }

  beforeEach(() => {
    products = createFactory(productAttrs, 12)
    regularProduct = products.find((product) => product.in_stock)
    outOfStockProduct = products.find((product) => !product.in_stock)

    store = new Vuex.Store({
      state: {
        pageType: 'product'
      },
      modules: {
        localStorage: {
          namespaced: true,
          state: {
            cartId: null
          },
          mutations: {
            [localStorageMutationTypes.SET_CART_ID]: jest.fn()
          }
        },
        cart: {
          namespaced: true,
          state: {
            cartData: {}
          },
          actions: {
            [cartActionTypes.ADD_ITEM]: jest.fn()
          }
        },
        product: {
          namespaced: true,
          state: {
            selectedSize: null,
            selectedColor: null,
            activeVariant: regularProduct.variants[0]
          },
          mutations: { ...productMutations }
        },
        ui: {
          namespaced: true,
          mutations: { ...uiMutations }
        }
      }
    })
  })

  test('renders component itself', () => {
    const wrapper = createProductInfo(regularProduct, { $t: (path) => path })
    expect(wrapper.find('.product-info').element).toBeVisible()
  })

  test('calling onSelectSize updates selectedSize', () => {
    const wrapper = createProductInfo(regularProduct, { $t: (path) => path })

    expect(wrapper.vm.selectedSize).toBeNull()

    const btnSelectSize = wrapper.find(
      '.product-info__size-item:not(.product-info__size-item--active)'
    )
    btnSelectSize.trigger('click')
    expect(wrapper.vm.selectedSize.id).toBeDefined()
  })

  test('emits "add-to-cart" (default attribute options)', async () => {
    const mockEventBus = {
      $emit: jest.fn()
    }

    const wrapper = createProductInfo(regularProduct, {
      $bus: mockEventBus,
      $t: (path) => path
    })

    const btnAddToCart = wrapper.find('.product-info__add')
    expect(btnAddToCart.exists()).toBe(true)

    btnAddToCart.trigger('click')
    await wrapper.vm.$nextTick()

    expect(mockEventBus.$emit).toBeCalled()
  })

  test('emits "add-to-cart" (user-selected attribute options)', async () => {})

  test.skip('emits "stock-subscribe" event on onStockSubscribe call', async () => {
    const mockEventBus = {
      $emit: jest.fn()
    }

    const wrapper = createProductInfo(outOfStockProduct, {
      $bus: mockEventBus,
      $t: (path) => path
    })

    const btnStockSuscribe = wrapper.find('.product-info__add--no-stock')
    expect(btnStockSuscribe.exists()).toBe(true)

    btnStockSuscribe.trigger('click')
    await wrapper.vm.$nextTick()

    expect(mockEventBus.$emit).toBeCalledWith('stock-subscribe')
  })

  test('emits toggle float panel', async () => {
    const mockEventBus = {
      $emit: jest.fn()
    }

    const wrapper = createProductInfo(outOfStockProduct, {
      $bus: mockEventBus,
      $t: (path) => path
    })

    const btnSizeTable = wrapper.find('.product-info__size-table')
    btnSizeTable.trigger('click')
    const payload = true

    await wrapper.vm.$nextTick()
    expect(mockEventBus.$emit).toBeCalledWith('float-panel:toggle', payload)
  })
})
