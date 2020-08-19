import { mount, createLocalVue } from '@vue/test-utils'
import _cloneDeep from 'lodash.clonedeep'

import { BContainer } from 'bootstrap-vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import BlockPostRelatedSlider from '@/components/blocks/BlockPost/BlockPostRelatedSlider'

import createFactory from '@/api/helpers/factory'
import postAttrs from '@/api/factories/post'

const localVue = createLocalVue()
localVue.use(VueAwesomeSwiper)
localVue.component('BContainer', BContainer)

describe('BlockPostRelatedSlider', () => {
  let posts

  function createBlockPostRelatedSlider() {
    const wrapper = mount(BlockPostRelatedSlider, {
      localVue,
      propsData: {
        posts: _cloneDeep(posts)
      },
      mocks: {
        $i18n: {
          path: (url) => url
        },
        $t: (path) => path
      },
      stubs: ['NuxtLink', 'svg-icon']
    })

    return wrapper
  }

  beforeEach(() => {
    posts = createFactory(postAttrs, 5)
  })

  test('render related posts slider', () => {
    const wrapper = createBlockPostRelatedSlider()

    expect(wrapper.element).toMatchSnapshot()
  })
})
