import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import _cloneDeep from 'lodash.clonedeep'

import BlockCatalogFilterSelection from '@/components/blocks/BlockCatalogFilter/BlockCatalogFilterSelection'
import ButtonClearFilters from '@/components/shared/ButtonClearFilters'

import {
  mutations as catalogMutations,
  mutationTypes as catalogMutationTypes,
  getters as catalogGetters
} from '@/store/catalog'

import attributesFixture from '@/api/fixtures/attributes'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueAwesomeSwiper)

describe('BlockCatalogFilterSelection', () => {
  let attributes
  let filters
  let store

  beforeEach(() => {
    attributes = _cloneDeep(attributesFixture)

    filters = attributes.map((attribute) => {
      const filter = {
        code: attribute.code,
        label: attribute.name
      }

      const getOptionsSlug = (options) =>
        Array.isArray(options)
          ? options.map(({ slug }) => slug)
          : [attribute.options[0].slug]

      switch (attribute.code) {
        case 'color':
          filter.value = [
            ...getOptionsSlug(attribute.options.slice(0, 10)),
            ...getOptionsSlug(attribute.options.slice(0, 11))
          ]
          break
        case 'pattern':
          filter.value = getOptionsSlug(attribute.options[0])
          break
        case 'size':
        case 'style':
        case 'material':
          filter.value = getOptionsSlug(attribute.options)
          break
      }

      return filter
    })

    store = new Vuex.Store({
      modules: {
        catalog: {
          namespaced: true,
          state: {
            filters,
            attributes
          },
          mutations: { ...catalogMutations },
          getters: { ...catalogGetters }
        }
      }
    })
  })

  test('renders initially selected filters', () => {
    const wrapper = mount(BlockCatalogFilterSelection, {
      localVue,
      store,
      mocks: {
        $t: (str) => str
      },
      stubs: ['svg-icon']
    })

    const selectedItems = wrapper.findAll('.filter-selection__item')
    expect(wrapper.findComponent(ButtonClearFilters).exists()).toBe(true)
    expect(wrapper.vm.attributes.length).toBe(attributes.length)
    expect(selectedItems.length).toBe(filters.length)
  })

  test('renders no filters', () => {
    store.commit(`catalog/${catalogMutationTypes.CLEAR_FILTERS}`)

    const wrapper = mount(BlockCatalogFilterSelection, {
      localVue,
      store,
      mocks: {
        $t: (str) => str
      },
      stubs: ['svg-icon']
    })

    const selectedItems = wrapper.findAll('.filter-selection__item')
    expect(wrapper.findComponent(ButtonClearFilters).exists()).toBe(false)
    expect(wrapper.vm.attributes.length).toBe(attributes.length)
    expect(selectedItems.length).toBe(0)
  })

  test('emits toggle-filters', async () => {
    const wrapper = mount(BlockCatalogFilterSelection, {
      localVue,
      store,
      mocks: {
        $t: (str) => str
      },
      stubs: ['svg-icon']
    })

    const filterItem = wrapper.find('.filter-selection__item')
    filterItem.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('toggle-filters')).toBeTruthy()
  })

  test('emits clear-filters', async () => {
    const wrapper = mount(BlockCatalogFilterSelection, {
      localVue,
      store,
      mocks: {
        $t: (str) => str
      },
      stubs: ['svg-icon']
    })

    const btnClear = wrapper.find('.btn-clear-filters')
    btnClear.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('clear-filters')).toBeTruthy()
  })
})
