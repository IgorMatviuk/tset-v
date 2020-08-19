import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import _cloneDeep from 'lodash.clonedeep'

import HomePage from '@/pages/-index'

import { mutations as rootMutations } from '@/store'
import { mutations as cartMutations } from '@/store/cart'

import categoriesFixture from '@/api/fixtures/categories'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Product', () => {
  let app
  let store
  let apiResponse

  beforeEach(() => {
    apiResponse = {
      data: {
        current_offers: [],
        features: [],
        featured_products: [],
        testimonials: [],
        recent_posts: [],
        meta: {
          seo_text: ''
        }
      }
    }

    app = {
      $axios: {
        $get: () => Promise.resolve(apiResponse)
      }
    }

    store = new Vuex.Store({
      modules: {
        cart: {
          namespaced: true,
          state: { cartData: [], isOrderSaved: true },
          mutations: { ...cartMutations }
        },
        catalog: {
          namespaced: true,
          state: {
            categories: _cloneDeep(categoriesFixture)
          }
        }
      },
      mutations: { ...rootMutations }
    })
  })

  test('renders component itself', async () => {
    const wrapper = shallowMount(HomePage, {
      localVue,
      store,
      data() {
        return {
          page: _cloneDeep(apiResponse.data)
        }
      },
      mocks: {
        $t: (url) => url
      }
    })

    const asyncData = await wrapper.vm.$options.asyncData({ app, store })
    expect(asyncData.page).toEqual(apiResponse.data)
  })
})
