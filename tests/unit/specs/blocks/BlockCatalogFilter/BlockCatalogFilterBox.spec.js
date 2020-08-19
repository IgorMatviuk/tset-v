import { mount, createLocalVue } from '@vue/test-utils'
import _cloneDeep from 'lodash.clonedeep'
import Vuex from 'vuex'
import { BButton, BCollapse, BFormCheckbox } from 'bootstrap-vue'

import BlockCatalogFilterBox from '@/components/blocks/BlockCatalogFilter/BlockCatalogFilterBox'
import BlockCatalogFilterColumn from '@/components/blocks/BlockCatalogFilter/BlockCatalogFilterColumn'

import { mutations as uiMutations } from '@/store/ui'
import {
  mutations as catalogMutations,
  getters as catalogGetters
} from '@/store/catalog'

import attributesFixture from '@/api/fixtures/attributes'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('BCollapse', BCollapse)
localVue.component('BButton', BButton)
localVue.component('BFormCheckbox', BFormCheckbox)

describe('BlockCatalogFilterBox', () => {
  let attributes
  let modules
  let store

  function createMatchMediaMock(matches) {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches,
        media: query,
        addListener: jest.fn().mockImplementation((callback) => callback()),
        addEventListener: jest.fn().mockImplementation((callback) => callback())
      }))
    })
  }

  beforeEach(() => {
    attributes = _cloneDeep(attributesFixture)

    modules = {
      ui: {
        namespaced: true,
        state: {
          isCategoriesDrawerVisible: false,
          isFiltersDrawerVisible: false
        },
        mutations: { ...uiMutations }
      },
      catalog: {
        namespaced: true,
        state: {
          activeCategory: {
            slug: 'child-category'
          },
          attributes,
          filters: [
            {
              code: attributes[0].code,
              label: attributes[0].label,
              value: attributes[0].options.map(({ slug }) => slug)
            }
          ]
        },
        mutations: { ...catalogMutations },
        getters: { ...catalogGetters }
      }
    }

    store = new Vuex.Store({ modules })
  })

  test('renders an attribute columns', async () => {
    createMatchMediaMock(true)

    const wrapper = mount(BlockCatalogFilterBox, {
      localVue,
      store,
      mocks: {
        $t: () => '',
        $device: { isMobile: false }
      },
      stubs: [
        'svg-icon',
        'BlockCatalogFilterSelection',
        'BlockCatalogFilterColumn'
      ]
    })

    wrapper.vm.contentType = 'filters'
    wrapper.vm.isVisible = true
    wrapper.vm.filtersVisibility = true

    await wrapper.vm.$nextTick()

    const columns = wrapper.findAllComponents(BlockCatalogFilterColumn)
    expect(columns.length).toBe(attributes.length)
  })

  test('filters has been applied', async () => {
    const mockRoutePath = '/parent-category/child-category'
    const mockRouterPush = jest.fn()

    const wrapper = mount(BlockCatalogFilterBox, {
      localVue,
      store,
      mocks: {
        $router: {
          push: mockRouterPush
        },
        $route: {
          path: mockRoutePath,
          query: {}
        },
        $i18n: {
          path: (str) => str
        },
        $t: () => '',
        $device: { isMobile: false }
      },
      // methods: {
      //   applyFilters: mockApplyFilters
      // },
      stubs: ['svg-icon', 'BlockCatalogFilterSelection']
    })

    wrapper.vm.contentType = 'filters'
    wrapper.vm.isVisible = true
    wrapper.vm.filtersVisibility = true

    await wrapper.vm.$nextTick()

    const btnFitlerTrigger = wrapper.get('.catalog-filter__label')
    btnFitlerTrigger.trigger('click')
    expect(wrapper.vm.isVisible).toBe(true)

    const btnApply = wrapper.get('.catalog-filter__btn-apply')
    btnApply.trigger('click')
    expect(wrapper.vm.isVisible).toBe(false)

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

  test('clears selected filters', async () => {
    const filtersPath = store.state.catalog.filters
      .map((filter) => {
        const values = filter.value.join('_')
        return `${filter.code}_${values}`
      })
      .join('/')
    const categoryPath = '/parent-category/child-category'
    const mockRoutePath = `${categoryPath}/${filtersPath}`
    const mockRouterPush = jest.fn()

    const wrapper = mount(BlockCatalogFilterBox, {
      localVue,
      store,
      mocks: {
        $i18n: {
          path: (str) => str
        },
        $router: {
          push: mockRouterPush
        },
        $route: {
          query: {},
          path: mockRoutePath
        },
        $t: () => '',
        $device: { isMobile: false }
      },
      stubs: ['svg-icon', 'BlockCatalogFilterSelection']
    })

    wrapper.vm.contentType = 'filters'
    wrapper.vm.isVisible = true
    wrapper.vm.filtersVisibility = true

    await wrapper.vm.$nextTick()

    const btnFitlerTrigger = wrapper.get('.catalog-filter__label')
    btnFitlerTrigger.trigger('click')
    expect(wrapper.vm.isVisible).toBe(true)

    const btnClear = wrapper.get('.btn-clear-filters')
    btnClear.trigger('click')
    expect(wrapper.vm.isVisible).toBe(false)

    const path = categoryPath.slice(1)
    const location = { path }

    expect(mockRouterPush).toBeCalledWith(location)
  })

  test('onToggleFiltersApplication() toggles allowFiltersApplication', () => {
    const filtersControllerMixin = {
      methods: {
        getFilterSelections: jest
          .fn()
          .mockImplementationOnce(() => [])
          .mockImplementationOnce(() => [{}]),
        applyFilter: jest.fn()
      }
    }

    const wrapper = mount(BlockCatalogFilterBox, {
      localVue,
      store,
      mixins: [filtersControllerMixin],
      mocks: {
        $t: () => '',
        $device: { isMobile: true }
      },
      stubs: ['svg-icon', 'BlockCatalogFilterSelection']
    })

    expect(wrapper.vm.allowFiltersApplication).toBe(false)
    wrapper.vm.onToggleFiltersApplication(false)
    expect(wrapper.vm.allowFiltersApplication).toBe(false)
    wrapper.vm.onToggleFiltersApplication(true)
    expect(wrapper.vm.allowFiltersApplication).toBe(true)
  })

  test('assigns filterVisibility within matchMedia', () => {
    createMatchMediaMock(false)

    const wrapper = mount(BlockCatalogFilterBox, {
      localVue,
      store,
      mocks: {
        $t: () => '',
        $device: { isMobile: true }
      },
      data() {
        return {
          isVisible: true
        }
      },
      stubs: ['svg-icon', 'BlockCatalogFilterSelection']
    })

    expect(wrapper.vm.filtersVisibility).toBe(false)
  })
})
