import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import _cloneDeep from 'lodash.clonedeep'

import {
  mutationTypes as rootMutationTypes,
  mutations as rootMutations
} from '@/store'

import {
  mutations as testimonialsMutations,
  actions as testimonialsActions,
  actionTypes as testimonialsActionsTypes
} from '@/store/testimonials'

import TestimonialsPage from '@/pages/-testimonials'

import testimonialsAttrs from '@/api/factories/testimonial'
import createFactory from '@/api/helpers/factory'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

describe('TestimonialsPage', () => {
  let app
  let store
  let testimonials
  let featuredTestimonials
  let apiResponse
  let apiTestimonialsResponse
  let route
  let router
  let mockGetTestimonials
  let mocksSetBreadcrumbs

  function createTestimonialsPage(page = {}) {
    const wrapper = shallowMount(TestimonialsPage, {
      localVue,
      router,
      store,
      data() {
        return { page }
      },
      mocks: {
        $scrollTo: () => ''
      }
    })

    return wrapper
  }

  beforeEach(() => {
    testimonials = createFactory(testimonialsAttrs, 8)
    featuredTestimonials = createFactory(testimonialsAttrs, 4)

    apiResponse = {
      data: {
        featured_testimonials: _cloneDeep(featuredTestimonials),
        testimonials: _cloneDeep(testimonials)
      },
      meta: {
        current_page: 1,
        total: 48,
        tags: {
          title: 'Отзывы Virna',
          description: 'Virna',
          keywords: 'Virna',
          og_title: 'Virna',
          og_image: '/img/some-img.jpg',
          og_description: 'Virna'
        }
      }
    }

    apiTestimonialsResponse = {
      data: _cloneDeep(testimonials),
      meta: {
        current_page: 1,
        total: 48
      }
    }

    app = (type) => {
      if (type === 'page') {
        return {
          $axios: {
            $get: jest
              .fn()
              .mockImplementation(() => Promise.resolve(apiResponse))
          },
          i18n: {
            t: (url) => url,
            path: (url) => url
          }
        }
      } else {
        return {
          $axios: {
            $get: jest
              .fn()
              .mockImplementation(() =>
                Promise.resolve(apiTestimonialsResponse)
              )
          }
        }
      }
    }

    route = {
      query: {}
    }

    mockGetTestimonials = testimonialsActions[
      testimonialsActionsTypes.GET_TESTIMONIALS
    ].bind(app())
    mocksSetBreadcrumbs = rootMutations[rootMutationTypes.SET_BREADCRUMB]

    store = new Vuex.Store({
      modules: {
        testimonials: {
          namespaced: true,
          state: {
            items: [],
            isLoading: false,
            currentPage: null,
            totalPages: null
          },
          actions: {
            [testimonialsActionsTypes.GET_TESTIMONIALS]: mockGetTestimonials
          },
          mutations: { ...testimonialsMutations }
        }
      },
      state: {
        breadcrumb: []
      },
      mutations: {
        [rootMutationTypes.SET_BREADCRUMB]: mocksSetBreadcrumbs
      }
    })

    router = new VueRouter()
  })

  test('fetch page data', () => {
    const wrapper = createTestimonialsPage(apiResponse)

    expect(wrapper.element).toMatchSnapshot()

    const ctx = { app: app('page'), store, route }
    const data = { page: apiResponse }

    const { asyncData } = wrapper.vm.$options
    expect(asyncData(ctx)).resolves.toEqual(data)
  })

  test('change route query', async () => {
    const wrapper = createTestimonialsPage(apiResponse)

    wrapper.vm.$router.push({
      path: wrapper.vm.$route.path,
      query: { page: 2 }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.testimonialItems).toEqual(apiTestimonialsResponse.data)
  })
})
