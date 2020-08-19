import { mount, createLocalVue } from '@vue/test-utils'
import { BButton, BFormGroup, BFormInput } from 'bootstrap-vue'
import { required, minLength, email } from 'vuelidate/lib/validators'
import Vuelidate from 'vuelidate'
import VueTelInput from 'vue-tel-input'
import flushPromises from 'flush-promises'

import ModalFormGroup from '@/components/modals/ModalForm/ModalFormGroup'

const localVue = createLocalVue()
localVue.use(Vuelidate)
localVue.use(VueTelInput)
localVue.component('BButton', BButton)
localVue.component('BFormGroup', BFormGroup)
localVue.component('BFormInput', BFormInput)

describe('ModalFormGroup', () => {
  let propsData

  beforeEach(() => {
    const mockTextPromise = Promise.resolve('')
    const mockFetchPromise = Promise.resolve({
      text: () => mockTextPromise
    })
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise)

    propsData = {
      fields: [
        {
          name: 'email',
          type: 'email',
          label: 'Ваш e-mail',
          placeholder: 'Введите электронную почту',
          validation: { required, email }
        },
        {
          name: 'password',
          type: 'password',
          label: 'Пароль',
          placeholder: 'Введите Ваш пароль',
          validation: { required, minLength: minLength(6) }
        }
      ],
      submitText: 'Submit',
      action: {
        scope: 'auth',
        method: 'login'
      }
    }
  })

  function createFormGroup({ mocks = {} } = {}) {
    const wrapper = mount(ModalFormGroup, {
      localVue,
      propsData,
      mocks: {
        $t: (str) => str,
        $auth: {
          loginWith: jest
            .fn()
            .mockResolvedValueOnce({
              response: {
                data: {
                  token: 'token',
                  message: 'Авторизация прошла успешно'
                }
              }
            })
            .mockRejectedValueOnce({
              response: {
                data: {
                  error: 'Неверный пароль или e-mail'
                }
              }
            })
            .mockRejectedValue({
              response: {
                data: {
                  errors: { email: ['E-mail занят'] }
                }
              }
            })
        },
        ...mocks
      },
      stubs: ['client-only']
    })

    return wrapper
  }

  describe('form fields', () => {
    test('amount of render fields is equal to props', () => {
      const wrapper = createFormGroup()
      const groups = wrapper.findAllComponents(BFormGroup)
      expect(groups.length).toBe(propsData.fields.length)
    })

    test('renders tel input', () => {
      propsData.fields.push({
        name: 'phone',
        type: 'tel',
        label: 'Телефон',
        placeholder: 'Номер телефона',
        options: {
          name: 'phone',
          placeholder: 'Ваш телефон',
          defaultCountry: 'UA',
          validCharactersOnly: true,
          mode: 'international'
        },
        validation: {
          required,
          phone() {
            const [tel] = this.$refs.tel
            return tel.phoneObject.isValid
          }
        }
      })

      const wrapper = createFormGroup()

      expect(wrapper.find('[type="tel"]').exists()).toBe(true)
    })

    test('resets fields validation state on props uptate', () => {
      const wrapper = createFormGroup()

      wrapper.setData({ apiErrors: 'Неверный e-mail или пароль' })
      expect(typeof wrapper.vm.apiErrors).toBe('string')
      expect(wrapper.vm.fields.length).toBe(propsData.fields.length)

      const updatedFields = [
        {
          name: 'phone',
          type: 'tel',
          label: 'Телефон',
          placeholder: 'Номер телефона',
          options: {
            name: 'phone',
            placeholder: 'Ваш телефон',
            defaultCountry: 'UA',
            validCharactersOnly: true,
            mode: 'international'
          },
          validation: {
            required,
            phone() {
              const [tel] = this.$refs.tel
              return tel.phoneObject.isValid
            }
          }
        }
      ]

      wrapper.setProps({ fields: updatedFields })
      expect(wrapper.vm.fields.length).toBe(1)
    })
  })

  describe('form validation', () => {
    test('renders model error messages', async () => {
      const wrapper = createFormGroup()

      const emailField = wrapper.find('[type="email"]')
      emailField.setValue('invalid email')
      await wrapper.vm.$nextTick()
      let emailError = wrapper.find('[type="email"] + .error-message')
      expect(emailError.exists()).toBe(true)

      emailField.setValue('example@mail.com')
      await wrapper.vm.$nextTick()
      emailError = wrapper.find('[type="email"] + .error-message')
      expect(emailError.exists()).toBe(false)

      const passwordField = wrapper.find('[type="password"]')
      passwordField.setValue('123')
      await wrapper.vm.$nextTick()
      let passwordError = wrapper.find('[type="password"] + .error-message')
      expect(passwordError.exists()).toBe(true)

      // TODO: stronger password
      passwordField.setValue('123456')
      await wrapper.vm.$nextTick()
      passwordError = wrapper.find('[type="password"] + .error-message')
      expect(passwordError.exists()).toBe(false)
    })

    test('renders API error messages', async () => {
      const wrapper = createFormGroup()

      wrapper.find('[type="email"]').setValue('example@mail.com')
      wrapper.find('[type="password"]').setValue('123456')
      await wrapper.vm.$nextTick()

      // Success response
      wrapper.find('form').trigger('submit')
      await flushPromises()
      const anyErrors = wrapper.findAll('.error-message')
      expect(anyErrors.length).toBe(0)
      expect(wrapper.emitted('submit')).toBeTruthy()

      // Error response within error of string type
      wrapper.find('form').trigger('submit')
      await flushPromises()
      expect(typeof wrapper.vm.apiErrors).toBe('string')
      expect(wrapper.find('.error-message--general').exists()).toBe(true)

      // Error response within error of object type
      wrapper.find('form').trigger('submit')
      await flushPromises()
      expect(typeof wrapper.vm.apiErrors).toBe('object')
      const emailError = wrapper.find('[type="email"] + .error-message')
      expect(emailError.exists()).toBe(true)
    })
  })

  afterEach(() => {
    global.fetch.mockClear()
    delete global.fetch
  })
})
