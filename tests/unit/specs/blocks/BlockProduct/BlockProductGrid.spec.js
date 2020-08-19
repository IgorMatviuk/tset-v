import { shallowMount } from '@vue/test-utils'

import BlockProductGrid from '@/components/blocks/BlockProduct/BlockProductGrid'

import createFactory from '@/api/helpers/factory'
import productAttrs from '@/api/factories/product'

import '@/tests/unit/mocks/match-media'

describe('BlockProductGrid', () => {
  let previews

  beforeEach(() => {
    const products = createFactory(productAttrs, 12)
    const regularProduct = products.find((product) => product.in_stock)

    previews = regularProduct.previews
  })

  test('renders grid container', () => {
    const wrapper = shallowMount(BlockProductGrid, {
      propsData: {
        previews
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  test('renders grid container without video', () => {
    const products = createFactory(productAttrs, 12)
    const regularProduct = products.find((product) => product.in_stock)

    const wrapper = shallowMount(BlockProductGrid, {
      propsData: {
        previews: regularProduct.previews.filter(
          (item) => item.preview_type !== 'video'
        )
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
