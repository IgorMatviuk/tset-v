import { actionTypes as cartActionTypes } from '@/store/cart'

export default {
  methods: {
    addToCart(itemId) {
      this.$bus.$emit('add-to-cart')

      const cartId = this.$store.state.localStorage.cartId || null

      this.$store.dispatch(`cart/${cartActionTypes.ADD_ITEM}`, {
        cartId,
        itemId
      })
    }
  }
}
