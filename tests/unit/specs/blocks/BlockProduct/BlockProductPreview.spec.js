import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import BlockProductPreview from '@/components/blocks/BlockProduct/BlockProductPreview'
import BlockProductPreviewVideo from '@/components/blocks/BlockProduct/BlockProductPreviewVideo'

import { mutations as productMutations } from '@/store/product'

import createFactory from '@/api/helpers/factory'
import productAttrs from '@/api/factories/product'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('BlockProductPreview', () => {
  let imagePreview
  let videoPreview
  let store

  function createMatchMediaMock(matches) {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches,
        media: query,
        addListener: jest.fn().mockImplementation((callback) => callback()),
        removeListener: jest.fn().mockImplementation((callback) => callback()),
        addEventListener: jest.fn().mockImplementation((callback) => callback())
      }))
    })
  }

  beforeEach(() => {
    const products = createFactory(productAttrs, 12)
    const regularProduct = products.find((product) => product.in_stock)

    imagePreview = regularProduct.previews.find(
      (preview) => preview.preview_type === 'image'
    )
    videoPreview = regularProduct.previews.find(
      (preview) => preview.preview_type === 'video'
    )

    store = new Vuex.Store({
      modules: {
        product: {
          namespaced: true,
          state: {
            activeVariant: {},
            imageViewerVisibility: false,
            activePreview: {}
          },
          mutations: { ...productMutations }
        }
      }
    })
  })

  test('renders component itself', () => {
    createMatchMediaMock(true)

    const wrapper = shallowMount(BlockProductPreview, {
      propsData: {
        item: {}
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  test('renders image preview', () => {
    createMatchMediaMock(true)

    const wrapper = shallowMount(BlockProductPreview, {
      propsData: {
        item: imagePreview
      }
    })

    expect(wrapper.vm.pinchZoom).not.toBeNull()

    wrapper.destroy()

    expect(wrapper.vm.pinchZoom).toBeNull()
  })

  test('renders video preview', () => {
    createMatchMediaMock(true)

    const wrapper = shallowMount(BlockProductPreview, {
      propsData: {
        item: videoPreview
      }
    })

    expect(wrapper.findComponent(BlockProductPreviewVideo).exists()).toBe(true)
    expect(wrapper.vm.pinchZoom).toBeNull()

    wrapper.destroy()

    expect(wrapper.vm.pinchZoom).toBeNull()
  })

  test('initialize hover zoom', () => {
    createMatchMediaMock(true)

    const wrapper = shallowMount(BlockProductPreview, {
      localVue,
      store,
      propsData: {
        item: imagePreview
      }
    })

    const mouseoverEvent = new MouseEvent('mouseover')
    wrapper.element.dispatchEvent(mouseoverEvent)

    expect(wrapper.vm.hoverZoomIsActive).toBe(true)
  })

  test('update hover zoom on resize window', () => {
    createMatchMediaMock(true)

    const wrapper = shallowMount(BlockProductPreview, {
      localVue,
      store,
      propsData: {
        item: imagePreview
      }
    })

    const resizeEvent = new Event('resize')
    window.dispatchEvent(resizeEvent)

    expect(wrapper.vm.hoverZoomIsActive).toBe(false)
  })

  test('show image preview', () => {
    createMatchMediaMock(true)

    const wrapper = shallowMount(BlockProductPreview, {
      localVue,
      store,
      propsData: {
        item: imagePreview
      }
    })

    wrapper.trigger('click')

    expect(store.state.product.activePreview).toEqual(imagePreview)
    expect(store.state.product.imageViewerVisibility).toBe(true)
  })
})
