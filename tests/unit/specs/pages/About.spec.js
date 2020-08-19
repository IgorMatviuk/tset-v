import { shallowMount } from '@vue/test-utils'

import About from '@/pages/-about.vue'

describe('About page', () => {
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
