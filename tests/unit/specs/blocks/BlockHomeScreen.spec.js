import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import { BContainer, BButton } from 'bootstrap-vue'
import _cloneDeep from 'lodash.clonedeep'

import BlockHomeScreen from '@/components/blocks/BlockHomeScreen'
import BlockHomeScreenSlider from '@/components/blocks/BlockHomeScreen/BlockHomeScreenSlider'
import BlockHomeScreenSlide from '@/components/blocks/BlockHomeScreen/BlockHomeScreenSlide'

import offersFixture from '@/api/fixtures/offers'

import {
  state as uiState,
  mutations as uiMutations,
  mutationTypes as uiMutationTypes
} from '@/store/ui'

jest.useFakeTimers()

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueAwesomeSwiper)
localVue.component('BContainer', BContainer)
localVue.component('BButton', BButton)

describe('BlockHomeScreen', () => {
  let currentOffers
  let store
  let ui

  function createHomeScreen() {
    const wrapper = mount(BlockHomeScreen, {
      store,
      localVue,
      propsData: {
        offers: currentOffers
      },
      mocks: {
        $i18n: {
          path: (url) => url
        },
        $t: (path) => path
      },
      stubs: ['svg-icon', 'NuxtLink']
    })

    return wrapper
  }

  beforeEach(() => {
    currentOffers = _cloneDeep(offersFixture)

    ui = {
      namespaced: true,
      state: {
        ...uiState()
      },
      mutations: {
        ...uiMutations
      }
    }

    store = new Vuex.Store({
      modules: {
        ui
      }
    })
  })

  test('renders a slider', () => {
    const wrapper = createHomeScreen()
    const slider = wrapper.findComponent(BlockHomeScreenSlider)
    expect(slider.exists()).toBe(true)
  })

  test('renders a slides', () => {
    const wrapper = createHomeScreen()
    const slidesLength = currentOffers.length
    const slides = wrapper.findAllComponents(BlockHomeScreenSlide)
    expect(slides.length).toEqual(slidesLength)
  })

  test('contains state text', () => {
    const wrapper = createHomeScreen()
    const title = wrapper.find('.home-screen__title')
    const subtitle = wrapper.find('.home-screen__subtitle')

    expect(title.text()).toBe(currentOffers[0].title)
    expect(subtitle.text()).toBe(currentOffers[0].subtitle)
  })

  test('commits SET_BACKGROUND_REVEALED_TOGGLE on mounted', () => {
    store.commit(`ui/${uiMutationTypes.SET_PRELOADER_VISIBILITY_TOGGLE}`, false)

    const wrapper = createHomeScreen()

    expect(wrapper.vm.isPreloaderVisible).toBe(false)
    expect(wrapper.vm.isBackgroundRevealed).toBe(true)
  })

  test('commits SET_BACKGROUND_REVEALED_TOGGLE on isPreloaderVisible change', async () => {
    const wrapper = createHomeScreen()

    expect(wrapper.vm.isPreloaderVisible).toBe(true)

    store.commit(`ui/${uiMutationTypes.SET_PRELOADER_VISIBILITY_TOGGLE}`, false)

    await wrapper.vm.$nextTick()
    jest.runAllTimers()

    expect(setTimeout).toHaveBeenCalled()
    expect(wrapper.vm.isPreloaderVisible).toBe(false)
    expect(wrapper.vm.isBackgroundRevealed).toBe(true)

    store.commit(`ui/${uiMutationTypes.SET_PRELOADER_VISIBILITY_TOGGLE}`, true)
    expect(wrapper.vm.isPreloaderVisible).toBe(true)
  })

  test('triggers gsap animation', async () => {
    const wrapper = createHomeScreen()

    expect(wrapper.vm.isBackgroundRevealed).toBe(false)
    store.commit(`ui/${uiMutationTypes.SET_BACKGROUND_REVEALED_TOGGLE}`, true)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isBackgroundRevealed).toBe(true)

    store.commit(`ui/${uiMutationTypes.SET_BACKGROUND_REVEALED_TOGGLE}`, false)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isBackgroundRevealed).toBe(false)
  })
})
