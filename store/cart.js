import { mutationTypes as localStorageMutationTypes } from '@/store/localStorage'

export const mutationTypes = {
  SET_LOADING_START: 'SET_LOADING_START',
  SET_LOADING_SUCCESS: 'SET_LOADING_SUCCESS',
  SET_CART_DATA: 'SET_CART_DATA',
  SET_COUNTRIES: 'SET_COUNTRIES',
  SET_REGIONS: 'SET_REGIONS',
  SET_STATES: 'SET_STATES',
  SET_ORDER_SAVE: 'SET_ORDER_SAVE',
  CLEAR_CART: 'CLEAR_CART'
}

export const actionTypes = {
  GET_CHECKOUT_DATA: 'GET_CHECKOUT_DATA',
  GET_CART: 'GET_CART',
  GET_COUNTRIES: 'GET_COUNTRIES',
  GET_REGIONS: 'GET_REGIONS',
  GET_STATES: 'GET_STATES',
  GET_OFFICES: 'GET_OFFICES',
  ADD_ITEM: 'ADD_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM'
}

export const state = () => ({
  cartData: {},
  countries: [],
  regions: [],
  states: [],
  offices: [],
  isOrderSaved: false,
  isLoading: false
})

export const mutations = {
  [mutationTypes.SET_CART_DATA](state, cartData) {
    state.cartData = cartData
  },
  [mutationTypes.SET_LOADING_START](state) {
    state.isLoading = true
  },
  [mutationTypes.SET_LOADING_SUCCESS](state, { key, value }) {
    if (state.isLoading) {
      state.isLoading = false
    }

    state[key] = value
  },
  [mutationTypes.SET_COUNTRIES](state, countries) {
    state.countries = countries
  },
  [mutationTypes.SET_REGIONS](state, regions) {
    state.regions = regions
  },
  [mutationTypes.SET_STATES](state, states) {
    state.states = states
  },
  [mutationTypes.SET_OFFICES](state, offices) {
    state.offices = offices
  },
  [mutationTypes.SET_ORDER_SAVE](state) {
    state.isOrderSaved = true
    state.cartData = {}
  },
  [mutationTypes.CLEAR_CART](state) {
    state.cartData = {}
    state.isOrderSaved = false
  }
}

export const actions = {
  async [actionTypes.GET_CHECKOUT_DATA]({ commit }) {
    const STAGE_API_URL = 'https://back.virna.com.ua'
    const { data: checkoutData } = await this.$axios.$get(
      `${STAGE_API_URL}/api/checkout`
    )

    commit(mutationTypes.SET_COUNTRIES, checkoutData.countries)
    commit(mutationTypes.SET_REGIONS, checkoutData.regions)
  },
  async [actionTypes.GET_CART]({ commit }, cartId) {
    // const { data: cartData } = await this.$axios.$get('/api/checkout/cart')

    // FIXME: temporary solution
    const STAGE_API_URL = 'https://back.virna.com.ua'
    // const STAGE_API_URL = 'http://localhost:7000'
    // const { data: cartData } = await this.$axios.$get(
    //   `${STAGE_API_URL}/api/checkout/cart`
    // )

    const { data: cartData } = await this.$axios.$get(
      `${STAGE_API_URL}/api/checkout/cart/${cartId}`
    )

    if (cartData) {
      commit(mutationTypes.SET_CART_DATA, cartData)
    }
  },
  async [actionTypes.GET_REGIONS]({ commit }, regionId) {
    commit(mutationTypes.SET_LOADING_START)

    // FIXME: temporary solution
    const STAGE_API_URL = 'https://back.virna.com.ua'
    const { data: regions } = await this.$axios.$get(
      `${STAGE_API_URL}/api/shipping/regions`
    )

    commit(mutationTypes.SET_LOADING_SUCCESS, {
      key: 'regions',
      value: regions
    })
  },
  async [actionTypes.GET_STATES]({ commit }, regionId) {
    commit(mutationTypes.SET_LOADING_START)

    // FIXME: temporary solution
    const STAGE_API_URL = 'https://back.virna.com.ua'
    const { data: states } = await this.$axios.$get(
      `${STAGE_API_URL}/api/shipping/states?region_id=${regionId}`
    )

    commit(mutationTypes.SET_LOADING_SUCCESS, {
      key: 'states',
      value: states
    })
  },
  async [actionTypes.GET_OFFICES]({ commit }, stateId) {
    commit(mutationTypes.SET_LOADING_START)

    // FIXME: temporary solution
    const STAGE_API_URL = 'https://back.virna.com.ua'
    const { data: offices } = await this.$axios.$get(
      `${STAGE_API_URL}/api/shipping/offices?state_id=${stateId}`
    )

    commit(mutationTypes.SET_LOADING_SUCCESS, {
      key: 'offices',
      value: offices
    })
  },
  async [actionTypes.ADD_ITEM]({ commit }, { cartId, itemId }) {
    commit(mutationTypes.SET_LOADING_START)

    // FIXME: temporary solution
    // const { data: cartData } = await this.$axios.$post(
    //   `/api/checkout/cart/add/${id}`
    // )

    const STAGE_API_URL = 'https://back.virna.com.ua'
    // const STAGE_API_URL = 'http://localhost:7000'
    const { data: cartData } = await this.$axios.$post(
      `${STAGE_API_URL}/api/checkout/cart/add`,
      {
        cart: cartId,
        variant: itemId
      }
    )

    if (!state.cartData) {
      commit(
        `localStorage/${localStorageMutationTypes.SET_CART_ID}`,
        cartData.id,
        { root: true }
      )
    }

    commit(mutationTypes.SET_LOADING_SUCCESS, {
      key: 'cartData',
      value: cartData
    })
  },
  async [actionTypes.UPDATE_ITEM]({ commit }, { cartId, itemId, body }) {
    commit(mutationTypes.SET_LOADING_START)

    // FIXME: temporary solution
    const STAGE_API_URL = 'https://back.virna.com.ua'
    const { data: cartData } = await this.$axios.$put(
      `${STAGE_API_URL}/api/checkout/cart/${cartId}/update/${itemId}`,
      body
    )

    // const { data: cartData } = await this.$axios.$put(
    //   `/api/checkout/cart/update/${id}`,
    //   body
    // )

    commit(mutationTypes.SET_LOADING_SUCCESS, {
      key: 'cartData',
      value: cartData
    })
  },
  async [actionTypes.REMOVE_ITEM]({ commit }, { cartId, itemId }) {
    commit(mutationTypes.SET_LOADING_START)

    // FIXME: temporary solution
    const STAGE_API_URL = 'https://back.virna.com.ua'
    const { data: cartData } = await this.$axios.$delete(
      `${STAGE_API_URL}/api/checkout/cart/${cartId}/remove-item/${itemId}`
    )

    if (!cartData) {
      commit(`localStorage/${localStorageMutationTypes.SET_CART_ID}`, null, {
        root: true
      })
    }

    commit(mutationTypes.SET_LOADING_SUCCESS, {
      key: 'cartData',
      value: cartData || {}
    })
  }
}
