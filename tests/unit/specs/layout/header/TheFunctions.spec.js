import { shallowMount, createLocalVue } from '@vue/test-utils'
import _cloneDeep from 'lodash.clonedeep'
import Vuex from 'vuex'

import TheFunctions from '@/components/layout/header/TheFunctions'

import contacts from '@/api/fixtures/contacts'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('TheMasthead', () => {
  let store

  function createTheFunctions() {
    const wrapper = shallowMount(TheFunctions, {
      localVue,
      store,
      mocks: {
        $i18n: {
          path: (str) => str
        }
      },
      stubs: ['svg-icon', 'NuxtLink']
    })

    return wrapper
  }

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        contacts: _cloneDeep(contacts)
      }
    })
  })

  test('renders TheFunctions components', () => {
    const wrapper = createTheFunctions()

    expect(wrapper.element).toMatchSnapshot()
  })
})
