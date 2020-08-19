import { mount, createLocalVue } from '@vue/test-utils'
import _cloneDeep from 'lodash.clonedeep'

import BlockCollectionsThumbsSlider from '@/components/blocks/BlockCollections/BlockCollectionsThumbsSlider'

import categories from '@/api/fixtures/categories'

const localVue = createLocalVue()

describe('BlockCollectionsThumbsSlider', () => {
  test('renders a thumb collections slider', () => {
    const mockEventBus = {
      $emit: jest.fn(),
      $on: jest.fn(() => mockEventBus.$emit())
    }

    const wrapper = mount(BlockCollectionsThumbsSlider, {
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

    expect(wrapper.vm.$bus.$on).toBeCalled()

    wrapper.vm.$bus.$emit()
    wrapper.vm.changeActiveCategories(2)

    expect(wrapper.vm.$bus.$emit).toBeCalled()
    expect(wrapper.vm.activeItemIndex).toEqual(2)
  })
})
