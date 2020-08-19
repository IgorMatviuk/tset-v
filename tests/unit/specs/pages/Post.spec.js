import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import Post from '@/pages/-post'

import { mutations as rootMutations } from '@/store'

import createFactory from '@/api/helpers/factory'
import postAttrs from '@/api/factories/post'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Post', () => {
  let app
  let route
  let store
  let post
  let relatedPosts
  let apiResponse
  let page

  function createPostPage(page = {}) {
    const wrapper = shallowMount(Post, {
      localVue,
      store,
      data() {
        return { page }
      },
      mocks: {
        $t: jest.fn(),
        $i18n: {
          path: (str) => str
        }
      }
    })

    return wrapper
  }

  beforeEach(() => {
    post = createFactory(postAttrs, 1)[0]
    relatedPosts = createFactory(postAttrs, 5)

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
      params: {
        slug: 'some-slug'
      }
    }

    store = new Vuex.Store({
      state: {
        locale: 'ru',
        fallbackLocale: 'ru',
        breadcrumb: []
      },
      mutations: {
        ...rootMutations
      }
    })

    apiResponse = {
      data: {
        post,
        related_posts: relatedPosts
      },
      links: {
        prev: {
          slug: '',
          title: ''
        },
        next: {
          slug: '',
          title: ''
        }
      },
      meta: {
        title: 'Пост Virna',
        description: 'Virna',
        keywords: 'Virna',
        og_title: 'Virna',
        og_image: '/img/some-img.jpg',
        og_description: 'Virna'
      }
    }

    page = {
      data: {
        post: {},
        related_posts: []
      },
      links: {
        prev: {
          slug: '',
          title: ''
        },
        next: {
          slug: '',
          title: ''
        }
      },
      meta: {
        title: '',
        description: '',
        keywords: '',
        og_title: '',
        og_image: '',
        og_description: ''
      }
    }
  })

  test('renders post page', () => {
    const wrapper = createPostPage(page)

    const { asyncData } = wrapper.vm.$options
    const ctx = { app, store, route }
    const data = { page: apiResponse }
    expect(asyncData(ctx)).resolves.toEqual(data)

    expect(wrapper.element).toMatchSnapshot()
  })

  test('calls error hook if page not found', async () => {
    route.params.slug = '/not-exist'

    const mockError = jest.fn()
    const mockRejectResult = { statusCode: 404, message: 'Page not found' }

    const wrapper = createPostPage(page)
    const { asyncData } = wrapper.vm.$options
    const ctx = { app, store, route, error: mockError }

    expect(asyncData(ctx)).resolves.toEqual({})
    await wrapper.vm.$nextTick()
    expect(mockError).toBeCalledWith(mockRejectResult)
  })
})
