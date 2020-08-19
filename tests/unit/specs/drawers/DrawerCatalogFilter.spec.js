import { mount, createLocalVue } from '@vue/test-utils'
import { BFormCheckbox, BButton, BCollapse } from 'bootstrap-vue'
import _cloneDeep from 'lodash.clonedeep'
import Vuex from 'vuex'

import DrawerCatalogFilter from '@/components/drawers/DrawerCatalogFilter'
import DrawerCatalogFilterOrder from '@/components/drawers/DrawerCatalogFilter/DrawerCatalogFilterOrder'
import DrawerCatalogFilterColumn from '@/components/drawers/DrawerCatalogFilter/DrawerCatalogFilterColumn'
import DrawerCatalogFilterBox from '@/components/drawers/DrawerCatalogFilter/DrawerCatalogFilterBox'

import {
  state as catalogState,
  mutations as catalogMutations,
  getters as catalogGetters
} from '@/store/catalog'
import { mutations as uiMutations, state as uiState } from '@/store/ui'

import attributesFixture from '@/api/fixtures/attributes'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('BButton', BButton)
localVue.component('BFormCheckbox', BFormCheckbox)
localVue.component('BCollapse', BCollapse)

describe('DrawerCatalogFilter', () => {
  let attributes
  let modules
  let store

  beforeEach(() => {
    attributes = _cloneDeep(attributesFixture)

    modules = {
      catalog: {
        namespaced: true,
        state: {
          activeCategory: {
            slug: 'child-category'
          },
          filters: [
            {
              code: attributes[0].code,
              label: attributes[0].label,
              value: attributes[0].options.map(({ slug }) => slug)
            }
          ],
          attributes,
          ...catalogState
        },
        mutations: { ...catalogMutations },
        getters: { ...catalogGetters }
      },
      ui: {
        namespaced: true,
        state: {
          ...uiState
        },
        mutations: {
          ...uiMutations
        }
      }
    }

    store = new Vuex.Store({ modules })
  })

  test('renders a drawer catalog filter', () => {
    const wrapper = mount(DrawerCatalogFilter, {
      localVue,
      store,
      mocks: {
        $t: (str) => str
      },
      stubs: ['svg-icon', 'NuxtLink']
    })

    expect(wrapper.findComponent(DrawerCatalogFilterBox).exists()).toBe(true)
    expect(wrapper.findAllComponents(DrawerCatalogFilterBox).length).toEqual(
      modules.catalog.state.attributes.length
    )

    expect(wrapper.findComponent(DrawerCatalogFilterColumn).exists()).toBe(true)
    expect(wrapper.findAllComponents(DrawerCatalogFilterColumn).length).toEqual(
      modules.catalog.state.attributes.length
    )
  })

  test('toggles filter application ability', () => {
    const wrapper = mount(DrawerCatalogFilter, {
      localVue,
      store,
      mocks: {
        $t: (str) => str
      },
      stubs: ['svg-icon', 'NuxtLink']
    })

    expect(wrapper.vm.allowFiltersApplication).toBe(false)
    wrapper.vm.onToggleFiltersApplication(true)
    expect(wrapper.vm.allowFiltersApplication).toBe(true)
  })

  test('filters has been applied', () => {
    const mockRouterPush = jest.fn()
    const mockRoutePath = '/parent-category/child-category'

    const wrapper = mount(DrawerCatalogFilter, {
      localVue,
      store,
      propsData: {
        allowFiltersApplication: true
      },
      mocks: {
        $t: (str) => str,
        $i18n: {
          path: (str) => str
        },
        $router: {
          push: mockRouterPush
        },
        $route: {
          query: {},
          path: mockRoutePath
        }
      },
      stubs: ['svg-icon', 'NuxtLink']
    })

    wrapper.setData({ allowFiltersApplication: true })
    expect(wrapper.vm.allowFiltersApplication).toBe(true)

    wrapper.vm.onApplyFiltersEmit()

    const filtersPath = store.state.catalog.filters
      .map((filter) => {
        const values = filter.value.join('_')
        return `${filter.code}_${values}`
      })
      .join('/')
    const path = `${mockRoutePath.slice(1)}/${filtersPath}`
    const location = { path, query: {} }

    expect(mockRouterPush).toBeCalledWith(location)
  })

  test('clears filters', () => {
    const filtersPath = store.state.catalog.filters
      .map((filter) => {
        const values = filter.value.join('_')
        return `${filter.code}_${values}`
      })
      .join('/')
    const categoryPath = '/parent-category/child-category'
    const mockRoutePath = `${categoryPath}/${filtersPath}`
    const mockRouterPush = jest.fn()

    const wrapper = mount(DrawerCatalogFilter, {
      localVue,
      store,
      propsData: {
        allowFiltersApplication: true
      },
      mocks: {
        $t: (str) => str,
        $i18n: {
          path: (str) => str
        },
        $router: {
          push: mockRouterPush
        },
        $route: {
          query: {},
          path: mockRoutePath
        }
      },
      stubs: ['svg-icon', 'NuxtLink']
    })

    expect(wrapper.vm.$route.path).toEqual(mockRoutePath)

    wrapper.vm.onClearFiltersEmit()

    const path = categoryPath.slice(1)
    const location = { path }

    expect(mockRouterPush).toBeCalledWith(location)
  })

  test('emits "order-change"', () => {
    const wrapper = mount(DrawerCatalogFilterOrder, {
      localVue,
      store,
      stubs: ['svg-icon', 'NuxtLink'],
      mocks: {
        $t: (str) => str,
        $route: {
          query: ''
        },
        $router: {
          push: (params) => params
        }
      }
    })

    const isVisible = wrapper.vm.isVisible
    wrapper.find('.filter-sorting__title').trigger('click')
    expect(wrapper.vm.isVisible).toBe(!isVisible)

    wrapper.vm.toggleOrder(wrapper.vm.orderList[2].type)
    expect(modules.catalog.state.order).toEqual(wrapper.vm.orderList[2].type)
  })

  test('toggles filter box visibility', () => {
    const wrapper = mount(DrawerCatalogFilterBox, {
      localVue,
      propsData: {
        label: attributes[3].name
      },
      stubs: ['svg-icon']
    })

    expect(wrapper.vm.label).toEqual(attributes[3].name)

    const isVisible = wrapper.vm.isVisible
    wrapper.find('.filter-box__title').trigger('click')
    expect(wrapper.vm.isVisible).toBe(!isVisible)
  })
})
