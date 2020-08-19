import { mount, createLocalVue } from '@vue/test-utils'

import { BContainer } from 'bootstrap-vue'

import BlockPrivacyPolicy from '@/components/blocks/BlockPrivacyPolicy'

const localVue = createLocalVue()
localVue.component('BContainer', BContainer)

describe('BlockPostNavigation', () => {
  function createBlockPrivacyPolicy() {
    const wrapper = mount(BlockPrivacyPolicy, {
      localVue,
      mocks: {
        $t: (path) => path
      }
    })

    return wrapper
  }

  test('render privacy policy block', () => {
    const wrapper = createBlockPrivacyPolicy()

    expect(wrapper.element).toMatchSnapshot()
  })
})
