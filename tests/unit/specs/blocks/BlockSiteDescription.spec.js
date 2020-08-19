import { mount, createLocalVue } from '@vue/test-utils'
import { BContainer, BButton } from 'bootstrap-vue'

import BlockSiteDescription from '@/components/blocks/BlockSiteDescription'

const localVue = createLocalVue()

localVue.component('BContainer', BContainer)
localVue.component('BButton', BButton)

describe('BlockSiteDescription', () => {
  let propsData

  beforeEach(() => {
    propsData = {
      content: '<h1>Test Heading</h1><p>Test Content</p>'
    }
  })

  test('renders page description', () => {
    const wrapper = mount(BlockSiteDescription, {
      propsData,
      localVue,
      mocks: {
        $t: (str) => str
      },
      stubs: ['svg-icon']
    })

    const content = wrapper.find('.site-desc__content')
    expect(content.element.innerHTML).toBe(propsData.content)
  })

  test('toggles collapse on button click', async () => {
    const wrapper = mount(BlockSiteDescription, {
      propsData,
      localVue,
      mocks: {
        $t: (str) => str
      },
      stubs: ['svg-icon']
    })

    expect(wrapper.vm.collapsed).toBe(true)
    expect(wrapper.find('.site-desc__wrapper').element).toHaveClass('hide')

    wrapper.find('.site-desc__button').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.collapsed).toBe(false)
    expect(wrapper.find('.site-desc__wrapper').element).not.toHaveClass('hide')
  })
})
