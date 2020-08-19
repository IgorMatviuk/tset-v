import { mount, createLocalVue } from '@vue/test-utils'
import _cloneDeep from 'lodash.clonedeep'
import { BButton } from 'bootstrap-vue'

import BlockCollectionsCard from '@/components/blocks/BlockCollections/BlockCollectionsCard'

import categories from '@/api/fixtures/categories'

const localVue = createLocalVue()
localVue.component('BButton', BButton)

function createCollectionCard(props) {
  return mount(BlockCollectionsCard, {
    localVue,
    propsData: {
      collection: props
    },
    mocks: {
      $i18n: { path: (url) => url }
    },
    stubs: ['NuxtLink']
  })
}

describe('BlockCollectionsCard', () => {
  test('renders a collection card', () => {
    const wrapper = createCollectionCard(_cloneDeep(categories)[0])
    const popularCategories = _cloneDeep(categories)[0]
      .categories.sort(({ popularity: a }, { popularity: b }) => b - a)
      .slice(0, 2)

    expect(wrapper.vm.popularSubcategories).toEqual(popularCategories)
  })

  test('renders a collection card without subcategories', () => {
    const wrapper = createCollectionCard(_cloneDeep(categories)[1])

    expect(wrapper.vm.popularSubcategories.length).toBe(0)
  })
})
