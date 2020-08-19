import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import _cloneDeep from 'lodash.clonedeep'
import {
  BContainer,
  BButton,
  BCollapse,
  BFormGroup,
  BFormInput
} from 'bootstrap-vue'

import '@/tests/unit/mocks/match-media'

import TheFooter from '@/components/layout/footer/TheFooter'
import TheFooterLeft from '@/components/layout/footer/TheFooterLeft'
import TheFooterList from '@/components/layout/footer/TheFooterList'
import TheFooterContacts from '@/components/layout/footer/TheFooterContacts'
import TheFooterNewsletter from '@/components/layout/footer/TheFooterNewsletter'
import TheFooterPayment from '@/components/layout/footer/TheFooterPayment'

import menus from '@/api/fixtures/menus'
import { getters, state as rootState } from '@/store'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(VueRouter)
localVue.component('BContainer', BContainer)
localVue.component('BButton', BButton)
localVue.component('BCollapse', BCollapse)
localVue.component('BFormGroup', BFormGroup)
localVue.component('BFormInput', BFormInput)

describe('TheFooter', () => {
  const router = new VueRouter()
  let store
  let state

  beforeEach(() => {
    state = {
      ...rootState,
      menus: _cloneDeep(menus)
    }

    store = new Vuex.Store({
      state,
      getters
    })
  })

  test('render footer', () => {
    const wrapper = shallowMount(TheFooter, {
      store,
      localVue,
      router,
      stubs: ['svg-icon', 'NuxtLink'],
      mocks: {
        $i18n: { path: (url) => url },
        $device: { isMobile: () => true }
      }
    })

    expect(wrapper.vm.columns).not.toBe(undefined)
    expect(wrapper.findComponent(TheFooterLeft).exists()).toBe(true)
    expect(wrapper.findComponent(TheFooterList).exists()).toBe(true)
    expect(wrapper.findComponent(TheFooterContacts).exists()).toBe(true)
    expect(wrapper.findComponent(TheFooterNewsletter).exists()).toBe(true)
    expect(wrapper.findComponent(TheFooterPayment).exists()).toBe(true)
  })
})
