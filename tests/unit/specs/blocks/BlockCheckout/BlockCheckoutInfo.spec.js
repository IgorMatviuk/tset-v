import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { BButton, BFormGroup } from 'bootstrap-vue'
import _cloneDeep from 'lodash.clonedeep'

import BlockCheckoutInfo from '@/components/blocks/BlockCheckoutInfo'
import BlockCheckoutInfoContacts from '@/components/blocks/BlockCheckoutInfo/BlockCheckoutInfoContacts'
import BlockCheckoutInfoDelivery from '@/components/blocks/BlockCheckoutInfo/BlockCheckoutInfoDelivery'
import BlockCheckoutInfoPayment from '@/components/blocks/BlockCheckoutInfo/BlockCheckoutInfoPayment'

import { state as cartState, mutations as cartMutations } from '@/store/cart'
import { mutationTypes as modalMutationTypes } from '@/store/modal'
import { mutationTypes as localStorageMutationTypes } from '@/store/localStorage'

import { DELIVERY_METHODS, PAYMENT_METHODS } from '@/utils/constants'

import regionsFixture from '@/api/fixtures/regions'
import statesFixture from '@/api/fixtures/states'
import officesFixture from '@/api/fixtures/offices'

import '@/tests/unit/mocks/html-form-element'

const localVue = createLocalVue()
localVue.component('BButton', BButton)
localVue.component('BFormGroup', BFormGroup)
localVue.use(Vuex)

