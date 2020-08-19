import { actionTypes as cartActionTypes } from '@/store/cart'

export default {
  methods: {
    removeItem() {
      const { cartId } = this.$store.state.localStorage
      const { id: itemId } = this.item

      this.$store.dispatch(`cart/${cartActionTypes.REMOVE_ITEM}`, {
        cartId,
        itemId
      })
    }
  }
}
