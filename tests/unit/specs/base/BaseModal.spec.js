import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { BModal } from 'bootstrap-vue'

import BaseModal from '@/components/base/BaseModal'
import ModalForm from '@/components/modals/ModalForm'
import ModalMessage from '@/components/modals/ModalMessage'

import { mutations, mutationTypes } from '@/store/modal'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('BModal', BModal)

// TODO:
describe.skip('BaseModal', () => {
  let store
  let state

  function createBaseModal(type) {
    const wrapper = mount(BaseModal, {
      localVue,
      store,
      propsData: { type },
      stubs: ['svg-icon', 'ModalForm', 'ModalMessage'],
      attachToDocument: true
    })

    return wrapper
  }

  beforeEach(() => {
    state = {
      form: {
        visible: false,
        meta: { title: 'Test Form' }
      },
      message: {
        visible: false,
        meta: { title: 'Test Message' }
      }
    }

    store = new Vuex.Store({
      modules: {
        modal: {
          namespaced: true,
          state,
          mutations
        }
      }
    })
  })

  describe('modal types', () => {
    test('renders ModalForm component', async () => {
      const wrapper = createBaseModal('form')

      store.commit(`modal/${mutationTypes.SET_MODAL_VISIBILITY_TOGGLE}`, {
        type: 'form',
        status: true
      })

      await wrapper.vm.$nextTick()

      expect(wrapper.vm.showModal).toBe(true)
      expect(wrapper.find(BModal).exists()).toBe(true)
      expect(wrapper.find(ModalForm)).not.toBeNull()
    })

    test('renders ModalMessage component', async () => {
      const wrapper = createBaseModal('message')

      store.commit(`modal/${mutationTypes.SET_MODAL_VISIBILITY_TOGGLE}`, {
        type: 'message',
        status: true
      })

      await wrapper.vm.$nextTick()

      expect(wrapper.vm.showModal).toBe(true)
      expect(wrapper.find(BModal).exists()).toBe(true)
      expect(wrapper.find(ModalMessage).exists()).not.toBeNull()
    })
  })

  describe('visibility toggle', () => {
    test('toggles form modal visibility', async () => {
      const wrapper = createBaseModal('form')

      store.commit(`modal/${mutationTypes.SET_MODAL_VISIBILITY_TOGGLE}`, {
        type: 'form',
        status: true
      })

      await wrapper.vm.$nextTick()
      wrapper.vm.hideModal()
    })
  })
})
