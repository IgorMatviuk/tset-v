import { shallowMount, createLocalVue } from '@vue/test-utils'
import _cloneDeep from 'lodash.clonedeep'

import { BContainer } from 'bootstrap-vue'

import BlockBonusesFaq from '@/components/blocks/BlockBonuses/BlockBonusesFaq'

const localVue = createLocalVue()
localVue.component('BContainer', BContainer)

describe('BlockBonusesFaq', () => {
  let content

  function createBlockBonusesFaq() {
    const wrapper = shallowMount(BlockBonusesFaq, {
      localVue,
      propsData: {
        content: _cloneDeep(content)
      }
    })

    return wrapper
  }

  beforeEach(() => {
    content = {
      items: [
        { content: '', title: '' },
        { content: '', title: '' },
        { content: '', title: '' }
      ],
      title: ''
    }
  })

  test('create bonuses vip block', () => {
    const wrapper = createBlockBonusesFaq()

    expect(wrapper.element).toMatchSnapshot()
  })
})
