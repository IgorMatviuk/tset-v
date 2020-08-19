import { shallowMount, createLocalVue } from '@vue/test-utils'
import _cloneDeep from 'lodash.clonedeep'

import { BContainer } from 'bootstrap-vue'

import BlockBonusesVip from '@/components/blocks/BlockBonuses/BlockBonusesVip'

const localVue = createLocalVue()
localVue.component('BContainer', BContainer)

describe('BlockBonusesVip', () => {
  let content

  function createBlockBonusesVip() {
    const wrapper = shallowMount(BlockBonusesVip, {
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
        {
          content: '',
          icon: '',
          title: ''
        },
        {
          content: '',
          icon: '',
          title: ''
        }
      ],
      title: ''
    }
  })

  test('create bonuses vip block', () => {
    const wrapper = createBlockBonusesVip()

    expect(wrapper.element).toMatchSnapshot()
  })
})
