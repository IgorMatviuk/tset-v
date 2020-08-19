import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { BContainer, BPopover } from 'bootstrap-vue'

import TheCatalogHeader from '@/components/layout/catalog/TheCatalogHeader'
import TheCatalogHeaderOrder from '@/components/layout/catalog/TheCatalogHeader/TheCatalogHeaderOrder'
import TheCatalogHeaderItemCount from '@/components/layout/catalog/TheCatalogHeader/TheCatalogHeaderItemCount'

import {
  mutations as catalogMutations,
  state as catalogState
} from '@/store/catalog'
import { state as uiState, mutations as uiMutations } from '@/store/ui'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('BContainer', BContainer)
localVue.component('BPopover', BPopover)

describe('TheCatalogHeader', () => {
  let store
  let events

  beforeEach(() => {
    const catalogModule = {
      state: catalogState,
      mutations: catalogMutations
    }

    const uiModule = {
      state: uiState,
      mutations: uiMutations
    }

    store = new Vuex.Store({
      modules: {
        catalog: {
          namespaced: true,
          ...catalogModule
        },
        ui: {
          namespaced: true,
          ...uiModule
        }
      }
    })

    events = {}

    document.addEventListener = jest.fn((event, cb) => {
      events[event] = cb
    })

    document.removeEventListener = jest.fn((event) => {
      delete events[event]
    })
  })

  test('renders a catalog header', () => {
    const wrapper = mount(TheCatalogHeader, {
      localVue,
      store,
      mocks: {
        $t: (str) => str,
        $route: {
          query: []
        },
        $router: {
          push: (url) => url
        }
      },
      stubs: ['svg-icon', 'BPopover']
    })

    expect(wrapper.findComponent(TheCatalogHeaderOrder).exists()).toBe(true)
    expect(wrapper.findComponent(TheCatalogHeaderItemCount).exists()).toBe(true)
  })

  test('toggles item count', async () => {
    const wrapper = mount(TheCatalogHeaderItemCount, {
      localVue,
      store,
      mocks: {
        $t: (str) => str,
        $route: {
          query: []
        },
        $router: {
          push: (url) => url
        }
      },
      stubs: ['svg-icon']
    })

    const itemCountToggler = wrapper.find('.item-count__item')

    itemCountToggler.trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.showItemsCount).toEqual(2)
  })

  test('toggles visibility', () => {
    const wrapper = mount(TheCatalogHeaderOrder, {
      localVue,
      store,
      mocks: {
        $t: (str) => str,
        $route: {
          query: []
        },
        $router: {
          push: (url) => url
        }
      },
      stubs: ['svg-icon', 'BPopover']
    })

    wrapper.trigger('click')
    expect(wrapper.vm.isVisible).toBe(true)
    expect(events.mouseup).toBeDefined()
    events.mouseup()
    expect(wrapper.vm.isVisible).toBe(false)
    events.mouseup()
    expect(wrapper.vm.isVisible).toBe(false)
  })

  test('triggers mouseup event', () => {
    const mockDestroyed = jest.fn()

    const wrapper = mount(TheCatalogHeaderOrder, {
      localVue,
      store,
      mocks: {
        $t: (str) => str,
        $route: {
          query: []
        },
        $router: {
          push: (url) => url
        }
      },
      stubs: ['svg-icon', 'BPopover'],
      destroyed: mockDestroyed
    })

    expect(events.mouseup).toBeDefined()

    wrapper.destroy()

    expect(mockDestroyed).toBeCalled()
    expect(events.mouseup).not.toBeDefined()
  })

  test('toggleOrder', () => {
    const wrapper = mount(TheCatalogHeaderOrder, {
      localVue,
      store,
      mocks: {
        $t: (str) => str,
        $route: {
          query: {}
        },
        $router: {
          push: jest.fn()
        }
      },
      stubs: ['svg-icon', 'BPopover']
    })

    wrapper.vm.toggleOrder(wrapper.vm.orderList[2].type)
    expect(wrapper.vm.order).toEqual(wrapper.vm.orderList[2].type)
  })
})
