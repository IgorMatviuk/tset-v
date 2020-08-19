import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import TheLangToggler from '@/components/layout/header/TheLangToggler'

import {
  mutations as rootMutations,
  mutationTypes as rootMutationTypes
} from '@/store'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('TheLangToggler', () => {
  let state
  let mutations
  let store
  let events

  beforeEach(() => {
    state = {
      locale: 'ru',
      locales: ['ua', 'ru'],
      fallbackLocale: 'ru'
    }

    mutations = {
      [rootMutationTypes.SET_LANG]: rootMutations[rootMutationTypes.SET_LANG]
    }

    store = new Vuex.Store({ state, mutations })

    events = {}

    document.addEventListener = jest.fn((event, cb) => {
      events[event] = cb
    })

    document.removeEventListener = jest.fn((event) => {
      delete events[event]
    })
  })

  test('toggles visibility', () => {
    const wrapper = shallowMount(TheLangToggler, {
      localVue,
      store,
      mocks: {
        $route: {
          path: '/'
        }
      },
      stubs: ['svg-icon', 'BPopover']
    })

    expect(wrapper.vm.isVisible).toBe(false)
    wrapper.trigger('click')
    expect(wrapper.vm.isVisible).toBe(true)

    expect(events.mouseup).toBeDefined()
    events.mouseup()
    expect(wrapper.vm.isVisible).toBe(false)
    events.mouseup()
    expect(wrapper.vm.isVisible).toBe(false)
  })

  test('getLocalizedPath', () => {
    const wrapper = shallowMount(TheLangToggler, {
      localVue,
      store,
      mocks: {
        $route: {
          fullPath: '/'
        }
      },
      stubs: ['svg-icon', 'BPopover']
    })

    expect(wrapper.vm.locale).toEqual(state.fallbackLocale)
    expect(wrapper.vm.getLocalizedPath(wrapper.vm.locale)).toBe('/')

    rootMutations[rootMutationTypes.SET_LANG](state, 'ua')
    expect(wrapper.vm.locale).toEqual('ua')
    expect(wrapper.vm.getLocalizedPath(wrapper.vm.locale)).toBe('/ua/')
  })

  test('triggers mouseup event', () => {
    const mockDestroyed = jest.fn()

    const wrapper = shallowMount(TheLangToggler, {
      localVue,
      store,
      mocks: {
        $route: {
          fullPath: '/'
        }
      },
      stubs: ['svg-icon', 'BPopover'],
      destroyed: mockDestroyed
    })

    expect(events.mouseup).toBeDefined()

    wrapper.destroy()

    expect(mockDestroyed).toBeCalled()
    expect(events.mouseup).not.toBeDefined()
  })
})
