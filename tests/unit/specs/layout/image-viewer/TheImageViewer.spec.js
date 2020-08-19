import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Vuex from 'vuex'

import _cloneDeep from 'lodash.clonedeep'

import TheImageViewer from '@/components/layout/image-viewer/TheImageViewer'

import {
  mutations as productMutations,
  getters as productGetters
} from '@/store/product'

import createFactory from '@/api/helpers/factory'
import productAttrs from '@/api/factories/product'

const localVue = createLocalVue()
localVue.use(VueAwesomeSwiper)
localVue.use(Vuex)

describe('TheImageViewer', () => {
  let store
  let activeVariant
  let activePreview

  function createTheImageViewer(props) {
    const wrapper = shallowMount(TheImageViewer, {
      localVue,
      store,
      propsData: {
        ...props
      },
      stubs: ['svg-icon']
    })

    return wrapper
  }

  beforeEach(() => {
    const products = createFactory(productAttrs, 12)

    activeVariant = products[0].variants[0]
    activePreview = activeVariant.previews[0]

    store = new Vuex.Store({
      modules: {
        product: {
          namespaced: true,
          state: {
            activeVariant: _cloneDeep(activeVariant),
            imageViewerVisibility: true,
            activePreview: _cloneDeep(activePreview)
          },
          mutations: { ...productMutations },
          getters: { ...productGetters }
        }
      }
    })
  })

  test('create image gallery', () => {
    const wrapper = createTheImageViewer({ activeIndex: 1 })

    expect(wrapper.element).toMatchSnapshot()
  })

  test('close image gallery', () => {
    const wrapper = createTheImageViewer({ activeIndex: 1 })

    const closeButton = wrapper.find('.image-viewer__close')
    closeButton.trigger('click')
    expect(wrapper.vm.$store.state.product.imageViewerVisibility).toBe(false)
  })

  test('close image gallery by clicking on esc', () => {
    const wrapper = createTheImageViewer({ activeIndex: 1 })

    const escapeEvent = new KeyboardEvent('keydown', { code: 'Escape' })
    window.dispatchEvent(escapeEvent)
    expect(wrapper.vm.$store.state.product.imageViewerVisibility).toBe(false)
  })

  test('destroy image gallery', () => {
    const wrapper = createTheImageViewer({ activeIndex: 1 })

    wrapper.destroy()
  })
})
