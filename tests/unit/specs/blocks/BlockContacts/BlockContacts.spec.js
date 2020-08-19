import { shallowMount, createLocalVue } from '@vue/test-utils'
import { BContainer } from 'bootstrap-vue'

import BlockContacts from '@/components/blocks/BlockContacts'

const localVue = createLocalVue()

localVue.component('BContainer', BContainer)

describe('BlockContacts', () => {
  test('renders contacts block', () => {
    const wrapper = shallowMount(BlockContacts, {
      localVue,
      mocks: {
        $t: () => ''
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
