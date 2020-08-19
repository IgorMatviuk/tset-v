import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { BContainer, BButton } from 'bootstrap-vue'

import BlockSearchResult from '@/components/blocks/BlockSearchResult'
import ProductPreview from '@/components/shared/ProductPreview'

import productAttrs from '@/api/factories/product'
import createFactory from '@/api/helpers/factory'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('BContainer', BContainer)
localVue.component('BButton', BButton)

describe('BlockSearchResult', () => {
  let store
  let propsData
  let products

  beforeEach(() => {
    products = createFactory(productAttrs, 10)

    propsData = {
      products,
      query: 'Платья'
    }

    store = new Vuex.Store({
      modules: {
        search: {
          namespaced: true,
          state: {
            currentPage: 1,
            totalPages: 6
          }
        }
      }
    })
  })

  test('has expected structure', () => {
    const wrapper = shallowMount(BlockSearchResult, {
      localVue,
      store,
      propsData
    })

    expect(wrapper.element).toMatchSnapshot()

    const previews = wrapper.findAllComponents(ProductPreview)
    expect(previews.length).toEqual(products.length)
  })
})
