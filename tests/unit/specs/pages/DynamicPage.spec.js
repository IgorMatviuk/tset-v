import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { BContainer } from 'bootstrap-vue'

import DynamicPage from '@/pages/-'
import Catalog from '@/components/views/Catalog'
import Product from '@/components/views/Product'

import {
  state as rootState,
  mutations as rootMutations,
  mutationTypes as rootMutationTypes
} from '@/store'
import {
  state as catalogState,
  mutations as catalogMutations
} from '@/store/catalog'
import {
  state as productState,
  mutations as productMutations
} from '@/store/product'

import '@/tests/unit/mocks/match-media'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('BContainer', BContainer)

describe('DynamicPage', () => {
  let app
  let route
  let store
  let state
  let baseUrl
  // let apiURL
  let apiResponse

  function createDynamicPage(view, page = {}) {
    const wrapper = shallowMount(DynamicPage, {
      localVue,
      store,
      data() {
        return { view, page }
      },
      mocks: {
        $t: (str) => str,
        $i18n: { path: (str) => str },
        $device: { isMobile: false },
        $route: {
          path: page && page.data ? `/${page.data.product.slug}` : '/'
        }
      }
    })

    return wrapper
  }

  beforeEach(() => {
    baseUrl = 'http://localhost:3000'
    process.env.BASE_URL = baseUrl

    app = {
      i18n: {
        t: (str) => str,
        path: (str) => str
      },
      $axios: {
        // $get: jest.fn().mockImplementation(() => Promise.resolve(apiResponse))
        $get: jest.fn().mockImplementation((url) => {
          if (url.includes('not-exist')) {
            return Promise.reject(new Error('Page not found'))
          } else {
            return Promise.resolve(apiResponse)
          }
        })
      }
    }

    route = {
      path: '/some-path',
      query: {}
    }

    const { locale, fallbackLocale, locales } = rootState()
    state = { locale, fallbackLocale, locales }

    store = new Vuex.Store({
      state,
      mutations: { ...rootMutations },
      modules: {
        catalog: {
          namespaced: true,
          state: catalogState(),
          mutations: { ...catalogMutations }
        },
        product: {
          namespaced: true,
          state: productState(),
          mutations: { ...productMutations }
        }
      }
    })
  })

  test('renders Catalog view', () => {
    route.query = { page: 2, limit: 1 }

    // apiURL = `/api/router?url=${route.path.slice(1)}&page=2`

    apiResponse = {
      data: {
        category: { slug: 'some-category' },
        products: [],
        attributes: [],
        breadcrumb: []
      },
      meta: {
        page_type: 'catalog',
        current_page: 2,
        total: 6,
        tags: { seo_text: '' }
      }
    }

    const wrapper = createDynamicPage('Catalog')

    expect(wrapper.findComponent(Catalog).exists()).toBeTruthy()

    const { asyncData } = wrapper.vm.$options
    const ctx = { app, store, route }
    const data = { page: apiResponse, view: 'Catalog' }

    expect(asyncData(ctx)).resolves.toEqual(data)
    // FIXME: uncomment
    // expect(app.$axios.$get).toBeCalledWith(apiURL)
  })

  test('renders Product view (without query params)', () => {
    // apiURL = `/api/router?url=${route.path.slice(1)}`
    route.path = `/uk${route.path}`

    apiResponse = {
      data: {
        product: { variants: [] },
        breadcrumb: []
      },
      meta: {
        page_type: 'product',
        tags: {}
      }
    }

    store.commit(rootMutationTypes.SET_LANG, 'uk')
    const wrapper = createDynamicPage('Product')
    expect(wrapper.findComponent(Product).exists()).toBeTruthy()

    const { asyncData } = wrapper.vm.$options
    const ctx = { app, store, route }
    const data = { page: apiResponse, view: 'Product' }

    expect(asyncData(ctx)).resolves.toEqual(data)
    // FIXME: uncomment
    // expect(app.$axios.$get).toBeCalledWith(apiURL)
  })

  test('calls error hook if page not found', async () => {
    route.path = '/not-exist'

    apiResponse = {
      data: {
        product: {},
        breadcrumb: []
      },
      meta: {
        page_type: 'product',
        tags: {}
      }
    }

    const mockError = jest.fn()
    const mockRejectResult = { statusCode: 404, message: 'Page not found' }

    const wrapper = createDynamicPage('Product')
    const { asyncData } = wrapper.vm.$options
    const ctx = { app, store, route, error: mockError }

    expect(asyncData(ctx)).resolves.toEqual({})
    await wrapper.vm.$nextTick()
    expect(mockError).toBeCalledWith(mockRejectResult)
  })

  test('meta tags', () => {
    const page = {
      data: {
        product: {
          slug: 'test-product'
        }
      },
      meta: {
        tags: {
          title: 'Test Product',
          description: 'Test Description',
          keywords: 'test, product, keyword',
          og_title: 'Test Product',
          og_image: '/img/some-img.jpg',
          og_description: 'Test Description'
        }
      }
    }
    const wrapper = createDynamicPage('Product', page)

    const pageMeta = wrapper.vm.$options.head.call(wrapper.vm)
    const url = 'http://localhost:3000/test-product'
    const mockMeta = {
      htmlAttrs: {
        lang: 'ru'
      },
      title: page.meta.tags.title,
      meta: [
        // prettier-ignore
        { hid: 'description', name: 'description', content: page.meta.tags.description },
        { hid: 'keywords', name: 'keywords', content: page.meta.tags.keywords },
        // prettier-ignore
        { hid: 'og:url', property: 'og:url', content: url },
        // prettier-ignore
        { hid: 'og:title', property: 'og:title', content: page.meta.tags.og_title },
        // prettier-ignore
        { hid: 'og:description', property: 'og:description', content: page.meta.tags.og_description },
        // prettier-ignore
        { hid: 'og:image', property: 'og:image', content: page.meta.tags.og_image }
      ]
    }

    expect(pageMeta).toEqual(mockMeta)
  })
})
