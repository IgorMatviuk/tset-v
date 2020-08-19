import { mount, createLocalVue } from '@vue/test-utils'
import VueLazyLoadVideo from 'vue-lazyload-video'

import BlockAboutVideo from '@/components/blocks/BlockAbout/BlockAboutVideo'

const localVue = createLocalVue()
localVue.use(VueLazyLoadVideo)

describe('BlockAboutVideo', () => {
  test('has expected structure: without video', () => {
    const wrapper = mount(BlockAboutVideo, {
      propsData: {
        content: {
          title: 'some title',
          videoPoster: '/some-url'
        }
      },
      mocks: {
        $device: {
          isMobile: true
        }
      },
      stubs: ['client-only', 'LazyVideo']
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  test('has expected structure: with video', () => {
    const wrapper = mount(BlockAboutVideo, {
      propsData: {
        content: {
          title: 'some title',
          video: '/some-url',
          videoPoster: '/some-url'
        }
      },
      mocks: {
        $device: {
          isMobile: false
        }
      },
      stubs: ['client-only', 'LazyVideo']
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  test('render video', () => {
    const wrapper = mount(BlockAboutVideo, {
      localVue,
      propsData: {
        content: {
          title: 'some title',
          video: '/some-url',
          videoPoster: '/some-url'
        }
      },
      mocks: {
        $device: {
          isMobile: true
        }
      },
      stubs: ['client-only']
    })

    expect(wrapper.find('video').exists()).toBe(true)
  })
})
