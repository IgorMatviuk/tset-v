import { mount, createLocalVue } from '@vue/test-utils'

import { BContainer, BButton } from 'bootstrap-vue'

import BlockCheckoutEmpty from '@/components/blocks/BlockCheckoutEmpty'

const localVue = createLocalVue()
localVue.component('BContainer', BContainer)
localVue.component('BButton', BButton)

describe('BlockPostNavigation', () => {
  function createBlockCheckoutEmpty() {
    const wrapper = mount(BlockCheckoutEmpty, {
      localVue,
      mocks: {
        $t: (path) => path
      }
    })

    return wrapper
  }

  test('render privacy policy block', () => {
    const wrapper = createBlockCheckoutEmpty()

    expect(wrapper.element).toMatchSnapshot()
  })
})
