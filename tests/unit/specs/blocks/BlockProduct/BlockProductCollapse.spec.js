import { mount, createLocalVue } from '@vue/test-utils'
import { BCollapse } from 'bootstrap-vue'

import BlockProductCollapse from '@/components/blocks/BlockProduct/BlockProductCollapse'

const localVue = createLocalVue()
localVue.component('BCollapse', BCollapse)

describe('BlockProductCollapse', () => {
  test('renders component within "text" slot', () => {
    const wrapper = mount(BlockProductCollapse, {
      localVue,
      slots: {
        text: 'foo bar'
      },
      stubs: ['svg-icon']
    })

    expect(wrapper.find('.collapse-info__text').exists()).toBe(true)
  })

  test('renders component within "reviews" slot', () => {
    const wrapper = mount(BlockProductCollapse, {
      localVue,
      slots: {
        reviews: '<ul />'
      },
      stubs: ['svg-icon']
    })

    expect(wrapper.find('.collapse-info__reviews').exists()).toBe(true)
  })
})
