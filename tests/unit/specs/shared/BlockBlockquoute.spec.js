import { shallowMount, createLocalVue } from '@vue/test-utils'
import { BContainer } from 'bootstrap-vue'

import BlockBlockquote from '@/components/shared/BlockBlockquote'

const localVue = createLocalVue()

localVue.component('BContainer', BContainer)

describe('BlockAboutBlockquote', () => {
  let propsData
  let content

  beforeEach(() => {
    content = `<h1>BlockAboutBlockquote content</h1>`

    propsData = {
      content
    }
  })

  test('has expected structure', () => {
    const wrapper = shallowMount(BlockBlockquote, {
      localVue,
      propsData,
      mocks: {
        $t: () => ''
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
