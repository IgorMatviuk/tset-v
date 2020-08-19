import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { BContainer } from 'bootstrap-vue'
import flushPromises from 'flush-promises'

import Catalog from '@/components/views/Catalog'

import {
  mutations as rootMutations,
  mutationTypes as rootMutationTypes
} from '@/store'
import { state as uiState } from '@/store/ui'
import {
  state as catalogState,
  mutations as catalogMutations,
  actions as catalogActions
} from '@/store/catalog'

import createFactory from '@/api/helpers/factory'
import productAttrs from '@/api/factories/product'

import '@/tests/unit/mocks/match-media'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('BContainer', BContainer)

describe('Catalog', () => {
  let store
  let products
  let apiResponse
  let mockScrollTo

  beforeEach(() => {
    products = createFactory(productAttrs, 24)

    store = new Vuex.Store({
      state: {
        locale: 'ru',
        fallbackLocale: 'ru',
        breadcrumb: []
      },
      mutations: {
        ...rootMutations
      },
      modules: {
        ui: {
          namespaced: true,
          state: uiState()
        },
        catalog: {
          namespaced: true,
          state: {
            ...catalogState(),
            currentPage: 1
          },
          mutations: { ...catalogMutations },
          actions: { ...catalogActions }
        }
      }
    })

    apiResponse = {
      data: products,
      meta: {
        current_page: 1,
        total: 6
      }
    }

    Object.defineProperty(store, '$axios', {
      value: {
        $get: () => Promise.resolve(apiResponse)
      }
    })

    mockScrollTo = jest.fn()
  })

  test('renders component itself (desktop)', () => {
    const wrapper = shallowMount(Catalog, {
      localVue,
      store,
      mocks: {
        $t: jest.fn(),
        $i18n: {
          path: (str) => str
        },
        $device: { isMobile: false }
      }
    })

    expect(wrapper.vm.currentPage).toBe(1)
    expect(wrapper.vm.isCategoriesDrawerVisible).toBe(false)
    expect(wrapper.vm.isFiltersDrawerVisible).toBe(false)
    expect(wrapper.vm.catalogDrawersVisibility).toBe(false)
  })

  test('renders component itself (mobile)', () => {
    const wrapper = shallowMount(Catalog, {
      localVue,
      store,
      mocks: {
        $t: jest.fn(),
        $i18n: {
          path: (str) => str
        },
        $device: { isMobile: true }
      }
    })

    expect(wrapper.vm.catalogDrawersVisibility).toBe(true)
  })

  test('fetches products', async () => {
    const wrapper = shallowMount(Catalog, {
      localVue,
      store,
      mocks: {
        $t: jest.fn(),
        $i18n: {
          path: (str) => str
        },
        $device: { isMobile: false },
        $route: {
          query: {
            size: 'XS',
            color: 'Красный',
            pattern: 'Горошек',
            style: 'Нарядный',
            material: 'Вискоза',
            order: 'price-asc'
          },
          path: ''
        },
        $scrollTo: mockScrollTo
      }
    })

    expect(wrapper.vm.isLoading).toBe(false)

    wrapper.vm.fetchProducts()
    expect(wrapper.vm.isLoading).toBe(true)

    await flushPromises()

    expect(wrapper.vm.isLoading).toBe(false)
  })

  test('fetches products with default limit and non-default locale', () => {
    const wrapper = shallowMount(Catalog, {
      localVue,
      store,
      mocks: {
        $t: jest.fn(),
        $i18n: {
          path: (str) => str
        },
        $device: { isMobile: false },
        $route: {
          query: {
            limit: 1
          },
          path: ''
        },
        $scrollTo: mockScrollTo
      }
    })

    wrapper.vm.fetchProducts()
    wrapper.vm.$store.commit(rootMutationTypes.SET_LANG, 'uk')
    wrapper.vm.fetchProducts()
  })

  test('destroy catalog', () => {
    const wrapper = shallowMount(Catalog, {
      localVue,
      store,
      mocks: {
        $t: jest.fn(),
        $i18n: {
          path: (str) => str
        },
        $device: { isMobile: false }
      }
    })

    wrapper.destroy()
  })
})
