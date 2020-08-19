import { mount, createLocalVue } from '@vue/test-utils'
import { BFormGroup, BFormRadioGroup, BFormRadio } from 'bootstrap-vue'

import BlockCheckoutInfoPayment from '@/components/blocks/BlockCheckoutInfo/BlockCheckoutInfoPayment'

const localVue = createLocalVue()
localVue.component('BFormGroup', BFormGroup)
localVue.component('BFormRadioGroup', BFormRadioGroup)
localVue.component('BFormRadio', BFormRadio)

describe('BlockCheckoutInfoPayment', () => {
  function createCheckoutInfoPayment(isAbroadDelivery) {
    const wrapper = mount(BlockCheckoutInfoPayment, {
      localVue,
      propsData: {
        value: {
          paymentInfo: {
            paymentMethod: {
              $model: ''
            }
          }
        },
        isAbroadDelivery
      },
      mocks: {
        $t: (str) => str
      }
    })

    return wrapper
  }

  test('using "abroad" delivery method', () => {
    const wrapper = createCheckoutInfoPayment(true)
    expect(wrapper.element).toMatchSnapshot()
  })

  test('using non "abroad" delivery method', () => {
    const wrapper = createCheckoutInfoPayment(false)
    expect(wrapper.element).toMatchSnapshot()
  })
})
