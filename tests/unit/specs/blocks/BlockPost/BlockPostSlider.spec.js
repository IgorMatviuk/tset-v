import { mount, createLocalVue } from '@vue/test-utils'
import _cloneDeep from 'lodash.clonedeep'

import { BContainer } from 'bootstrap-vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import BlockPostSlider from '@/components/blocks/BlockPost/BlockPostSlider'

import createFactory from '@/api/helpers/factory'
import postAttrs from '@/api/factories/post'

const localVue = createLocalVue()
localVue.use(VueAwesomeSwiper)
localVue.component('BContainer', BContainer)

describe('BlockPostSlider', () => {
  let sliderItems

  function createBlockPostSlider() {
    const wrapper = mount(BlockPostSlider, {
      localVue,
      propsData: {
        items: _cloneDeep(sliderItems)
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
    const post = createFactory(postAttrs, 1)
    const sliderBlock = post[0].blocks.find((item) => item.type === 'slider')

    sliderItems = sliderBlock.content.items
  })

  test('render posts slider', () => {
    const wrapper = createBlockPostSlider()

    expect(wrapper.element).toMatchSnapshot()
  })
})
