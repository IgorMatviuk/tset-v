import { mount, createLocalVue } from '@vue/test-utils'
import { BContainer, BButton } from 'bootstrap-vue'

import NotFound from '@/components/views/NotFound'
import BlockNotFound from '@/components/blocks/BlockNotFound'

const localVue = createLocalVue()
localVue.component('BContainer', BContainer)
localVue.component('BButton', BButton)

describe('NotFound', () => {
  test('renders not found page', () => {
    const wrapper = mount(NotFound, {
      localVue,
      mocks: {
        $t: () => '',
        $i18n: { path: (url) => url }
      }
    })

    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.findComponent(BlockNotFound).exists()).toBe(true)
  })
})
