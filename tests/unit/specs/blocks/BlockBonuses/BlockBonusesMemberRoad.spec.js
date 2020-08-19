import { shallowMount, createLocalVue } from '@vue/test-utils'
import _cloneDeep from 'lodash.clonedeep'

import { BContainer } from 'bootstrap-vue'

import BlockBonusesMemberRoad from '@/components/blocks/BlockBonuses/BlockBonusesMemberRoad'

const localVue = createLocalVue()
localVue.component('BContainer', BContainer)

describe('BlockBonusesMemberRoad', () => {
  let content

  function createBlockBonusesMemberRoad() {
    const wrapper = shallowMount(BlockBonusesMemberRoad, {
      localVue,
      propsData: {
        content: _cloneDeep(content)
      },
      stubs: ['svg-icon']
    })

    return wrapper
  }

  beforeEach(() => {
    content = {
      items: [
        { content: '', icon: '' },
        { content: '', icon: '' },
        { content: '', icon: '' }
      ],
      title: ''
    }
  })

  test('create bonuses vip block', () => {
    const wrapper = createBlockBonusesMemberRoad()

    expect(wrapper.element).toMatchSnapshot()
  })
})
