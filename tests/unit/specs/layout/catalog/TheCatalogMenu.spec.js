import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import _cloneDeep from 'lodash.clonedeep'
import { BContainer } from 'bootstrap-vue'

import TheCatalogMenu from '@/components/layout/catalog/TheCatalogMenu'

import categoriesFixture from '@/api/fixtures/categories'
import menusFixture from '@/api/fixtures/menus'

import { getters as rootGetters } from '@/store'
import { getters as catalogGetters } from '@/store/catalog'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.component('BContainer', BContainer)

describe('TheCatalogMenu', () => {
  let store
  let categories
  let menus

  function createCatalogMenu() {
    const wrapper = shallowMount(TheCatalogMenu, {
      store,
      localVue,
      mocks: {
        $t: (str) => str,
        $i18n: { path: (url) => url }
      },
      stubs: ['NuxtLink']
    })

    return wrapper
  }

  beforeEach(() => {
    categories = _cloneDeep(categoriesFixture)
    menus = _cloneDeep(menusFixture)

    store = new Vuex.Store({
      state: {
        menus
      },
      getters: {
        ...rootGetters
      },
      modules: {
        catalog: {
          namespaced: true,
          state: {
            categories
          },
          getters: {
            ...catalogGetters
          }
        }
      }
    })
  })

  test('renders a promo menu', () => {
    const wrapper = createCatalogMenu()

    const linkItems = wrapper.findAll(
      '.catalog-menu__additional-links .catalog-menu__link:not(.catalog-menu__link--active)'
    )

    const columnCount = Object.keys(wrapper.vm.promoMenu.columns).length

    expect(linkItems.length).toBe(columnCount)
  })

  test('renders a catalog menu', () => {
    const wrapper = createCatalogMenu()

    const listWrappers = wrapper.findAll(
      '.catalog-menu__categories .catalog-menu__list-wrapper'
    )

    const columnCount = Object.keys(wrapper.vm.catalogMenu.columns).length

    expect(listWrappers.length).toBe(columnCount)
  })
})
