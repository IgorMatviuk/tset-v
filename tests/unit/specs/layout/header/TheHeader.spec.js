import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import { mutations as uiMutations } from '@/store/ui'

import TheHeader from '@/components/layout/header/TheHeader'
import TheFloatPanel from '@/components/layout/float-panel/TheFloatPanel'

const eventBus = {}
eventBus.install = function(Vue) {
  Vue.prototype.$bus = new Vue()
}

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)
Vue.use(eventBus)
const router = new VueRouter()

describe('TheHeader', () => {
  let store

  function createTheHeader() {
    const wrapper = shallowMount(TheHeader, {
      localVue,
      router,
      store,
      mocks: {
        $device: {
          isMobile: true
        }
      }
    })

    return wrapper
  }

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        pageType: 'product'
      },
      modules: {
        ui: {
          namespaced: true,
          state: {
            isFloatPanelActive: false,
            isMobileMenuVisible: false
          },
          mutations: {
            ...uiMutations
          }
        }
      }
    })
  })

  test('toggleSiteNav', () => {
    const wrapper = createTheHeader()

    expect(wrapper.vm.isSiteNavActive).toBe(false)

    wrapper.vm.toggleSiteNav(true)
    expect(wrapper.vm.isSiteNavActive).toBe(true)
  })

  test('toggleCatalogMenu', () => {
    const wrapper = createTheHeader()

    expect(wrapper.vm.isCatalogMenuActive).toBe(false)

    wrapper.vm.toggleCatalogMenu(true)
    expect(wrapper.vm.isCatalogMenuActive).toBe(true)
  })

  test('onRouteChange', async () => {
    const wrapper = createTheHeader()

    expect(wrapper.vm.isSiteNavActive).toBe(false)
    expect(wrapper.vm.isCatalogMenuActive).toBe(false)

    wrapper.vm.$router.push('/foo')
    await Vue.nextTick()

    expect(wrapper.vm.isSiteNavActive).toBe(false)
    expect(wrapper.vm.isCatalogMenuActive).toBe(false)

    wrapper.setData({ isSiteNavActive: true, isCatalogMenuActive: true })

    wrapper.vm.$router.push('/bar')
    await Vue.nextTick()

    expect(wrapper.vm.isSiteNavActive).toBe(false)
    expect(wrapper.vm.isCatalogMenuActive).toBe(false)
  })

  test('toggleFloatPanel', async () => {
    const wrapper = createTheHeader()

    expect(wrapper.findComponent(TheFloatPanel).exists()).toBe(false)

    wrapper.vm.$bus.$emit('float-panel:toggle', true)

    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(TheFloatPanel).exists()).toBe(true)
  })
})
