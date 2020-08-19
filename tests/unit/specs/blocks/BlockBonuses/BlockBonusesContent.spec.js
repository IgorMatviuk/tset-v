import { shallowMount, createLocalVue } from '@vue/test-utils'
import _cloneDeep from 'lodash.clonedeep'

import { BContainer } from 'bootstrap-vue'

import BlockBonusesContent from '@/components/blocks/BlockBonuses/BlockBonusesContent'

const localVue = createLocalVue()
localVue.component('BContainer', BContainer)

describe('BlockBonusesContent', () => {
  let content

  function createBlockBonusesContent() {
    const wrapper = shallowMount(BlockBonusesContent, {
      localVue,
      propsData: {
        content: _cloneDeep(content)
      }
    })

    return wrapper
  }

  beforeEach(() => {
    content = '<p>Some content</p>'
  })

  test('create bonuses content block', () => {
    const wrapper = createBlockBonusesContent()

    expect(wrapper.element).toMatchSnapshot()
  })
})
