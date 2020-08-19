import { shallowMount, createLocalVue } from '@vue/test-utils'
import _cloneDeep from 'lodash.clonedeep'
import Vuex from 'vuex'
import { BContainer, BButton } from 'bootstrap-vue'

import TheMasthead from '@/components/layout/header/TheMasthead'

import contactsFixture from '@/api/fixtures/contacts'
import menusFixture from '@/api/fixtures/menus'

import {
  mutations as rootMutations,
  mutationTypes as rootMutationTypes,
  getters as rootGetters
} from '@/store'
import {
  mutations as uiMutations,
  mutationTypes as uiMutationTypes
} from '@/store/ui'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('BContainer', BContainer)
localVue.component('BButton', BButton)

describe('TheMasthead', () => {
  let store
  let mockBeforeDestroy

  function createMasthead({ routePath = '/' } = {}) {
    const wrapper = shallowMount(TheMasthead, {
      localVue,
      store,
      propsData: {
        isSiteNavActive: false,
        isCatalogMenuActive: false
      },
      beforeDestroy: mockBeforeDestroy,
      mocks: {
        $t: (str) => str,
        $i18n: {
          path: (str) => str
        },
        $route: {
          path: routePath,
          params: {}
        }
      },
      stubs: ['svg-icon', 'NuxtLink']
    })

    return wrapper
  }

  beforeEach(() => {
    mockBeforeDestroy = jest.fn()

    store = new Vuex.Store({
      state: {
        locale: 'ru',
        pageType: 'main',
        contacts: _cloneDeep(contactsFixture),
        menus: _cloneDeep(menusFixture)
      },
      mutations: {
        [rootMutationTypes.SET_LANG]: rootMutations[rootMutationTypes.SET_LANG]
      },
      getters: {
        ...rootGetters
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

  test('returns isHomePage for "/" path', () => {
    const wrapper = createMasthead()
    expect(wrapper.vm.isHomePage).toBe(true)
  })

  test('returns isHomePage for "/:lang" path', () => {
    store.commit(rootMutationTypes.SET_LANG, 'ua')
    const wrapper = createMasthead({ routePath: '/ua' })
    expect(wrapper.vm.isHomePage).toBe(true)
  })

  test('returns isHomePage for "/:lang/" path', () => {
    store.commit(rootMutationTypes.SET_LANG, 'ua')
    const wrapper = createMasthead({ routePath: '/ua/' })
    expect(wrapper.vm.isHomePage).toBe(true)
  })

  test('handles scroll event', () => {
    const wrapper = createMasthead()

    expect(wrapper.vm.isPageScrolled).toBe(false)
    expect(wrapper.vm.isBgWhite).toBe(false)

    const scrolEvent = new CustomEvent('scroll')
    window.pageYOffset = 1
    window.dispatchEvent(scrolEvent)

    expect(wrapper.vm.isPageScrolled).toBe(true)
    expect(wrapper.vm.isBgWhite).toBe(true)

    window.pageYOffset = 0
    window.dispatchEvent(scrolEvent)

    expect(wrapper.vm.isPageScrolled).toBe(false)
    expect(wrapper.vm.isBgWhite).toBe(false)

    wrapper.destroy()
    expect(mockBeforeDestroy).toBeCalled()
  })

  test('triggers gsap animation', async () => {
    const wrapper = createMasthead()

    expect(wrapper.vm.isBackgroundRevealed).toBe(false)
    expect(wrapper.vm.isHomePage).toBe(true)
    store.commit(`ui/${uiMutationTypes.SET_BACKGROUND_REVEALED_TOGGLE}`, true)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isBackgroundRevealed).toBe(true)

    store.commit(`ui/${uiMutationTypes.SET_BACKGROUND_REVEALED_TOGGLE}`, false)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isBackgroundRevealed).toBe(false)
  })

  test('emits "toggle-catalog-menu" event', async () => {
    const wrapper = createMasthead()

    const catalogMenuTrigger = wrapper.find('.masthead__catalog-trigger')
    expect(wrapper.vm.isCatalogMenuActive).toBe(false)
    catalogMenuTrigger.trigger('click')
    wrapper.setProps({ isCatalogMenuActive: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isCatalogMenuActive).toBe(true)

    const mouseupEvent = new MouseEvent('mouseup', {
      view: window,
      bubbles: true,
      cancelable: true
    })

    document.body.dispatchEvent(mouseupEvent)
    expect(wrapper.emitted('toggle-catalog-menu').length).toBe(2)

    catalogMenuTrigger.trigger('click')
    wrapper.setProps({ isCatalogMenuActive: false })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isCatalogMenuActive).toBe(false)
    expect(wrapper.emitted('toggle-catalog-menu').length).toBe(3)
  })

  test('emits "toggle-site-nav" event', async () => {
    const wrapper = createMasthead()

    wrapper.vm.toggleSiteNavMenu()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('toggle-site-nav').length).toBeTruthy()
  })
})
