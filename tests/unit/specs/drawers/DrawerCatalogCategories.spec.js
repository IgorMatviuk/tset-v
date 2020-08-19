import { mount, createLocalVue } from '@vue/test-utils'
import _cloneDeep from 'lodash.clonedeep'
import Vuex from 'vuex'

import DrawerCatalogCategories from '@/components/drawers/DrawerCatalogCategories'
import DrawerCatalogCategoriesList from '@/components/drawers/DrawerCatalogCategories/DrawerCatalogCategoriesList'

import categories from '@/api/fixtures/categories'

import { mutations as catalogMutations } from '@/store/catalog'
import { state as uiState, mutations as uiMutations } from '@/store/ui'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('DrawerCatalogCategories', () => {
  let store
  let catalogModule
  let uiModule

  beforeEach(() => {
    catalogModule = {
      state: {
        categories: _cloneDeep(categories)
      },
      mutations: _cloneDeep(catalogMutations)
    }

    uiModule = {
      state: _cloneDeep(uiState),
      mutations: _cloneDeep(uiMutations)
    }

    store = new Vuex.Store({
      modules: {
        catalog: {
          namespaced: true,
          ...catalogModule
        },
        ui: {
          namespaced: true,
          ...uiModule
        }
      }
    })
  })

  test('renders a drawer catalog categories', () => {
    const wrapper = mount(DrawerCatalogCategories, {
      localVue,
      store,
      mocks: {
        $t: (str) => str,
        $i18n: { path: (url) => url },
        $route: {
          path: ''
        }
      },
      stubs: ['svg-icon', 'NuxtLink']
    })

    const categoryList = wrapper.findComponent(DrawerCatalogCategoriesList)
    expect(categoryList.exists()).toBeTruthy()
  })

  test('renders a category list', () => {
    const wrapper = mount(DrawerCatalogCategoriesList, {
      localVue,
      store,
      mocks: {
        $i18n: { path: (url) => url },
        $route: {
          path: ''
        }
      },
      stubs: ['svg-icon', 'NuxtLink']
    })

    let categoriesLength = 0

    catalogModule.state.categories.map((category) => {
      categoriesLength +=
        category.categories && category.categories.length
          ? category.categories.length
          : 1
    })

    const categoriesLinks = wrapper.findAll('.mobile-categories__link')

    expect(categoriesLinks.length).toEqual(categoriesLength)
  })

  test('renders a category list with active link', () => {
    const wrapper = mount(DrawerCatalogCategoriesList, {
      localVue,
      store,
      mocks: {
        $i18n: { path: (url) => url },
        $route: {
          path: catalogModule.state.categories[1].slug
        }
      },
      stubs: ['svg-icon', 'NuxtLink']
    })

    expect(
      wrapper.vm.getLinkIsActive(
        catalogModule.state.categories[1],
        catalogModule.state.categories[1]
      )
    ).toBe(true)

    expect(wrapper.findAll('.mobile-categories__link--active').length).toEqual(
      1
    )
  })

  test('emits "close-drawer" mutations', async () => {
    const wrapper = mount(DrawerCatalogCategoriesList, {
      localVue,
      store,
      mocks: {
        $i18n: { path: (url) => url },
        $route: {
          path: ''
        }
      },
      stubs: ['svg-icon', 'NuxtLink']
    })

    const listItem = wrapper.find('.mobile-categories__list-item')

    listItem.trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$store.state.ui.isCategoriesDrawerVisible).toBe(false)
  })
})
