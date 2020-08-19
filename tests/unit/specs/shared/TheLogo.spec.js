import { shallowMount } from '@vue/test-utils'

import TheLogo from '@/components/shared/TheLogo'

describe('TheLogo', () => {
  test('isHomePage => true', () => {
    const wrapper = shallowMount(TheLogo, {
      mocks: {
        $store: {
          state: {
            locale: 'ru'
          }
        },
        $route: {
          path: '/'
        }
      }
    })

    expect(wrapper.vm.isHomePage).toBe(true)
  })

  test('isHomePage => false', () => {
    const wrapper = shallowMount(TheLogo, {
      mocks: {
        $store: {
          state: {
            locale: 'ru'
          }
        },
        $route: {
          path: '/some/nested/path'
        },
        $i18n: {
          path: (str) => str
        }
      },
      stubs: ['NuxtLink']
    })

    expect(wrapper.vm.isHomePage).toBe(false)
  })
})
