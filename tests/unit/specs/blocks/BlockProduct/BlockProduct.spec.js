import { shallowMount } from '@vue/test-utils'

import BlockProduct from '@/components/blocks/BlockProduct'
import BlockProductGrid from '@/components/blocks/BlockProduct/BlockProductGrid'
import BlockProductSlider from '@/components/blocks/BlockProduct/BlockProductSlider'

import createFactory from '@/api/helpers/factory'
import productAttrs from '@/api/factories/product'

describe('BlockProduct', () => {
  let regularProduct

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

  function createBlockProduct(mockup) {
    const wrapper = shallowMount(BlockProduct, {
      propsData: {
        product: regularProduct,
        links: {
          prev: 'prev-product-slug',
          next: 'next-product-slug'
        }
      },
      mocks: {
        $route: {
          params: {
            pathMatch: regularProduct.variants[0].url_key
          }
        },
        ...mockup
      }
    })

    return wrapper
  }

  beforeEach(() => {
    const products = createFactory(productAttrs, 12)
    regularProduct = products.find((product) => product.in_stock)
  })

  test('renders component without slider', () => {
    createMatchMediaMock(true)

    const wrapper = createBlockProduct({ $device: { isMobile: false } })

    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.findComponent(BlockProductGrid).element).toBeVisible()
  })

  test('renders component without slider', () => {
    createMatchMediaMock(false)

    const wrapper = createBlockProduct({ $device: { isMobile: true } })

    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.findComponent(BlockProductSlider).element).toBeVisible()
  })

  test('destroy product block', () => {
    createMatchMediaMock(false)

    const wrapper = createBlockProduct({ $device: { isMobile: true } })

    wrapper.destroy()
  })
})
