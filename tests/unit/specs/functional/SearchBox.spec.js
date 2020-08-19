import { mount, createLocalVue } from '@vue/test-utils'
import { BForm, BFormInput } from 'bootstrap-vue'

import SearchBox from '@/components/functional/SearchBox'

const localVue = createLocalVue()
localVue.component('BForm', BForm)
localVue.component('BFormInput', BFormInput)

describe('SearchBox', () => {
  test('renders component without label', () => {
    const wrapper = createSearchBox()

    expect(wrapper.find('.search-box__label').element).toBeUndefined()
  })

  test('renders component with label', () => {
    const wrapper = createSearchBox({
      propsData: {
        withLabel: true
      }
    })

    expect(wrapper.find('.search-box__label').element).toBeVisible()
  })

  test('changes route on form submit', () => {
    const mockRouter = {
      push: jest.fn()
    }

    const wrapper = createSearchBox({
      mocks: {
        $router: mockRouter
      }
    })

    expect(wrapper.vm.query.length).toBe(0)

    wrapper.findComponent(BForm).trigger('submit')
    expect(wrapper.vm.query.length).toBe(0)
    expect(mockRouter.push).not.toBeCalled()

    wrapper.find('.search-box__field').setValue('test query')
    wrapper.findComponent(BForm).trigger('submit')
    expect(wrapper.vm.query.length).toBeGreaterThan(0)
    expect(mockRouter.push).toBeCalled()
  })
})

function createSearchBox({ propsData = {}, mocks = {} } = {}) {
  const wrapper = mount(SearchBox, {
    localVue,
    propsData,
    mocks: {
      ...mocks,
      $t: (str) => str,
      $i18n: {
        path: (str) => str
      }
    },
    stubs: ['svg-icon']
  })

  return wrapper
}
