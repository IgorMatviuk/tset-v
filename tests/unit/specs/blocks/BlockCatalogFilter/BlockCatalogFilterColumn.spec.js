import { mount, createLocalVue } from '@vue/test-utils'
import { BFormCheckbox } from 'bootstrap-vue'
import _cloneDeep from 'lodash.clonedeep'
import Vuex from 'vuex'

import BlockCatalogFilterColumn from '@/components/blocks/BlockCatalogFilter/BlockCatalogFilterColumn'

import {
  mutationTypes as catalogMutationTypes,
  mutations as catalogMutations,
  getters as catalogGetters
} from '@/store/catalog'

import attributesFixture from '@/api/fixtures/attributes'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('BFormCheckbox', BFormCheckbox)

describe('BlockCatalogFilterColumn', () => {
  let attributes
  let modules
  let store

  beforeEach(() => {
    attributes = _cloneDeep(attributesFixture)

    modules = {
      catalog: {
        namespaced: true,
        state: {
          filters: attributes.map((attribute) => ({
            code: attribute.code,
            label: attribute.label,
            value: attribute.options.map(({ slug }) => slug)
          }))
        },
        mutations: { ...catalogMutations },
        getters: { ...catalogGetters }
      }
    }

    store = new Vuex.Store({ modules })
  })

  test('renders "size" attribute options', () => {
    const sizeAttribute = attributes.find((attr) => attr.code === 'size')
    const mockEmit = jest.fn()

    const wrapper = mount(BlockCatalogFilterColumn, {
      localVue,
      store,
      propsData: {
        attribute: sizeAttribute
      },
      mocks: {
        $emit: mockEmit
      }
    })

    expect(wrapper.vm.attribute.code).toBe('size')

    expect(wrapper.findAllComponents(BFormCheckbox).length).toBe(
      sizeAttribute.options.length
    )
  })

  test('renders "color" attribute options', () => {
    const colorAttribute = attributes.find((attr) => attr.code === 'color')
    const mockEmit = jest.fn()

    const wrapper = mount(BlockCatalogFilterColumn, {
      localVue,
      store,
      propsData: {
        attribute: colorAttribute
      },
      mocks: {
        $emit: mockEmit
      }
    })

    expect(wrapper.vm.attribute.code).toBe('color')

    expect(wrapper.findAllComponents(BFormCheckbox).length).toBe(
      colorAttribute.options.length
    )
  })

  test('renders "pattern" attribute options', () => {
    const patternAttribute = attributes.find((attr) => attr.code === 'pattern')
    const mockEmit = jest.fn()

    const wrapper = mount(BlockCatalogFilterColumn, {
      localVue,
      store,
      propsData: {
        attribute: patternAttribute
      },
      mocks: {
        $emit: mockEmit
      }
    })

    expect(wrapper.vm.attribute.code).toBe('pattern')

    expect(wrapper.findAllComponents(BFormCheckbox).length).toBe(
      patternAttribute.options.length
    )
  })

  test('renders "style" attribute options', () => {
    const styleAttribute = attributes.find((attr) => attr.code === 'style')
    const mockEmit = jest.fn()

    const wrapper = mount(BlockCatalogFilterColumn, {
      localVue,
      store,
      propsData: {
        attribute: styleAttribute
      },
      mocks: {
        $emit: mockEmit
      }
    })

    expect(wrapper.vm.attribute.code).toBe('style')

    expect(wrapper.findAllComponents(BFormCheckbox).length).toBe(
      styleAttribute.options.length
    )
  })

  test('renders "material" attribute options', () => {
    const materialAttribute = attributes.find(
      (attr) => attr.code === 'material'
    )
    const mockEmit = jest.fn()

    const wrapper = mount(BlockCatalogFilterColumn, {
      localVue,
      store,
      propsData: {
        attribute: materialAttribute
      },
      mocks: {
        $emit: mockEmit
      }
    })

    expect(wrapper.vm.attribute.code).toBe('material')

    expect(wrapper.findAllComponents(BFormCheckbox).length).toBe(
      materialAttribute.options.length
    )
  })

  test('clears selection', async () => {
    const attribute = attributes[0]

    const wrapper = mount(BlockCatalogFilterColumn, {
      localVue,
      store,
      propsData: { attribute }
    })

    expect(wrapper.vm.selected.length).toBeGreaterThan(0)

    store.commit(`catalog/${catalogMutationTypes.CLEAR_FILTERS}`)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selected).toEqual([])
  })

  test('emits filter box toggle', () => {
    const attribute = attributes[0]
    const mockEmit = jest.fn()

    const wrapper = mount(BlockCatalogFilterColumn, {
      localVue,
      store,
      propsData: {
        attribute
      },
      mocks: {
        $emit: mockEmit
      }
    })

    wrapper.setData({ selected: [attribute.options[0].label] })

    expect(wrapper.vm.selected.length).toBe(1)
  })
})