describe('BlockCheckoutInfo', () => {
  let store
  let mockAxios
  let mockAxiosFallback
  let mockPostRequest
  let mockRouterPush
  let mockI18nPath
  let mockSetCartId
  let mockSetModalMeta
  let mockSetModalVisibilityToggle

  function createCheckoutInfo() {
    const wrapper = mount(BlockCheckoutInfo, {
      localVue,
      store,
      propsData: {
        isVisible: true,
        checkoutStep: 1,
        checkoutSteps: {
          orderSummary: 1,
          contactInfo: 2,
          deliveryInfo: 3,
          paymentInfo: 4
        }
      },
      mocks: {
        $t: (str) => str,
        $axios: mockAxios || mockAxiosFallback,
        $router: {
          push: mockRouterPush
        },
        $i18n: {
          path: mockI18nPath
        },
        $v: {
          $invalid: false,
          $touch: () => {},
          $reset: () => {},
          formData: {}
        }
      },
      stubs: [
        'svg-icon',
        'client-only',
        'NuxtLink',
        'BlockCheckoutInfoContacts',
        'BlockCheckoutInfoDelivery',
        'BlockCheckoutInfoPayment'
      ]
    })

    return wrapper
  }

  function setDeliveryMethod(wrapper, method = DELIVERY_METHODS.NOVAPOSHTA) {
    wrapper.setData({
      formData: { deliveryInfo: { deliveryMethod: method } }
    })
  }

  function setDeliveryCountry(wrapper, country = 'Country_Mock') {
    wrapper.setData({
      formData: { deliveryInfo: { deliveryCountry: country } }
    })
  }

  function setDeliveryAddress(wrapper, address = 'Address_Mock') {
    wrapper.setData({
      formData: { deliveryInfo: { deliveryAddress: address } }
    })
  }

  function setDeliveryRegion(wrapper, region = 'Region_Mock') {
    wrapper.setData({
      formData: { deliveryInfo: { deliveryRegion: region } }
    })
  }

  function setDeliveryState(wrapper, state = 'State_Mock') {
    wrapper.setData({
      formData: { deliveryInfo: { deliveryState: state } }
    })
  }

  function setDeliveryOffice(wrapper, office = 'Office_Mock') {
    setDeliveryRegion(wrapper)
    setDeliveryState(wrapper)

    wrapper.setData({
      formData: {
        deliveryInfo: {
          deliveryOffice: office
        }
      }
    })
  }

  function setPaymentMethod(wrapper, method) {
    wrapper.setData({
      formData: {
        paymentInfo: {
          paymentMethod: method
        }
      }
    })
  }

  beforeAll(() => {
    mockSetCartId = jest.fn()
    mockSetModalMeta = jest.fn()
    mockSetModalVisibilityToggle = jest.fn()

    store = new Vuex.Store({
      modules: {
        localStorage: {
          namespaced: true,
          state: {
            cartId: null
          },
          mutations: {
            [localStorageMutationTypes.SET_CART_ID]: mockSetCartId
          }
        },
        cart: {
          namespaced: true,
          state: {
            ...cartState(),
            regions: _cloneDeep(regionsFixture),
            states: _cloneDeep(statesFixture),
            offices: _cloneDeep(officesFixture)
          },
          mutations: { ...cartMutations }
        },
        modal: {
          namespaced: true,
          mutations: {
            [modalMutationTypes.SET_MODAL_META]: mockSetModalMeta,
            [modalMutationTypes.SET_MODAL_VISIBILITY_TOGGLE]: mockSetModalVisibilityToggle
          }
        }
      }
    })

    mockAxiosFallback = {
      $post: mockPostRequest
    }

    mockPostRequest = jest.fn()

    mockRouterPush = jest.fn()

    mockI18nPath = jest.fn(() => '/')
  })

  describe('Structure', () => {
    test('has expected structure', () => {
      const wrapper = createCheckoutInfo()

      const contacts = wrapper.findComponent(BlockCheckoutInfoContacts)
      expect(contacts.exists()).toBe(true)
      const delivery = wrapper.findComponent(BlockCheckoutInfoDelivery)
      expect(delivery.exists()).toBe(true)
      const payment = wrapper.findComponent(BlockCheckoutInfoPayment)
      expect(payment.exists()).toBe(true)
    })
  })

  describe('Delivery info', () => {
    test('country change', () => {
      const wrapper = createCheckoutInfo()
      const { deliveryInfo } = wrapper.vm.formData

      setDeliveryCountry(wrapper)

      expect(deliveryInfo.deliveryCountry).toBe('Country_Mock')

      wrapper.vm.onCountryChange()

      expect(deliveryInfo.deliveryCity).toBeNull()
    })

    test('region change', () => {
      const wrapper = createCheckoutInfo()
      const { deliveryInfo } = wrapper.vm.formData

      setDeliveryState(wrapper)
      setDeliveryOffice(wrapper)

      expect(deliveryInfo.deliveryState).toBe('State_Mock')
      expect(deliveryInfo.deliveryOffice).toBe('Office_Mock')

      wrapper.vm.onRegionChange()

      expect(deliveryInfo.deliveryState).toBeNull()
      expect(deliveryInfo.deliveryOffice).toBeNull()
    })

    test('state change', () => {
      const wrapper = createCheckoutInfo()
      const { deliveryInfo } = wrapper.vm.formData

      setDeliveryOffice(wrapper)

      expect(deliveryInfo.deliveryOffice).toBe('Office_Mock')

      wrapper.vm.onStateChange()

      expect(deliveryInfo.deliveryOffice).toBeNull()
    })

    test('abroad delivery only', () => {
      const wrapper = createCheckoutInfo()
      const { deliveryInfo } = wrapper.vm.formData

      setDeliveryMethod(wrapper, DELIVERY_METHODS.NOVAPOSHTA)

      expect(deliveryInfo.deliveryMethod).toBe(DELIVERY_METHODS.NOVAPOSHTA)

      wrapper.vm.setAbroadDeliveryOnly()

      expect(deliveryInfo.deliveryMethod).toBe(DELIVERY_METHODS.ABROAD)
    })
  })

  describe('Validation rules', () => {
    test('using "novaposhta" delivery method', () => {
      // NOTE: "novaposhta" is a default value
      const wrapper = createCheckoutInfo()
      const validations = wrapper.vm.$options.validations.bind(wrapper.vm)

      expect(validations()).toMatchSnapshot()
    })

    test('using "local" delivery method', () => {
      const wrapper = createCheckoutInfo()
      const validations = wrapper.vm.$options.validations.bind(wrapper.vm)

      setDeliveryMethod(wrapper, DELIVERY_METHODS.LOCAL)
      expect(validations()).toMatchSnapshot()
    })

    test('using "abroad" delivery method', () => {
      const wrapper = createCheckoutInfo()
      const validations = wrapper.vm.$options.validations.bind(wrapper.vm)

      setDeliveryMethod(wrapper, DELIVERY_METHODS.ABROAD)
      expect(validations()).toMatchSnapshot()
    })
  })

  describe('Form Submition', () => {
    beforeEach(() => {
      mockAxios = {
        $post: jest.fn().mockResolvedValue({ data: { order_id: 1 } })
      }
    })

    async function placeOrder(wrapper, { deliveryMethod, paymentMethod }) {
      fillFormData(wrapper, deliveryMethod)
      await wrapper.vm.$nextTick()

      switch (deliveryMethod) {
        case DELIVERY_METHODS.NOVAPOSHTA:
          setDeliveryOffice(wrapper)
          break
        case DELIVERY_METHODS.LOCAL:
          setDeliveryRegion(wrapper)
          setDeliveryState(wrapper)
          setDeliveryAddress(wrapper)
          break
        case DELIVERY_METHODS.ABROAD:
          setDeliveryCountry(wrapper)
          break
        default:
          throw new Error('Invalid delivery method.')
      }

      setPaymentMethod(wrapper, paymentMethod)
      await wrapper.vm.$nextTick()

      wrapper.find('form').trigger('submit')
    }

    function fillFormData(wrapper, deliveryMethod) {
      // TODO: click on "new user" radio button
      // wrapper.find("[value='new-user']").trigger('click')

      wrapper.setData({
        formData: {
          contactInfo: {
            firstName: 'John',
            lastName: 'Doe',
            phone: '+380 66 123 4567',
            email: 'user@example.com'
          },
          deliveryInfo: {
            deliveryMethod
          }
        }
      })
    }

    describe('Using "novaposhta" delivery method', () => {
      test('using "COD" payment method', async () => {
        const wrapper = createCheckoutInfo()
        await placeOrder(wrapper, {
          deliveryMethod: DELIVERY_METHODS.NOVAPOSHTA,
          paymentMethod: PAYMENT_METHODS.COD
        })
      })

      test('using "Privat24" payment method', async () => {
        const wrapper = createCheckoutInfo()
        await placeOrder(wrapper, {
          deliveryMethod: DELIVERY_METHODS.NOVAPOSHTA,
          paymentMethod: PAYMENT_METHODS.PRIVAT
        })
      })

      test('using "LiqPay" payment method', async () => {
        const wrapper = createCheckoutInfo()
        await placeOrder(wrapper, {
          deliveryMethod: DELIVERY_METHODS.NOVAPOSHTA,
          paymentMethod: PAYMENT_METHODS.LIQPAY
        })
      })
    })

    describe('Using "local" delivery method', () => {
      test('using "COD" payment method', async () => {
        const wrapper = createCheckoutInfo()
        await placeOrder(wrapper, {
          deliveryMethod: DELIVERY_METHODS.LOCAL,
          paymentMethod: PAYMENT_METHODS.COD
        })
      })

      test('using "Privat24" payment method', async () => {
        const wrapper = createCheckoutInfo()
        await placeOrder(wrapper, {
          deliveryMethod: DELIVERY_METHODS.LOCAL,
          paymentMethod: PAYMENT_METHODS.PRIVAT
        })
      })

      test('using "LiqPay" payment method', async () => {
        const wrapper = createCheckoutInfo()
        await placeOrder(wrapper, {
          deliveryMethod: DELIVERY_METHODS.LOCAL,
          paymentMethod: PAYMENT_METHODS.LIQPAY
        })
      })
    })

    describe('Using "abroad" delivery method', () => {
      test('using "LiqPay" payment method', async () => {
        const wrapper = createCheckoutInfo()
        await placeOrder(wrapper, {
          deliveryMethod: DELIVERY_METHODS.ABROAD,
          paymentMethod: PAYMENT_METHODS.LIQPAY
        })
      })
    })
  })

  describe('Mobile navigation', () => {
    test('emit "next-step" event', () => {
      const wrapper = createCheckoutInfo()

      wrapper.vm.goToNextStep()

      expect(wrapper.emitted()['next-step'].length).toBe(1)
    })
  })
})
