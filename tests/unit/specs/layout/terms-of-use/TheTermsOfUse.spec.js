import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import { BButton } from 'bootstrap-vue'

import TheTermsOfUse from '@/components/layout/terms-of-use/TheTermsOfUse'

import { mutations as uiMutations } from '@/store/ui'

const localVue = createLocalVue()
localVue.component('BButton', BButton)
localVue.use(Vuex)

describe('TheImageViewer', () => {
  let store

  function createTheImageViewer() {
    const wrapper = mount(TheTermsOfUse, {
      localVue,
      store,
      mocks: {
        $t: (path) => path,
        $i18n: {
          path: (url) => url
        }
      },
      stubs: ['NuxtLink', 'svg-icon']
    })

    return wrapper
  }

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        ui: {
          namespaced: true,
          state: {
            isTermsOfUseVisible: true
          },
          mutations: { ...uiMutations }
        }
      }
    })
  })

  test('render the terms of use', () => {
    const wrapper = createTheImageViewer()

    expect(wrapper.element).toMatchSnapshot()
  })

  test('closing by clicking a "close" button', () => {
    const wrapper = createTheImageViewer()

    const closeButton = wrapper.find('.terms-of-use__close')
    closeButton.trigger('click')
    expect(store.state.ui.isTermsOfUseVisible).toBe(false)
  })

  test('closing by clicking a link', () => {
    const wrapper = createTheImageViewer()

    const link = wrapper.find('.terms-of-use__link')
    link.trigger('click')
    expect(store.state.ui.isTermsOfUseVisible).toBe(false)
  })

  test('closing by clicking a "accept" button', () => {
    const wrapper = createTheImageViewer()

    const btn = wrapper.find('.terms-of-use__btn-accept')
    btn.trigger('click')
    expect(store.state.ui.isTermsOfUseVisible).toBe(false)
  })
})
