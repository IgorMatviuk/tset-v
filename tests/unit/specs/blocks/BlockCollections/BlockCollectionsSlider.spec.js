import { mount, createLocalVue } from '@vue/test-utils'
import _cloneDeep from 'lodash.clonedeep'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import { BButton } from 'bootstrap-vue'

import BlockCollectionsSlider from '@/components/blocks/BlockCollections/BlockCollectionsSlider'

import categories from '@/api/fixtures/categories'

const localVue = createLocalVue()
localVue.use(VueAwesomeSwiper)
localVue.component('BButton', BButton)

describe('BlockCollectionsSlider', () => {
  test('renders a collections slider', async () => {
    const mockEventBus = {
      $emit: jest.fn()
    }

    const wrapper = mount(BlockCollectionsSlider, {
      localVue,
      propsData: {
        collections: _cloneDeep(categories)
      },
      mocks: {
        $bus: mockEventBus,
        $i18n: { path: (url) => url }
      },
      stubs: ['NuxtLink']
    })

    await wrapper.vm.collectionSlider.slideNext()

    expect(mockEventBus.$emit).toBeCalled()
  })
})
