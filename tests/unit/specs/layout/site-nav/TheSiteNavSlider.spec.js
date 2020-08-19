import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import _cloneDeep from 'lodash.clonedeep'

import TheSiteNavSlider from '@/components/layout/site-nav/TheSiteNavSlider'

import { getters as rootGetters } from '@/store'

import menusFixture from '@/api/fixtures/menus'
import categoriesFixture from '@/api/fixtures/categories'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('TheSiteNavSlider', () => {
  let state
  let getters
  let store

  beforeEach(() => {
    state = {
      menus: _cloneDeep(menusFixture),
      catalog: {
        categories: _cloneDeep(categoriesFixture)
      }
    }

    getters = {
      ...rootGetters
    }

    store = new Vuex.Store({
      state,
      getters
    })
  })

  function createSlider() {
    const wrapper = shallowMount(TheSiteNavSlider, {
      localVue,
      store,
      mocks: {
        $t: (str) => str,
        $i18n: {
          path: (str) => str
        }
      },
      stubs: ['svg-icon', 'NuxtLink']
    })

    return wrapper
  }

  test('renders root items', () => {
    const wrapper = createSlider()
    const rootList = wrapper.find('.nav-slider--root')

    expect(wrapper.element).toMatchSnapshot()
    expect(rootList).not.toBeNull()
    expect(rootList.element.tagName).toBe('UL')
    expect(wrapper.findAll('li').length).toBeGreaterThan(0)
  })

  test('renders an items tree', () => {
    const wrapper = createSlider()
    const nestedList = wrapper.find('.nav-slider--root .nav-slider')

    expect(wrapper.vm.categories).not.toBeUndefined()
    expect(nestedList).not.toBeNull()
    expect(nestedList.find('.nav-slider').element).toBeTruthy()
    expect(nestedList.findAll('.nav-slider__item').length).toBeGreaterThan(0)
  })

  test('navigates by items tree', async () => {
    const wrapper = createSlider()
    let itemList = wrapper.find('.nav-slider--root')
    let btnForward = itemList.find('.nav-slider__link')

    expect(itemList.element).toHaveClass('nav-slider')
    expect(btnForward).not.toBeNull()
    expect(btnForward.element.tagName).toBe('SPAN')

    btnForward.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.offset).toBe(1)

    itemList = wrapper.find(
      '.nav-slider:not(.nav-slider--passed):not(.nav-slider--inactive)'
    )
    btnForward = itemList.find('.nav-slider__link')
    btnForward.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.offset).toBe(2)

    const btnBack = wrapper.find('.nav-slider__btn-back')
    btnBack.trigger('click')
    expect(wrapper.vm.offset).toBe(1)
  })
})
