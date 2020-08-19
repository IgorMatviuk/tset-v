import { shallowMount } from '@vue/test-utils'

import TheBurger from '@/components/layout/header/TheBurger'

describe('TheBurger', () => {
  let events

  beforeEach(() => {
    events = {}

    document.body.addEventListener = jest.fn((event, cb) => {
      events[event] = cb
    })
  })

  test('toggleStatus with inactive status', async () => {
    const wrapper = createBurger({ isActive: false })

    expect(wrapper.element).not.toHaveClass('burger--active')
    expect(wrapper.vm.isActive).toBe(false)

    wrapper.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted()['toggle-status']).toBeTruthy()
  })

  test('toggleStatus with active status', async () => {
    const wrapper = createBurger({ isActive: true })

    expect(wrapper.element).toHaveClass('burger--active')
    expect(wrapper.vm.isActive).toBe(true)

    wrapper.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted()['toggle-status']).toBeTruthy()
  })

  test('onOutSideClick calls with outside element', async () => {
    const wrapper = createBurger({ isActive: false })

    wrapper.trigger('click')
    await wrapper.vm.$nextTick()

    events.mouseup({ target: document.body })
    expect(wrapper.emitted('toggle-status').length).toBe(2)
  })

  test('onOutSideClick calls with root element', async () => {
    const wrapper = createBurger({ isActive: false })

    wrapper.trigger('click')
    await wrapper.vm.$nextTick()

    events.mouseup({ target: wrapper.element })

    expect(wrapper.emitted('toggle-status').length).toBe(1)
  })

  test('calls "updated" hoook', async () => {
    const wrapper = createBurger({ isActive: false })

    expect(wrapper.vm.isActive).toBe(false)
    wrapper.setProps({ isActive: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isActive).toBe(true)

    wrapper.setProps({ isActive: false })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isActive).toBe(false)
  })
})

function createBurger({ isActive }) {
  const wrapper = shallowMount(TheBurger, {
    propsData: { isActive }
  })

  return wrapper
}
