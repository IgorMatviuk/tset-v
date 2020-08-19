import { shallowMount, createLocalVue } from '@vue/test-utils'
import _cloneDeep from 'lodash.clonedeep'

import { BContainer, BTable } from 'bootstrap-vue'

import BlockBonusesTable from '@/components/blocks/BlockBonuses/BlockBonusesTable'

const localVue = createLocalVue()
localVue.component('BContainer', BContainer)
localVue.component('BTable', BTable)

describe('BlockBonusesTable', () => {
  let items

  function createBlockBonusesTable() {
    const wrapper = shallowMount(BlockBonusesTable, {
      localVue,
      propsData: {
        items: _cloneDeep(items)
      },
      mocks: {
        $t: jest.fn()
      },
      stubs: ['svg-icon']
    })

    return wrapper
  }

  beforeEach(() => {
    items = [
      {
        amount: '',
        percent: ''
      },
      {
        amount: '',
        percent: ''
      },
      {
        amount: '',
        percent: ''
      }
    ]
  })

  test('create bonuses vip block', () => {
    const wrapper = createBlockBonusesTable()

    expect(wrapper.element).toMatchSnapshot()
  })
})
