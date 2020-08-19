import { shallowMount } from '@vue/test-utils'
import _debounce from 'lodash.debounce'

import QuantityCounter from '@/components/shared/QuantityCounter'

import { PRODUCT_MAX_QTY } from '@/utils/constants'

jest.mock('lodash.debounce', () => jest.fn((fn) => fn))

describe('QuantityCounter', () => {
  beforeEach(() => {
    _debounce.mockClear()
  })

  function createQuantityCounter(initialCount = 1) {
    const wrapper = shallowMount(QuantityCounter, {
      propsData: { count: initialCount },
      stubs: ['svg-icon']
    })

    return wrapper
  }

  describe('Structure', () => {
    test('has expected structure', () => {
      const wrapper = createQuantityCounter()

      expect(wrapper.element).toMatchSnapshot()
      expect(wrapper.vm.count).toMatchSnapshot()

      wrapper.setProps({ count: wrapper.vm.count + 1 })

      expect(wrapper.element).toMatchSnapshot()
      expect(wrapper.vm.count).toMatchSnapshot()
    })
  })

  describe('Change quantity', () => {
    test('increase quantity', async () => {
      const wrapper = createQuantityCounter(2)
      const btn = wrapper.find('.counter__toggle--decrease')

      expect(wrapper.vm.counterValue).toBe(2)
      await btn.trigger('click')
      expect(wrapper.vm.counterValue).toBe(1)

      await btn.trigger('click')
      expect(wrapper.vm.counterValue).toBe(1)
    })

    test('decrease quantity', async () => {
      const wrapper = createQuantityCounter(1)
      const btn = wrapper.find('.counter__toggle--increase')

      expect(wrapper.vm.counterValue).toBe(1)
      await btn.trigger('click')
      expect(wrapper.vm.counterValue).toBe(2)

      await btn.trigger('click')
      expect(wrapper.vm.counterValue).toBe(3)
    })

    test('manually change quantity', async () => {
      const wrapper = createQuantityCounter()
      const input = wrapper.find('.counter__input')

      // Set a value grater than a max
      await input.setValue(PRODUCT_MAX_QTY + 1)
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.counterValue).toBe(PRODUCT_MAX_QTY)
      expect(wrapper.emitted('change').length).toBe(1)

      // Set a string value
      await input.setValue('invalid')
      expect(wrapper.vm.counterValue).toBe(1)

      // Set a negative value
      await input.setValue(-1)
      expect(wrapper.vm.counterValue).toBe(1)
    })
  })
})
