import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import BlockProductSlider from '@/components/blocks/BlockProduct/BlockProductSlider'

import createFactory from '@/api/helpers/factory'
import productAttrs from '@/api/factories/product'

import '@/tests/unit/mocks/match-media'

const localVue = createLocalVue()
localVue.use(VueAwesomeSwiper)

describe('BlockProductSlider', () => {
  let previews

  beforeEach(() => {
    const products = createFactory(productAttrs, 12)
    const regularProduct = products.find((product) => product.in_stock)

    previews = regularProduct.previews
  })

  test('renders slider container', () => {
    const wrapper = shallowMount(BlockProductSlider, {
      localVue,
      propsData: {
        previews
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  test('renders slider container without video', () => {
    const products = createFactory(productAttrs, 12)
    const regularProduct = products.find((product) => product.in_stock)

    const wrapper = shallowMount(BlockProductSlider, {
      localVue,
      propsData: {
        previews: regularProduct.previews.filter(
          (item) => item.preview_type !== 'video'
        )
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
