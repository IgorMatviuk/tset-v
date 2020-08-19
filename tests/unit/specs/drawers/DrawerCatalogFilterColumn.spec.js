import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { BFormCheckbox } from 'bootstrap-vue'
import _cloneDeep from 'lodash.clonedeep'

import DrawerCatalogFilterColumn from '@/components/drawers/DrawerCatalogFilter/DrawerCatalogFilterColumn'

import {
  mutationTypes as catalogMutationTypes,
  mutations as catalogMutations,
  getters as catalogGetters
} from '@/store/catalog'

import attributes from '@/api/fixtures/attributes'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('BFormCheckbox', BFormCheckbox)

describe('DrawerCatalogFilterColumn', () => {
  let attribute
  let store
  let filters

  function createStore(filters = []) {
    return new Vuex.Store({
      modules: {
        catalog: {
          namespaced: true,
          state: { filters },
          mutations: { ...catalogMutations },
          getters: { ...catalogGetters }
        }
      }
    })
  }

  function createSelectedFilters(attribute) {
    return [
      {
        code: attribute.code,
        label: attribute.label,
        value: attribute.options.map(({ slug }) => slug)
      }
    ]
  }

  function createColumn() {
    return mount(DrawerCatalogFilterColumn, {
      localVue,
      store,
      propsData: { attribute }
    })
  }

  beforeEach(() => {
    attribute = _cloneDeep(attributes)[0]
  })

  test('renders non-selected attribute options', () => {
    store = createStore()

    const wrapper = createColumn()

    const options = wrapper.findAllComponents(BFormCheckbox)
    expect(options.length).toEqual(attribute.options.length)
  })

  test('renders selected attribute options', () => {
    filters = createSelectedFilters(attribute)
    store = createStore(filters)

    const wrapper = createColumn()

    const options = wrapper.findAll('[type="checkbox"]:checked')
    expect(options.length).toEqual(filters[0].value.length)
  })

  test('clears selection on reset filter trigger', async () => {
    filters = createSelectedFilters(attribute)
    store = createStore(filters)

    const wrapper = createColumn()

    let options = wrapper.findAll('[type="checkbox"]:checked')
    expect(options.length).toEqual(filters[0].value.length)

    store.commit(`catalog/${catalogMutationTypes.CLEAR_FILTERS}`)
    await wrapper.vm.$nextTick()

    options = wrapper.findAll('[type="checkbox"]:not(:checked)')
    expect(options.length).toEqual(attribute.options.length)
  })
})
