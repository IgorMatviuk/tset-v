import { mount, createLocalVue } from '@vue/test-utils'
import VueTelInput from 'vue-tel-input'
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import {
  BButton,
  BFormGroup,
  BFormRadioGroup,
  BFormRadio,
  BFormInput,
  BFormTextarea
} from 'bootstrap-vue'

import BlockCheckoutInfoContacts from '@/components/blocks/BlockCheckoutInfo/BlockCheckoutInfoContacts'

const localVue = createLocalVue()
localVue.component('PerfectScrollbar', PerfectScrollbar)
localVue.component('BButton', BButton)
localVue.component('BFormGroup', BFormGroup)
localVue.component('BFormRadioGroup', BFormRadioGroup)
localVue.component('BFormRadio', BFormRadio)
localVue.component('BFormInput', BFormInput)
localVue.component('BFormTextarea', BFormTextarea)
localVue.use(VueTelInput)

describe('BlockCheckoutInfoContacts', () => {
  function createCheckoutInfoContacts({
    mocks = {},
    contactInfo = {
      isGuest: { $model: true, $error: false },
      firstName: { $model: 'John', $error: false },
      lastName: { $model: 'Doe', $error: false },
      phone: { $model: '+380 66 123 4567', $error: false },
      email: { $model: 'user@example.com', $error: false },
      comment: { $model: 'message', $error: false },
      $invalid: false
    }
  } = {}) {
    const wrapper = mount(BlockCheckoutInfoContacts, {
      localVue,
      propsData: {
        value: { contactInfo }
      },
      mocks: {
        $t: (str) => str,
        ...mocks
      },
      stubs: {
        'client-only': {
          render(h) {
            return this.$options._renderChildren
          }
        }
      }
    })

    return wrapper
  }

  function checkErrorMessages(wrapper, validity) {
    const errorFirstName = wrapper.find('#checkoutFirstName + .error-message')
    expect(errorFirstName.exists()).toBe(validity)

    const errorLastName = wrapper.find('#checkoutLastName + .error-message')
    expect(errorLastName.exists()).toBe(validity)

    const errorEmail = wrapper.find('#checkoutEmail + .error-message')
    expect(errorEmail.exists()).toBe(validity)

    const errorPhone = wrapper.find('.vue-tel-input + .error-message')
    expect(errorPhone.exists()).toBe(validity)
  }

  describe('Fields validation', () => {
    test('all invalid', () => {
      const wrapper = createCheckoutInfoContacts({
        contactInfo: {
          isGuest: { $model: true, $error: false, required: false },
          firstName: { $model: 'J', $error: true, required: false },
          lastName: { $model: 'D', $error: true, required: false },
          phone: {
            $model: '2',
            $error: true,
            phone: false,
            required: false
          },
          email: {
            $model: 'user@example',
            $error: true,
            email: false,
            required: false
          },
          comment: { $model: '', $error: true },
          $invalid: true
        }
      })

      checkErrorMessages(wrapper, true)
      expect(wrapper.vm.value.contactInfo.$invalid).toBe(true)
    })

    test('all valid', () => {
      const wrapper = createCheckoutInfoContacts()
      checkErrorMessages(wrapper, false)
      expect(wrapper.vm.value.contactInfo.$invalid).toBe(false)
    })
  })

  describe('Phone change', () => {
    test('default country selected', () => {
      const wrapper = createCheckoutInfoContacts()
      wrapper.vm.onPhoneCountryChange({ iso2: 'UA' })
      expect(wrapper.emitted()['non-defeault-country']).toBeFalsy()
    })

    test('non default country selected', () => {
      const wrapper = createCheckoutInfoContacts()
      wrapper.vm.onPhoneCountryChange({ iso2: 'US' })
      expect(wrapper.emitted()['non-defeault-country'].length).toBe(1)
    })
  })
})
