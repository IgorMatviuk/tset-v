import { shallowMount, createLocalVue } from '@vue/test-utils'
import { BContainer, BButton } from 'bootstrap-vue'
import _cloneDeep from 'lodash.clonedeep'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import BlockCollections from '@/components/blocks/BlockCollections'
import BlockCollectionsCard from '@/components/blocks/BlockCollections/BlockCollectionsCard'
import BlockCollectionsSlider from '@/components/blocks/BlockCollections/BlockCollectionsSlider'

import categories from '@/api/fixtures/categories'

const localVue = createLocalVue()
localVue.use(VueAwesomeSwiper)
localVue.component('BContainer', BContainer)
localVue.component('BButton', BButton)

function createCollections(props) {
  const mockEventBus = {
    $emit: jest.fn()
  }

  return shallowMount(BlockCollections, {
    localVue,
    propsData: {
      ...props
    },
    mocks: {
      $t: (str) => str,
      $i18n: { path: (url) => url },
      $bus: mockEventBus
    },
    stubs: ['svg-icon', 'NuxtLink']
  })
}

describe('BlockCollections', () => {
  test('render static collections', () => {
    const wrapper = createCollections({
      collections: _cloneDeep(categories).slice(2),
      staticCollections: true
    })

    const collectionCards = wrapper.findAllComponents(BlockCollectionsCard)
    expect(collectionCards.length).toEqual(wrapper.vm.collections.length)
  })

  test('render collections slider', () => {
    const wrapper = createCollections({
      collections: _cloneDeep(categories),
      staticCollections: false
    })

    expect(wrapper.findComponent(BlockCollectionsSlider).exists()).toBe(true)
  })
})
