import { shallowMount } from '@vue/test-utils'

import TheFooterCopyright from '@/components/layout/footer/TheFooterCopyright'

import '@/tests/unit/mocks/match-media'

function createListWrapper() {
  return shallowMount(TheFooterCopyright, {
    mocks: {
      $t: (str) => str
    },
    stubs: ['svg-icon']
  })
}

describe('TheFooterCopyright', () => {
  test('render footer copyright', () => {
    const wrapper = createListWrapper()

    const currYear = new Date().getFullYear()

    expect(wrapper.vm.currYear).toBe(currYear)
  })
})
