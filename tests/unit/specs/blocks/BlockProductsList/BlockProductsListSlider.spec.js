import { mount, createLocalVue } from '@vue/test-utils'
import _cloneDeep from 'lodash.clonedeep'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import BlockProductsListSlider from '@/components/blocks/BlockProductsList/BlockProductsListSlider'
import BlockProductsListSlide from '@/components/blocks/BlockProductsList/BlockProductsListSlide'
import ProductPreview from '@/components/shared/ProductPreview'

import createFactory from '@/api/helpers/factory'
import productAttrs from '@/api/factories/product'

import '@/tests/unit/mocks/match-media'

const localVue = createLocalVue()
localVue.use(VueAwesomeSwiper)

describe('BlockProductsListSlider', () => {
  let items

  beforeEach(() => {
    items = _cloneDeep(createFactory(productAttrs, 8))
  })

  test('renders product preview slides', () => {
    const wrapper = mount(BlockProductsListSlider, {
      localVue,
      propsData: {
        items,
        parentClass: 'parent-class'
      },
      mocks: {
        $t: (str) => str,
        $i18n: {
          path: (str) => str
        },
        $route: {
          name: null,
          params: {
            pathMatch: '/'
          }
        },
        $store: {
          state: {
            pageType: 'product'
          }
        }
      },
      stubs: ['BButton', 'svg-icon', 'NuxtLink']
    })

    const slides = wrapper.findAllComponents(BlockProductsListSlide)
    expect(slides.length).toBe(wrapper.vm.items.length)

    const productPreviews = wrapper.findAllComponents(ProductPreview)
    expect(productPreviews.length).toBe(wrapper.vm.items.length)
  })
})
