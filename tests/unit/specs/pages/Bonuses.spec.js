import { shallowMount } from '@vue/test-utils'

import BonusesPage from '@/pages/-bonuses'

describe('BonusesPage', () => {
  test('create bonuses page', () => {
    const wrapper = shallowMount(BonusesPage, {
      mocks: {
        $t: jest.fn(),
        $i18n: {
          path: jest.fn()
        }
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
