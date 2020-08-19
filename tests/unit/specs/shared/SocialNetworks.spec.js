import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import SocialNetworks from '@/components/shared/SocialNetworks'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('SocialNetworks', () => {
  let store
  let state

  beforeEach(() => {
    state = {
      contacts: {
        social_media: [
          { name: 'icon1', url: 'https://social-network1.com' },
          { name: 'icon2', url: 'https://social-network2.com' }
        ]
      }
    }

    store = new Vuex.Store({ state })
  })

  test('renders a list of links', () => {
    const wrapper = shallowMount(SocialNetworks, {
      localVue,
      store,
      stubs: ['svg-icon']
    })

    const linksEls = wrapper.findAll('.social-networks__link')
    const linksState = state.contacts.social_media
    expect(linksEls.length).toBe(linksState.length)
  })
})
