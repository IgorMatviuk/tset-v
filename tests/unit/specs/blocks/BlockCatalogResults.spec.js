import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import BlockCatalogResults from '@/components/blocks/BlockCatalogResults'
import ProductPreview from '@/components/shared/ProductPreview'

import {
  mutations as catalogMutations,
  mutationTypes as catalogMutationTypes
} from '@/store/catalog'

import createFactory from '@/api/helpers/factory'
import productAttrs from '@/api/factories/product'

import '@/tests/unit/mocks/match-media'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('BlockCatalogResults', () => {
  let products
  let showItemsCount
  let store

  beforeEach(() => {
    products = createFactory(productAttrs, 24)

    showItemsCount = 2

    store = new Vuex.Store({
      modules: {
        catalog: {
          namespaced: true,
          state: {
            products,
            showItemsCount,
            currentPage: 1,
            totalPages: 6
          },
          mutations: { ...catalogMutations }
        }
      }
    })
  })

  test('renders product items', () => {
    const wrapper = shallowMount(BlockCatalogResults, {
      localVue,
      store
    })

    const productItems = wrapper.findAllComponents(ProductPreview)
    expect(productItems.length).toBe(products.length)
  })

  test('renders row view', () => {
    const wrapper = shallowMount(BlockCatalogResults, {
      localVue,
      store
    })

    expect(wrapper.find('.catalog-results--row').element).toBeVisible()
  })

  test('renders grid view', () => {
    store.commit(`catalog/${catalogMutationTypes.SET_SHOW_ITEMS_COUNT}`, 4)

    const wrapper = shallowMount(BlockCatalogResults, {
      localVue,
      store
    })

    expect(wrapper.find('.catalog-results--grid').element).toBeVisible()
  })
})
