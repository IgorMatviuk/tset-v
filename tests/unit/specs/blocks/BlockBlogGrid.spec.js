import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import _cloneDeep from 'lodash.clonedeep'

import { BContainer, BButton, BPagination } from 'bootstrap-vue'

import BlockBlogGrid from '@/components/blocks/BlockBlogGrid'

import createFactory from '@/api/helpers/factory'
import postAttrs from '@/api/factories/post'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('BContainer', BContainer)
localVue.component('BButton', BButton)
localVue.component('BPagination', BPagination)

describe('BlockBlogGrid', () => {
  let posts
  let store

  function createBlockBlogGrid(props) {
    const wrapper = mount(BlockBlogGrid, {
      localVue,
      store,
      propsData: {
        ...props
      },
      mocks: {
        $i18n: {
          path: (path) => path
        },
        $t: (path) => path
      },
      stubs: ['NuxtLink', 'svg-icon']
    })

    return wrapper
  }

  beforeEach(() => {
    posts = createFactory(postAttrs, 8)

    store = new Vuex.Store({
      modules: {
        blog: {
          namespaced: true,
          state: {
            currentPage: 1,
            totalPages: 6
          }
        }
      }
    })
  })

  test('render blog grid', () => {
    const wrapper = createBlockBlogGrid({
      posts: _cloneDeep(posts),
      isLoading: false
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  test('render blog grid with preloader overlay', () => {
    const wrapper = createBlockBlogGrid({
      posts: _cloneDeep(posts),
      isLoading: true
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
