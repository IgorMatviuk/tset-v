import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import { BContainer, BButton, BPagination } from 'bootstrap-vue'
import _cloneDeep from 'lodash.clonedeep'

import BlockTestimonials from '@/components/blocks/BlockTestimonials'

import createFactory from '@/api/helpers/factory'
import testimonialAttrs from '@/api/factories/testimonial'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueAwesomeSwiper)
localVue.directive('dynamic-modal', {})
localVue.component('BContainer', BContainer)
localVue.component('BButton', BButton)
localVue.component('BPagination', BPagination)

describe('BlockTestimonials', () => {
  let store
  let testimonials

  function createBlockTestimonials(props) {
    const wrapper = mount(BlockTestimonials, {
      localVue,
      store,
      propsData: {
        ...props
      },
      stubs: ['svg-icon', 'NuxtLink'],
      mocks: {
        $i18n: { path: (url) => url },
        $t: (path) => path
      }
    })

    return wrapper
  }

  beforeEach(() => {
    testimonials = _cloneDeep(createFactory(testimonialAttrs, 4))

    store = new Vuex.Store({
      modules: {
        testimonials: {
          namespaced: true,
          state: {
            currentPage: 1,
            totalPages: 6
          }
        }
      }
    })
  })

  test('renders component without pagination', () => {
    const wrapper = createBlockTestimonials({ testimonials })

    expect(wrapper.element).toMatchSnapshot()
  })

  test('renders component with pagination', () => {
    const wrapper = createBlockTestimonials({
      testimonials,
      isTestimonialsPage: true
    })

    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.find('.testimonials__pagination').element).toBeVisible()
  })
})
