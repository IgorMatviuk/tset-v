import { shallowMount } from '@vue/test-utils'

import Contacts from '@/pages/-contacts.vue'

describe('Contacts page', () => {
  test('has expected structure', () => {
    const wrapper = shallowMount(Contacts, {
      mocks: {
        $t: (str) => str,
        $i18n: {
          path: (str) => str
        },
        $store: {
          state: {
            breadcrumb: []
          }
        }
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
