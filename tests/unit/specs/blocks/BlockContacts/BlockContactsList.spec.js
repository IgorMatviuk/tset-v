import { mount, createLocalVue } from '@vue/test-utils'

import Vuex from 'vuex'

import BlockContactsList from '@/components/blocks/BlockContacts/BlockContactsList'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('BlockContactsList', () => {
  let contacts
  let store

  beforeEach(() => {
    contacts = {
      phone: '0 800 332 512',
      email: 'office@virna.com.ua',
      schedule: 'с 9:00 - 18:00'
    }

    store = new Vuex.Store({
      state: {
        contacts
      }
    })
  })

  test('has expected structure', () => {
    const wrapper = mount(BlockContactsList, {
      localVue,
      store,
      stubs: ['svg-icon', 'client-only'],
      mocks: {
        $t: () => ''
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  test('render contacts list', () => {
    const wrapper = mount(BlockContactsList, {
      localVue,
      store,
      stubs: ['svg-icon', 'client-only'],
      mocks: {
        $t: () => ''
      }
    })

    expect(wrapper.findAll('.contacts-list__item').length).toEqual(
      Object.keys(store.state.contacts).length
    )
  })
})
