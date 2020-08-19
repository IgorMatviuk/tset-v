import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import _cloneDeep from 'lodash.clonedeep'

import { BContainer, BButton, BPagination } from 'bootstrap-vue'

import BlockTestimonialsList from '@/components/blocks/BlockTestimonials/BlockTestimonialsList'

import createFactory from '@/api/helpers/factory'
import testimonialAttrs from '@/api/factories/testimonial'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.directive('dynamic-modal', {})
localVue.component('BContainer', BContainer)
localVue.component('BButton', BButton)
localVue.component('BPagination', BPagination)

describe('BlockTestimonialsList', () => {
  let store
  let testimonials

  function createBlockTestimonialsList(props) {
    const wrapper = mount(BlockTestimonialsList, {
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
    testimonials = _cloneDeep(createFactory(testimonialAttrs, 8))

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

  test('renders BlockTestimonialsList', () => {
    const wrapper = createBlockTestimonialsList({
      testimonials,
      isLoading: false
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
