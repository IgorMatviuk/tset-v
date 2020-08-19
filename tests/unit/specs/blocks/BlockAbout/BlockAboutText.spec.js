import { shallowMount } from '@vue/test-utils'

import BlockAboutText from '@/components/blocks/BlockAbout/BlockAboutText'

describe('BlockAboutText', () => {
  let propsData
  let content

  beforeEach(() => {
    content = {
      title: `<h1>BlockAboutText content</h1>`,
      description: `<p>BlockAboutText description</p>`
    }

    propsData = {
      content
    }
  })

  test('has expected structure', () => {
    const wrapper = shallowMount(BlockAboutText, {
      propsData,
      mocks: {
        $t: () => ''
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  test('rendering content', () => {
    const wrapper = shallowMount(BlockAboutText, {
      propsData,
      mocks: {
        $t: () => ''
      }
    })

    const title = wrapper.find('.about-text__title > *')
    const description = wrapper.find('.about-text__content > *')

    expect(title.html()).toBe(content.title)
    expect(description.html()).toBe(content.description)
  })
})
