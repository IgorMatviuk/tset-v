import { mount, createLocalVue } from '@vue/test-utils'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import { BContainer } from 'bootstrap-vue'

import BlockOurFeatures from '@/components/blocks/BlockOurFeatures'
import BlockOurFeaturesSlider from '@/components/blocks/BlockOurFeatures/BlockOurFeaturesSlider'
import BlockOurFeaturesSlide from '@/components/blocks/BlockOurFeatures/BlockOurFeaturesSlide'

const localVue = createLocalVue()

localVue.use(VueAwesomeSwiper)
localVue.component('BContainer', BContainer)

const features = [
  { title: 'Собственное производство одежды', icon: 'sewing-machine' },
  { title: 'Бесплатная доставка от 1 000 грн', icon: 'delivery' },
  { title: '14 дней на обмен и возврат', icon: 'exchange-refund' },
  { title: 'Собственное производство одежды', icon: 'sewing-machine' },
  { title: 'Бесплатная доставка от 1 000 грн', icon: 'delivery' },
  { title: '14 дней на обмен и возврат', icon: 'exchange-refund' }
]

describe('BlockOurFeatures', () => {
  test('render slider', () => {
    const wrapper = mount(BlockOurFeatures, {
      localVue,
      propsData: {
        features
      },
      stubs: ['svg-icon']
    })

    expect(wrapper.findComponent(BlockOurFeaturesSlider).exists()).toBe(true)
  })

  test('render slides', () => {
    const wrapper = mount(BlockOurFeatures, {
      localVue,
      propsData: {
        features
      },
      stubs: ['svg-icon']
    })
    const slidesLength = features.length
    const slides = wrapper.findAllComponents(BlockOurFeaturesSlide)
    expect(slides.length).toEqual(slidesLength)
  })
})
