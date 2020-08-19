import { shallowMount, createLocalVue } from '@vue/test-utils'
import { BContainer, BButton } from 'bootstrap-vue'

import BlockSearchResultNotFound from '@/components/blocks/BlockSearchResult/BlockSearchResultNotFound'

const localVue = createLocalVue()
localVue.component('BContainer', BContainer)
localVue.component('BButton', BButton)

describe('BlockSearchResultNotFound', () => {
  let propsData

  beforeEach(() => {
    propsData = {
      query: 'Платья'
    }
  })

  test('has expected structure', () => {
    const wrapper = shallowMount(BlockSearchResultNotFound, {
      localVue,
      propsData,
      stubs: ['svg-icon'],
      mocks: {
        $t: (str) => str,
        $i18n: {
          path: (slug) => slug
        },
        $store: {
          getters: {
            'catalog/defaultCategorySlug': 'default-category-slug'
          }
        }
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
