import { mount, createLocalVue } from '@vue/test-utils'
import VueLazyLoadVideo from 'vue-lazyload-video'

import BlockProductPreviewVideo from '@/components/blocks/BlockProduct/BlockProductPreviewVideo'

import '@/tests/unit/mocks/match-media'

const localVue = createLocalVue()
localVue.use(VueLazyLoadVideo)

describe('BlockProductPreviewVideo', () => {
  test('renders LazyVideo component', () => {
    const wrapper = mount(BlockProductPreviewVideo, {
      localVue,
      propsData: {
        video: {
          video_url: '',
          preview_lg: '',
          preview_xl: ''
        }
      },
      stubs: ['client-only']
    })

    expect(wrapper.find('video').exists()).toBe(true)
  })
})
