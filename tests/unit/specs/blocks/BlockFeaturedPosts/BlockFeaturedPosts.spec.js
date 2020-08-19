import { mount, createLocalVue } from '@vue/test-utils'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import { BContainer, BButton } from 'bootstrap-vue'
import _cloneDeep from 'lodash.clonedeep'

import BlockFeaturedPosts from '@/components/blocks/BlockFeaturedPosts'

import createFactory from '@/api/helpers/factory'
import postAttrs from '@/api/factories/post'

const localVue = createLocalVue()

localVue.use(VueAwesomeSwiper)
localVue.component('BContainer', BContainer)
localVue.component('BButton', BButton)

describe.skip('BlockFeaturedPosts', () => {
  let featuredPosts

  beforeEach(() => {
    featuredPosts = _cloneDeep(createFactory(postAttrs, 4))
  })

  test('renders a slider', () => {
    const wrapper = mount(BlockFeaturedPosts, {
      localVue,
      propsData: {
        posts: featuredPosts
      },
      stubs: ['svg-icon', 'NuxtLink'],
      mocks: {
        $i18n: { path: (url) => url },
        $t: (path) => path
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
