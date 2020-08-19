import { mount, createLocalVue } from '@vue/test-utils'
import _cloneDeep from 'lodash.clonedeep'

import { BContainer } from 'bootstrap-vue'
import VueLazyLoadVideo from 'vue-lazyload-video'

import BlockPostVideo from '@/components/blocks/BlockPost/BlockPostVideo'

import createFactory from '@/api/helpers/factory'
import postAttrs from '@/api/factories/post'

import '@/tests/unit/mocks/html-media-element'

const localVue = createLocalVue()
localVue.component('BContainer', BContainer)
localVue.use(VueLazyLoadVideo)

const playStub = jest.spyOn(window.HTMLMediaElement.prototype, 'play')
const pauseStub = jest.spyOn(window.HTMLMediaElement.prototype, 'pause')

describe('BlockPostVideo', () => {
  let videoContent

  function createMatchMediaMock(matches) {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches,
        media: query,
        addListener: jest.fn().mockImplementation((callback) => callback()),
        addEventListener: jest.fn().mockImplementation((callback) => callback())
      }))
    })
  }

  function createBlockPostVideo() {
    const wrapper = mount(BlockPostVideo, {
      localVue,
      propsData: {
        content: _cloneDeep(videoContent)
      },
      stubs: ['svg-icon', 'client-only']
    })

    return wrapper
  }

  beforeEach(() => {
    const post = createFactory(postAttrs, 1)
    const videoBlock = post[0].blocks.find((item) => item.type === 'video')

    videoContent = videoBlock.content

    playStub.mockClear()
    pauseStub.mockClear()
  })

  test('trigger play video', async () => {
    createMatchMediaMock(false)

    const wrapper = createBlockPostVideo()
    const $videoWrapper = wrapper.find('.post-video__wrapper')

    $videoWrapper.trigger('click')
    await wrapper.vm.$nextTick()
    expect(playStub).toHaveBeenCalled()

    $videoWrapper.trigger('click')
    await wrapper.vm.$nextTick()
    expect(pauseStub).toHaveBeenCalled()
  })
})
