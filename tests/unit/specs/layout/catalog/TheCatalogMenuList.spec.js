import { shallowMount } from '@vue/test-utils'
import _cloneDeep from 'lodash.clonedeep'

import TheCatalogMenuList from '@/components/layout/catalog/TheCatalogMenu/TheCatalogMenuList'

import menusFixture from '@/api/fixtures/menus'

function createListWrapper(category, $i18n) {
  return shallowMount(TheCatalogMenuList, {
    propsData: {
      category
    },
    mocks: {
      $i18n
    },
    stubs: ['NuxtLink']
  })
}

describe('TheCatalogMenuList', () => {
  let categories
  let noChildrenColumn
  let fullfiledColumn
  let i18nMock

  beforeEach(() => {
    const menus = _cloneDeep(menusFixture)

    categories = menus.find((menu) => menu.menu_type === 'catalog')
    noChildrenColumn = categories.columns.find((column) => !column.items.length)
    fullfiledColumn = categories.columns.find((column) => column.items.length)

    i18nMock = { path: (url) => url }
  })

  test('renders a list without children', () => {
    const wrapper = createListWrapper(noChildrenColumn, i18nMock)
    const categoryItems = wrapper.findAll('.catalog-menu__item')

    expect(wrapper.element.tagName).toBe('UL')
    expect(categoryItems.length).toBe(1)
  })

  test('renders a list of items', () => {
    const wrapper = createListWrapper(fullfiledColumn, i18nMock)
    const categoryItems = wrapper.findAll('.catalog-menu__item')
    const categoriesCount = fullfiledColumn.items.length + 1

    expect(wrapper.element.tagName).toBe('UL')
    expect(categoryItems.length).toBe(categoriesCount)
  })
})
