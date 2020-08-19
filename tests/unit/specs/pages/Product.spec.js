import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import Product from '@/components/views/Product'

import {
  mutationTypes as rootMutationTypes,
  mutations as rootMutations
} from '@/store'

import {
  mutations as productMutations,
  mutationTypes as productMutationsTypes,
  getters as productGetters
} from '@/store/product'

import createFactory from '@/api/helpers/factory'
import productAttrs from '@/api/factories/product'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Product', () => {
  let store
  let mockViewedProducts
  let activeVariant
  let nextVariant
  let activePreview
  let nextPreview

  function createProduct() {
    const wrapper = shallowMount(Product, {
      localVue,
      store,
      mocks: {
        $t: (str) => str,
        $i18n: {
          path: (str) => str
        },
        $viewedProducts: mockViewedProducts
      },
      stubs: ['client-only']
    })

    return wrapper
  }

  beforeEach(() => {
    mockViewedProducts = {
      connectToDatabase: jest.fn(),
      incrementing: jest.fn(),
      getAll: jest.fn().mockResolvedValue([])
    }

    const products = createFactory(productAttrs, 2)

    activeVariant = products[0].variants[0]
    nextVariant = products[1].variants[0]
    activePreview = activeVariant.previews[3]
    nextPreview = nextVariant.previews[2]

    store = new Vuex.Store({
      state: {
        locale: 'ru',
        locales: ['uk', 'ru'],
        breadcrumb: []
      },
      mutations: { ...rootMutations },
      modules: {
        product: {
          namespaced: true,
          state: {
            productData: {
              attribute_family: {
                description: {
                  description: {
                    value: '<p>Product description</p>'
                  }
                }
              }
            },
            activeVariant,
            sectionsData: {
              featured_products: [],
              similar_products: [],
              viewed_products: []
            },
            links: {
              prev: 'prev-product-slug',
              next: 'next-product-slug'
            },
            imageViewerVisibility: true,
            activePreview
          },
          mutations: { ...productMutations },
          getters: { ...productGetters }
        }
      }
    })
  })

  test('renders component itself (RU)', () => {
    const wrapper = createProduct()

    expect(wrapper.element).toMatchSnapshot()
  })

  test('renders component itself (UA)', () => {
    store.commit(rootMutationTypes.SET_LANG, 'uk')

    const wrapper = createProduct()

    expect(wrapper.element).toMatchSnapshot()
  })

  test('renders components with default gallery active index', () => {
    const wrapper = createProduct()

    wrapper.vm.$store.commit(
      `product/${productMutationsTypes.SET_ACTIVE_PREVIEW}`,
      nextPreview
    )

    expect(wrapper.element).toMatchSnapshot()
  })
})
