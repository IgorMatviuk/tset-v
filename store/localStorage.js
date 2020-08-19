export const mutationTypes = {
  SET_CART_ID: 'SET_CART_ID'
}

export const state = () => ({
  cartId: null,
  status: false
})

export const mutations = {
  [mutationTypes.SET_CART_ID](state, cartId) {
    state.cartId = cartId
  }
}
