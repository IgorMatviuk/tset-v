import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import _cloneDeep from 'lodash.clonedeep'
import { BButton } from 'bootstrap-vue'

import ProductPreview from '@/components/shared/ProductPreview'

import createFactory from '@/api/helpers/factory'
import productAttrs from '@/api/factories/product'

jest.mock('gsap', () => {
  const mockGsap = {
    timeline: jest.fn().mockImplementation(({ onComplete }) => {
      onComplete()
      return mockGsap
    }),
    to: jest.fn().mockImplementation(() => {
      return mockGsap
    }),
    reversed: jest.fn().mockImplementation((status) => {
      if (typeof status === 'undefined') {
        return true
      }
    })
  }

  return mockGsap
})

const localVue = createLocalVue()
localVue.component('BButton', BButton)

describe('ProductPreview', () => {
  let products
  let productWithoutDiscount
  let productWithDiscount
  let productNew
  let productOutOfStock

  let mockEventBus
  let mockTranslate
  let mock$i18n
  let mockStore
  let mockRoute

  beforeEach(() => {
    products = _cloneDeep(createFactory(productAttrs, 6))

    productWithoutDiscount = products.find(
      (product) => product.discount_price === null && product.in_stock
    )
    productWithDiscount = products.find(
      (product) => product.discount_price !== null && product.in_stock
    )
    productNew = products.find((product) => product.is_new)

    productOutOfStock = products.find((product) => !product.in_stock)

    mockEventBus = {
      $emit: jest.fn()
    }

    mockTranslate = (str) => str

    mock$i18n = {
      path: (str) => str
    }

    mockRoute = {
      name: null
    }

    mockStore = {
      state: {
        pageType: null,
        cart: {
          cartData: {}
        },
        localStorage: {
          cartId: null
        }
      },
      dispatch: jest.fn(),
      commit: jest.fn()
    }
  })

  test('renders a regular product preview', () => {
    const wrapper = shallowMount(ProductPreview, {
      propsData: {
        item: productWithoutDiscount
      },
      mocks: {
        $t: mockTranslate,
        $i18n: mock$i18n,
        $store: mockStore,
        $route: mockRoute
      },
      stubs: ['BButton', 'svg-icon', 'NuxtLink']
    })

    expect(wrapper.find('.product-preview').element).toBeVisible()

    const name = wrapper.find('.product-preview__name')
    expect(name.text()).toBe(wrapper.vm.item.name)

    const renderedPrice = wrapper.find('.product-preview__price')
    const variantPrice = wrapper.vm.item.variants[0].formatted_price
    expect(renderedPrice.text()).toBe(variantPrice)
  })

  test('renders a product preview with discount', () => {
    const wrapper = shallowMount(ProductPreview, {
      propsData: {
        item: productWithDiscount
      },
      mocks: {
        $t: mockTranslate,
        $i18n: mock$i18n,
        $store: mockStore,
        $route: mockRoute
      },
      stubs: ['BButton', 'svg-icon', 'NuxtLink']
    })

    expect(wrapper.find('.product-preview').element).toBeVisible()

    const discountPrice = wrapper.find('.product-preview__price--discount')
    expect(discountPrice.text()).toBe(wrapper.vm.item.formatted_discount_price)

    const renderedInitialPrice = wrapper.find(
      '.product-preview__price--initial'
    )
    const variantInitialPrice = wrapper.vm.item.variants[0].formatted_price
    expect(renderedInitialPrice.text()).toBe(variantInitialPrice)

    const badgeSale = wrapper.find('.product-preview__badge--sale')
    expect(badgeSale).not.toBeNull()
    expect(badgeSale.text()).toBe('Sale')
  })

  test('renders a product preview with status "new"', () => {
    const wrapper = shallowMount(ProductPreview, {
      propsData: {
        item: productNew
      },
      mocks: {
        $t: mockTranslate,
        $i18n: mock$i18n,
        $store: mockStore,
        $route: mockRoute
      },
      stubs: ['BButton', 'svg-icon', 'NuxtLink']
    })

    expect(wrapper.find('.product-preview').element).toBeVisible

    const badgeNew = wrapper.find('.product-preview__badge--new')
    expect(badgeNew).not.toBeNull()
    expect(badgeNew.text()).toBe('New')
  })

  test('emits "add-to-cart" event on size selection', async () => {
    const wrapper = mount(ProductPreview, {
      localVue,
      propsData: {
        item: productNew
      },
      mocks: {
        $t: mockTranslate,
        $bus: mockEventBus,
        $i18n: mock$i18n,
        $store: mockStore,
        $route: mockRoute
      },
      stubs: ['svg-icon', 'NuxtLink']
    })

    const btnBuy = wrapper.find('.product-preview__btn-buy')
    expect(wrapper.vm.isAddToCartEmitted).toBe(false)

    btnBuy.trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selectedSize).toBeNull()
    expect(wrapper.vm.isAddToCartEmitted).toBe(true)

    const btnSize = wrapper.find('.product-preview__btn-size')
    btnSize.trigger('click')

    expect(wrapper.vm.selectedSize).not.toBeNull()

    await wrapper.vm.$nextTick()

    expect(mockEventBus.$emit).toBeCalled()
  })

  test.skip('emits "stock-suscribe" event on button click', () => {
    const wrapper = mount(ProductPreview, {
      localVue,
      propsData: {
        item: productOutOfStock
      },
      mocks: {
        $t: mockTranslate,
        $bus: mockEventBus,
        $i18n: mock$i18n,
        $store: mockStore,
        $route: mockRoute
      },
      stubs: ['svg-icon', 'NuxtLink']
    })

    const btnBuy = wrapper.find('.product-preview__btn-buy')
    expect(btnBuy.text()).toBe('сообщить о появлении')
    expect(wrapper.vm.isAddToCartEmitted).toBe(false)

    btnBuy.trigger('click')
    expect(mockEventBus.$emit).toBeCalled()
  })

  test.skip('toggles product in wishlist', async () => {
    const wrapper = mount(ProductPreview, {
      localVue,
      propsData: {
        item: productOutOfStock
      },
      mocks: {
        $t: mockTranslate,
        $bus: mockEventBus,
        $i18n: mock$i18n,
        $store: mockStore,
        $route: mockRoute
      },
      stubs: ['svg-icon', 'NuxtLink']
    })

    expect(wrapper.vm.heartAnimationTimeline).toBeFalsy()

    const btnWhishlist = wrapper.find('.product-preview__btn-wishlist')
    btnWhishlist.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.heartAnimationTimeline).toBeTruthy()

    btnWhishlist.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.heartAnimationTimeline.reversed).toHaveBeenCalledTimes(2)
  })

  test('renders relevant variant on color change', async () => {
    const wrapper = mount(ProductPreview, {
      localVue,
      propsData: {
        item: productNew
      },
      mocks: {
        $t: mockTranslate,
        $bus: mockEventBus,
        $i18n: mock$i18n,
        $store: mockStore,
        $route: mockRoute
      },
      stubs: ['svg-icon', 'NuxtLink']
    })

    const prevSelectedVariant = wrapper.vm.selectedVariant

    const nameElem = wrapper.find('.product-preview__name')
    const defaultVariantName = prevSelectedVariant.name
    expect(nameElem.text()).toEqual(defaultVariantName)

    wrapper
      .find('.product-preview__color:not(.product-preview__color--active)')
      .trigger('click')

    await wrapper.vm.$nextTick()

    const nextSelectedVariant = wrapper.vm.selectedVariant
    const updatedVariantName = nextSelectedVariant.name
    expect(nameElem.text()).toEqual(updatedVariantName)
  })
})
