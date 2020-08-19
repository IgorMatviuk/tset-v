import { shallowMount } from '@vue/test-utils'

import BlockCheckoutOrder from '@/components/blocks/BlockCheckoutOrder'

describe('BlockCheckoutOrder', () => {
  function createCheckoutOrder(orderSummary = {}) {
    const wrapper = shallowMount(BlockCheckoutOrder, {
      propsData: { orderSummary },
      mocks: {
        $t: (str) => str,
        $i18n: {
          path: (str) => str
        },
        $store: {
          getters: {}
        }
      },
      stubs: ['NuxtLink']
    })

    return wrapper
  }

  beforeEach(() => {})

  test('renders discount prices', () => {
    const wrapper = createCheckoutOrder({
      discount_price: '800.0000',
      formatted_discount_price: '800 грн',
      grand_total: 1000
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  test('renders free shipping message', () => {
    const wrapper = createCheckoutOrder({
      discount_price: '1600.0000',
      formatted_discount_price: '1600 грн',
      grand_total: 2000
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
