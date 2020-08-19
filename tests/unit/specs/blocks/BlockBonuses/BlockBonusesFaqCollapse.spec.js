import { shallowMount, createLocalVue } from '@vue/test-utils'
import _cloneDeep from 'lodash.clonedeep'

import { BCollapse } from 'bootstrap-vue'

import BlockBonusesFaqCollapse from '@/components/blocks/BlockBonuses/BlockBonusesFaqCollapse'

const localVue = createLocalVue()
localVue.component('BCollapse', BCollapse)

describe('BlockBonusesFaqCollapse', () => {
  let content

  function createBlockBonusesFaqCollapse() {
    const wrapper = shallowMount(BlockBonusesFaqCollapse, {
      localVue,
      propsData: {
        content: _cloneDeep(content)
      }
    })

    return wrapper
  }

  beforeEach(() => {
    content = {
      content: '',
      title: ''
    }
  })

  test('create bonuses vip block', () => {
    const wrapper = createBlockBonusesFaqCollapse()

    expect(wrapper.element).toMatchSnapshot()
  })

  test('toggle bonuses collapse visibility', () => {
    const wrapper = createBlockBonusesFaqCollapse()

    const collapseToggler = wrapper.find('.faq-collapse__title')
    collapseToggler.trigger('click')
    expect(wrapper.vm.isVisible).toBe(true)
  })
})
