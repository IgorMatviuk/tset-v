import { shallowMount, createLocalVue } from '@vue/test-utils'
import _cloneDeep from 'lodash.clonedeep'
import { BCollapse } from 'bootstrap-vue'

import TheFooterList from '@/components/layout/footer/TheFooterList'

import menusMock from '@/api/fixtures/menus'

import '@/tests/unit/mocks/match-media'

const localVue = createLocalVue()
localVue.component('BCollapse', BCollapse)

function createListWrapper(column, $i18n) {
  return shallowMount(TheFooterList, {
    localVue,
    propsData: {
      column
    },
    mocks: {
      $route: {
        params: {
          pathMatch: '/'
        }
      },
      $i18n,
      $device: { isMobile: () => true }
    },
    stubs: ['svg-icon', 'NuxtLink']
  })
}

describe('TheFooterList', () => {
  let menus
  let i18nMock

  beforeEach(() => {
    menus = _cloneDeep(menusMock)
    i18nMock = { path: (url) => url }
  })

  test('render list', () => {
    const wrapper = createListWrapper(menus[1].columns[0], i18nMock)

    expect(wrapper.vm.isVisible).toBe(false)
    expect(wrapper.vm.allowCollapse).toBe(true)
  })
})
