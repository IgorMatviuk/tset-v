import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import BlockCatalogFilter from '@/components/blocks/BlockCatalogFilter'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('BlockCatalogFilter', () => {
  let state
  let store

  beforeEach(() => {
    state = {
      currentPage: 1,
      totalPages: 6
    }

    store = new Vuex.Store({
      modules: {
        catalog: {
          namespaced: true,
          state: {
            ...state
          }
        }
      }
    })
  })

  test('renders with state', () => {
    const wrapper = shallowMount(BlockCatalogFilter, {
      localVue,
      store
    })

    expect(wrapper.vm.currentPage).toBe(state.currentPage)
    expect(wrapper.vm.totalPages).toBe(state.totalPages)
  })
})
