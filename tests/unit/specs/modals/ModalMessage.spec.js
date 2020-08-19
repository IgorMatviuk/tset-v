import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import ModalMessage from '@/components/modals/ModalMessage'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ModalMessage', () => {
  let store
  let state

  beforeEach(() => {
    state = {
      message: {
        visible: true,
        meta: {
          title: 'Test Title',
          content: 'Test Content'
        }
      }
    }

    store = new Vuex.Store({
      modules: {
        modal: {
          namespaced: true,
          state
        }
      }
    })
  })

  test('renders message content', () => {
    const wrapper = mount(ModalMessage, {
      localVue,
      store
    })

    const { content } = state.message.meta
    expect(wrapper.find('div').text()).toBe(content)
  })
})
