import { mount, createLocalVue } from '@vue/test-utils'
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import {
  BFormGroup,
  BFormRadioGroup,
  BFormRadio,
  BFormInput
} from 'bootstrap-vue'
import _cloneDeep from 'lodash.clonedeep'

import BlockCheckoutInfoDelivery from '@/components/blocks/BlockCheckoutInfo/BlockCheckoutInfoDelivery'

import countriesFixture from '@/api/fixtures/countries'
import regionsFixture from '@/api/fixtures/regions'
import statesFixture from '@/api/fixtures/states'
import officesFixture from '@/api/fixtures/offices'

import { DELIVERY_METHODS } from '@/utils/constants'

import { actionTypes as cartActionTypes } from '@/store/cart'

const localVue = createLocalVue()
localVue.component('PerfectScrollbar', PerfectScrollbar)
localVue.component('BFormGroup', BFormGroup)
localVue.component('BFormRadioGroup', BFormRadioGroup)
localVue.component('BFormRadio', BFormRadio)
localVue.component('BFormInput', BFormInput)

describe('BlockCheckoutInfoDelivery', () => {
  let mockDispatch

  function createCheckoutInfoDelivery(config) {
    const deliveryInfo = {
      deliveryMethod: {
        $model: config.deliveryMethod
      },
      deliveryCountry: {
        $model: ''
      },
      deliveryCity: {
        $model: ''
      },
      deliveryRegion: {
        $model: ''
      },
      deliveryState: {
        $model: ''
      },
      deliveryAddress: {
        $model: ''
      },
      deliveryOffice: {
        $model: ''
      }
    }

    const wrapper = mount(BlockCheckoutInfoDelivery, {
      localVue,
      propsData: {
        value: { deliveryInfo }
      },
      mocks: {
        $t: (str) => str,
        $store: {
          state: {
            cart: {
              countries: _cloneDeep(countriesFixture),
              regions: _cloneDeep(regionsFixture),
              states: _cloneDeep(statesFixture),
              offices: _cloneDeep(officesFixture)
            }
          },
          dispatch: mockDispatch
        }
      },
      stubs: ['svg-icon', 'client-only']
    })

    return wrapper
  }

  beforeEach(() => {
    mockDispatch = jest.fn()
  })

  describe('Using "novaposhta" delivery method', () => {
    test('has expected structure', () => {
      const wrapper = createCheckoutInfoDelivery({
        deliveryMethod: DELIVERY_METHODS.NOVAPOSHTA
      })
      expect(wrapper.element).toMatchSnapshot()
    })

    test('dispatch "cart/GET_STATES" action', () => {
      const wrapper = createCheckoutInfoDelivery({
        deliveryMethod: DELIVERY_METHODS.NOVAPOSHTA
      })

      const region = wrapper.vm.regionOptions[0]
      wrapper.vm.onRegionSelected(region)

      expect(wrapper.emitted()['region-change'].length).toBe(1)

      expect(mockDispatch).toBeCalledWith(
        `cart/${cartActionTypes.GET_STATES}`,
        region.id
      )
    })

    test('dispatch "cart/GET_OFFICES" action', () => {
      const wrapper = createCheckoutInfoDelivery({
        deliveryMethod: DELIVERY_METHODS.NOVAPOSHTA
      })

      const state = wrapper.vm.stateOptions[0]
      wrapper.vm.onStateSelected(state)

      expect(wrapper.emitted()['state-change'].length).toBe(1)

      expect(mockDispatch).toBeCalledWith(
        `cart/${cartActionTypes.GET_OFFICES}`,
        state.id
      )
    })
  })

  describe('Using "local" delivery method', () => {
    test('has expected structure', () => {
      const wrapper = createCheckoutInfoDelivery({
        deliveryMethod: DELIVERY_METHODS.LOCAL
      })
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe('Using "abroad" delivery method', () => {
    test('has expected structure', () => {
      const wrapper = createCheckoutInfoDelivery({
        deliveryMethod: DELIVERY_METHODS.ABROAD
      })
      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
