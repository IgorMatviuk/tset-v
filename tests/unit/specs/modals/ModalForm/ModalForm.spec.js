import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import ModalForm from '@/components/modals/ModalForm'

import { mutations as modalMutations } from '@/store/modal'

import '@/plugins/dynamic-modal'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ModalForm', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        modal: {
          namespaced: true,
          state: {
            form: {
              visible: true,
              meta: {
                actionText: 'Test Action',
                submitText: 'Submit',
                fields: [],
                action: {
                  showSuccessMessage: true
                },
                links: [
                  {
                    label: null,
                    name: 'Забыли пароль?',
                    nextModal: 'forgot-password'
                  },
                  {
                    label: 'Нет аккаунта?',
                    name: 'Регистрация',
                    nextModal: 'register'
                  }
                ]
              }
            },
            message: {
              visible: false
            }
          },
          mutations: { ...modalMutations }
        }
      }
    })
  })

  test('form submit', () => {
    const wrapper = shallowMount(ModalForm, {
      localVue,
      store,
      mocks: {
        $t: (str) => str
      }
    })

    wrapper.vm.onFormSubmit()
  })
})
