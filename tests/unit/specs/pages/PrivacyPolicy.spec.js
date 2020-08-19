import { shallowMount } from '@vue/test-utils'

import About from '@/pages/-privacy-policy.vue'

describe('Privacy policy page', () => {
  test('has expected structure', () => {
    const wrapper = shallowMount(About, {
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
