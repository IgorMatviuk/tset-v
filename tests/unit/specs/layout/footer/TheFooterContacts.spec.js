import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { BCollapse } from 'bootstrap-vue'

import TheFooterContacts from '@/components/layout/footer/TheFooterContacts'

import '@/tests/unit/mocks/match-media'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('BCollapse', BCollapse)

function createContactsWrapper(store, mock) {
  return shallowMount(TheFooterContacts, {
    store,
    localVue,
    mocks: {
      ...mock
    },
    stubs: ['svg-icon', 'NuxtLink']
  })
}

describe('TheFooterContacts', () => {
  let store
  let state
  let mock

  beforeEach(() => {
    state = {
      contacts: {
        phone: '0 800 332 512',
        email: 'office@virna.com.ua',
        schedule: 'с 9:00 - 18:00',
        social_media: [
          { name: 'instagram', url: 'https://www.instagram.com/' },
          { name: 'facebook', url: 'https://facebook.com/' },
          { name: 'youtube', url: 'https://www.youtube.com/' }
        ]
      }
    }
    mock = { path: (url) => url, $device: { isMobile: () => true } }

    store = new Vuex.Store({
      state
    })
  })

  test('render contacts list', () => {
    const wrapper = createContactsWrapper(store, mock)

    expect(wrapper.vm.isVisible).toBe(false)
    expect(wrapper.vm.allowCollapse).toBe(true)
  })
})
