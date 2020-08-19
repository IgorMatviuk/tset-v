import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { BContainer } from 'bootstrap-vue'

import TheBanner from '@/components/layout/banner/TheBanner'

import {
  mutationTypes as uiMutationTypes,
  mutations as uiMutations
} from '@/store/ui'

import banner from '@/api/fixtures/banner'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('BContainer', BContainer)

describe('TheBanner', () => {
  let store

  function createBanner({ path = '/' } = {}) {
    return shallowMount(TheBanner, {
      localVue,
      store,
      propsData: { banner },
      mocks: {
        $route: { path },
        $i18n: {
          path: (path) => path
        }
      },
      stubs: ['NuxtLink']
    })
  }

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        locale: 'ua'
      },
      modules: {
        ui: {
          namespaced: true,
          state: {
            isBackgroundRevealed: false
          },
          mutations: { ...uiMutations }
        }
      }
    })
  })

  test('has expected structure', () => {
    const wrapper = createBanner()
    expect(wrapper.element).toMatchSnapshot()
  })

  test('triggers animation on backgroud reveal', () => {
    const wrapper = createBanner()

    expect(wrapper.vm.isBackgroundRevealed).toBe(false)
    store.commit(`ui/${uiMutationTypes.SET_BACKGROUND_REVEALED_TOGGLE}`, true)
    expect(wrapper.vm.isBackgroundRevealed).toBe(true)
  })

  describe('Homepage detection', () => {
    test('default path', () => {
      const wrapper = createBanner({ path: `/ua` })
      expect(wrapper.vm.isHomePage).toBe(true)
    })

    test('path with trailing slash', () => {
      const wrapper = createBanner({ path: `/ua/` })
      expect(wrapper.vm.isHomePage).toBe(true)
    })
  })
})
