import { mount, createLocalVue } from '@vue/test-utils'
import { BTable } from 'bootstrap-vue'

import TheFloatPanel from '@/components/layout/float-panel/TheFloatPanel'

const localVue = createLocalVue()
localVue.component('BTable', BTable)

describe('BlockProductFloatPanel', () => {
  let mockEventBus

  function createFloatPanel() {
    const wrapper = mount(TheFloatPanel, {
      localVue,
      propsData: {
        isVisible: true
      },
      stubs: ['svg-icon'],
      mocks: { $bus: mockEventBus, $t: (path) => path }
    })

    return wrapper
  }

  beforeEach(() => {
    mockEventBus = {
      $emit: jest.fn()
    }
  })

  test('has expected structure', () => {
    const wrapper = createFloatPanel({ $t: (path) => path })

    expect(wrapper.element).toMatchSnapshot()

    wrapper.destroy()
  })

  test('trigger closing the panel by pressing the button', () => {
    const wrapper = createFloatPanel()

    const closeButton = wrapper.find('.float-panel__close')
    closeButton.trigger('click')

    const payload = false
    expect(mockEventBus.$emit).toBeCalledWith('float-panel:toggle', payload)

    wrapper.destroy()
  })

  test('catch outside clicks', () => {
    const wrapper = createFloatPanel()

    const mouseEvent = new MouseEvent('mouseup', { bubbles: true })
    document.body.dispatchEvent(mouseEvent)

    wrapper.destroy()
  })
})
