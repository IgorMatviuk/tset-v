import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import {
  mutationTypes as rootMutationTypes,
  mutations as rootMutations
} from '@/store'

import {
  mutations as searchMutations,
  actions as searchActions,
  actionTypes as searchActionsTypes
} from '@/store/search'

import Search from '@/pages/-search'
import BlockSearchResult from '@/components/blocks/BlockSearchResult'
import BlockSearchResultNotFound from '@/components/blocks/BlockSearchResult/BlockSearchResultNotFound'

import productAttrs from '@/api/factories/product'
import createFactory from '@/api/helpers/factory'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

describe('Search', () => {
  let app
  let store
  let products
  let apiResponse
  let route
  let router
  let mockGetProducts
  let mocksSetBreadcrumbs

  beforeEach(() => {
    products = createFactory(productAttrs, 10)

    apiResponse = {
      data: [...products],
      links: {},
      meta: {
        current_page: 1,
        total: 6
      }
    }

    app = {
      $axios: {
        $get: jest.fn().mockImplementation(() => Promise.resolve(apiResponse))
      },
      i18n: {
        t: (url) => url,
        path: (url) => url
      }
    }

    route = {
      query: {
        q: 'Платья'
      }
    }

    mockGetProducts = searchActions[searchActionsTypes.GET_PRODUCTS].bind(app)
    mocksSetBreadcrumbs = rootMutations[rootMutationTypes.SET_BREADCRUMB]

    store = new Vuex.Store({
      modules: {
        search: {
          namespaced: true,
          state: {
            products: [],
            query: '',
            isLoading: false,
            currentPage: null,
            totalPages: null
          },
          actions: {
            [searchActionsTypes.GET_PRODUCTS]: mockGetProducts
          },
          mutations: { ...searchMutations }
        }
      },
      state: {
        breadcrumb: []
      },
      mutations: {
        [rootMutationTypes.SET_BREADCRUMB]: mocksSetBreadcrumbs
      }
    })

    router = new VueRouter()
  })

  test('has expected structure', async () => {
    const wrapper = shallowMount(Search, {
      localVue,
      store,
      mocks: {
        $scrollTo: () => ''
      }
    })

    await wrapper.vm.$options.fetch({ app, store, route })

    expect(wrapper.element).toMatchSnapshot()
  })

  test('drawing search results', async () => {
    const wrapper = shallowMount(Search, {
      localVue,
      store,
      mocks: {
        $scrollTo: () => ''
      }
    })

    await wrapper.vm.$options.fetch({ app, store, route })
    expect(wrapper.findComponent(BlockSearchResult).exists()).toBe(true)
    expect(wrapper.vm.products.length).toEqual(apiResponse.data.length)
  })

  test('drawing nothing found', () => {
    const wrapper = shallowMount(Search, {
      localVue,
      store,
      mocks: {
        $scrollTo: () => ''
      }
    })

    expect(wrapper.findComponent(BlockSearchResultNotFound).exists()).toBe(true)
    expect(wrapper.vm.products.length).toEqual(0)
  })

  test('change route query', async () => {
    const wrapper = shallowMount(Search, {
      localVue,
      store,
      router,
      mocks: {
        $scrollTo: () => ''
      }
    })

    const query = {
      q: 'брюки'
    }

    wrapper.vm.$router.push({ path: wrapper.vm.$route.path, query })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.products.length).toEqual(apiResponse.data.length)
  })
})
