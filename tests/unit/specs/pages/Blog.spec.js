import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import Blog from '@/pages/-blog'

import { mutations as rootMutations } from '@/store'
import {
  state as blogState,
  mutations as blogMutations,
  actions as blogActions
} from '@/store/blog'

import createFactory from '@/api/helpers/factory'
import postAttrs from '@/api/factories/post'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

describe('Blog', () => {
  let app
  let route
  let router
  let store
  let posts
  let apiResponse
  let mockScrollTo

  function createBlogPage() {
    const wrapper = shallowMount(Blog, {
      localVue,
      store,
      router,
      mocks: {
        $t: jest.fn(),
        $i18n: {
          path: (str) => str
        },
        $scrollTo: mockScrollTo
      }
    })

    return wrapper
  }

  beforeEach(() => {
    posts = createFactory(postAttrs, 8)

    app = {
      i18n: {
        t: (str) => str,
        path: (str) => str
      },
      $axios: {
        $get: jest.fn().mockImplementation((url) => {
          if (url.includes('not-exist')) {
            return Promise.reject(new Error('Page not found'))
          } else {
            return Promise.resolve(apiResponse)
          }
        })
      }
    }

    route = {
      query: {}
    }

    store = new Vuex.Store({
      state: {
        locale: 'ru',
        fallbackLocale: 'ru',
        breadcrumb: []
      },
      mutations: {
        ...rootMutations
      },
      modules: {
        blog: {
          namespaced: true,
          state: {
            ...blogState(),
            currentPage: null,
            totalPages: null
          },
          mutations: { ...blogMutations },
          actions: { ...blogActions }
        }
      }
    })

    router = new VueRouter()

    apiResponse = {
      data: posts,
      meta: {
        current_page: 1,
        total: 6,
        tags: {
          title: 'Блог Virna',
          description: 'Virna',
          keywords: 'Virna',
          og_title: 'Virna',
          og_image: '/img/some-img.jpg',
          og_description: 'Virna'
        }
      }
    }

    Object.defineProperty(store, '$axios', {
      value: {
        $get: () => Promise.resolve(apiResponse)
      }
    })

    mockScrollTo = jest.fn()
  })

  test('renders blog page', () => {
    const wrapper = createBlogPage()

    const { asyncData } = wrapper.vm.$options
    const ctx = { app, store, route }
    const data = { page: apiResponse }
    expect(asyncData(ctx)).resolves.toEqual(data)

    expect(wrapper.element).toMatchSnapshot()
  })

  test('calls error hook if page not found', async () => {
    route.query.page = '/not-exist'

    const mockError = jest.fn()
    const mockRejectResult = { statusCode: 404, message: 'Page not found' }

    const wrapper = createBlogPage()
    const { asyncData } = wrapper.vm.$options
    const ctx = { app, store, route, error: mockError }

    expect(asyncData(ctx)).resolves.toEqual({})
    await wrapper.vm.$nextTick()
    expect(mockError).toBeCalledWith(mockRejectResult)
  })

  test('change route query', async () => {
    const wrapper = createBlogPage()

    const query = {
      pages: 2
    }

    wrapper.vm.$router.push({ path: wrapper.vm.$route.path, query })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.posts.length).toEqual(apiResponse.data.length)
  })
})
