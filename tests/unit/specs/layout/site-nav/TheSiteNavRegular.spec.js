import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { BContainer } from 'bootstrap-vue'
import _cloneDeep from 'lodash.clonedeep'

import TheSiteNavBlockRegular from '@/components/layout/site-nav/TheSiteNavBlockRegular'

import { getters as rootGetters } from '@/store'

import menusFixture from '@/api/fixtures/menus'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('BContainer', BContainer)

describe('TheSiteNavBlockRegular', () => {
  let menus
  let store

  function createNavBlock() {
    const wrapper = mount(TheSiteNavBlockRegular, {
      localVue,
      store,
      mocks: {
        $i18n: {
          path: (str) => str
        }
      },
      stubs: ['NuxtLink', 'SearchBox', 'SocialNetworks']
    })

    return wrapper
  }

  beforeEach(() => {
    menus = _cloneDeep(menusFixture)

    store = new Vuex.Store({
      state: {
        menus
      },
      getters: { ...rootGetters }
    })
  })

  test('renders category columns', () => {
    const wrapper = createNavBlock()
    const columnList = wrapper.findAll('.nav-block-regular__list')
    const columnCount = store.getters.desktopMenu.columns.length
    expect(columnList.length).toBe(columnCount)
  })

  test('renders parent categories', () => {
    const wrapper = createNavBlock()
    const parentItems = wrapper.findAll('.nav-block-regular__item--parent')
    const { columns } = store.getters.desktopMenu

    expect(parentItems.length).toBe(columns.length)
  })
})
