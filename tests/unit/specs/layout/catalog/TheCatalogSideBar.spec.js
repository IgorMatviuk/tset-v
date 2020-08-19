import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { BCollapse } from 'bootstrap-vue'
import _cloneDeep from 'lodash.clonedeep'

import TheCatalogSideBar from '@/components/layout/catalog/TheCatalogSideBar'
import TheCatalogSideBarCategories from '@/components/layout/catalog/TheCatalogSideBar/TheCatalogSideBarCategories'
import TheCatalogSideBarCategoriesCollapse from '@/components/layout/catalog/TheCatalogSideBar/TheCatalogSideBarCategoriesCollapse'

import categoriesFixture from '@/api/fixtures/categories'
import menusFixture from '@/api/fixtures/menus'

import { getters as rootGetters } from '@/store'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('BCollapse', BCollapse)

describe('TheCatalogSideBar', () => {
  let store
  let state
  let categories
  let activeCategory

  beforeEach(() => {
    categories = _cloneDeep(categoriesFixture)
    activeCategory = categories[0]

    state = {
      activeCategory,
      categories
    }

    store = new Vuex.Store({
      state: {
        menus: _cloneDeep(menusFixture)
      },
      getters: {
        ...rootGetters
      },
      modules: {
        catalog: {
          namespaced: true,
          state
        }
      }
    })
  })

  test('renders a catalog sidebar', () => {
    const wrapper = mount(TheCatalogSideBar, {
      localVue,
      store,
      stubs: ['svg-icon', 'BCollapse', 'NuxtLink'],
      mocks: {
        $t: (str) => str,
        $i18n: { path: (url) => url },
        $route: { fullPath: '', params: { pathMatch: '' } }
      }
    })

    const withSubcategories = state.categories.filter(
      (category) => category.categories && category.categories.length
    )
    const withoutSubcategories = state.categories.filter(
      (category) => category.categories.length < 1
    )

    const categories = wrapper.findComponent(TheCatalogSideBarCategories)
    expect(categories.exists()).toBe(true)

    const collapse = wrapper.findComponent(TheCatalogSideBarCategoriesCollapse)
    expect(collapse.exists()).toBe(true)

    const treeCategories = wrapper.findAllComponents(
      TheCatalogSideBarCategoriesCollapse
    )
    expect(treeCategories.length).toEqual(withSubcategories.length)

    const onlyChildCategories = wrapper.findAll(
      '.catalog-categories__item:not(.category-collapse)'
    )
    expect(onlyChildCategories.length).toEqual(withoutSubcategories.length)
  })

  test('renders promo menu', () => {
    const wrapper = mount(TheCatalogSideBar, {
      localVue,
      store,
      stubs: ['svg-icon', 'BCollapse', 'NuxtLink'],
      mocks: {
        $t: (str) => str,
        $i18n: { path: (url) => url },
        $route: { fullPath: '', params: { pathMatch: '' } }
      }
    })

    const promoLinkItems = wrapper.findAll('.catalog-sidebar__list-item')

    expect(promoLinkItems.length).toEqual(wrapper.vm.promoMenu.columns.length)
  })

  test('renders a categories collapse', async () => {
    const category = _cloneDeep(categories[0])
    const subcategory = _cloneDeep(category.categories[0])

    const wrapper = mount(TheCatalogSideBarCategoriesCollapse, {
      localVue,
      store,
      propsData: { category },
      stubs: ['svg-icon', 'BCollapse', 'NuxtLink'],
      mocks: {
        $i18n: { path: (url) => url },
        $route: {
          fullPath: category.slug,
          params: { pathMatch: category.slug }
        }
      }
    })

    const collapseButton = wrapper.find('.category-collapse__title')
    expect(wrapper.vm.isVisible).toBe(true)

    const targetIsVisible = wrapper.vm.isVisible
    collapseButton.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isVisible).toBe(!targetIsVisible)

    expect(wrapper.vm.getCategoryPath(subcategory)).toEqual(
      `${category.slug}/${subcategory.slug}`
    )
    expect(wrapper.vm.getCategoryPath(category)).toEqual(`${category.slug}`)
  })
})
