import { mount, createLocalVue } from '@vue/test-utils'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import _cloneDeep from 'lodash.clonedeep'

import BlockProductsList from '@/components/blocks/BlockProductsList'
import BlockProductsListSlider from '@/components/blocks/BlockProductsList/BlockProductsListSlider'
import SectionHeader from '@/components/shared/SectionHeader'
import SliderArrow from '@/components/shared/SliderArrow'

import createFactory from '@/api/helpers/factory'
import productAttrs from '@/api/factories/product'

const localVue = createLocalVue()
localVue.use(VueAwesomeSwiper)

describe('BlockProductsList', () => {
  let featuredProducts

  beforeEach(() => {
    featuredProducts = _cloneDeep(createFactory(productAttrs, 8))
  })

  test('renders SectionHeader', () => {
    const wrapper = mount(BlockProductsList, {
      localVue,
      propsData: {
        products: featuredProducts,
        heading: 'some heading',
        parentClass: 'parent-class'
      },
      mocks: {
        $t: (str) => str
      },
      stubs: ['svg-icon', 'BContainer', 'ProductPreview']
    })

    expect(wrapper.findComponent(SectionHeader).exists()).toBeTruthy()
    expect(wrapper.findComponent(SliderArrow).exists()).toBeTruthy()
  })

  test('renders BlockFeaturedProductsSlider', () => {
    const wrapper = mount(BlockProductsList, {
      localVue,
      propsData: {
        products: featuredProducts,
        heading: 'some heading',
        parentClass: 'parent-class'
      },
      mocks: {
        $t: (str) => str
      },
      stubs: ['svg-icon', 'BContainer', 'ProductPreview']
    })

    expect(wrapper.findComponent(BlockProductsListSlider).exists()).toBeTruthy()
  })
})
