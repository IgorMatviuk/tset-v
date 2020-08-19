<template>
  <div
    id="cartPopoverSync"
    :class="{ 'functions__shopping-bag--disabled': isDisabled }"
    class="functions__item functions__shopping-bag"
  >
    <svg-icon name="shopping-bag" class="functions__icon" />
    <div class="functions__items-count">{{ itemsQty }}</div>
    <BPopover
      :show.sync="isVisible"
      :disabled.sync="isDisabled"
      target="cartPopoverSync"
      placement="bottom"
    >
      <div class="cart-preview">
        <div class="cart-preview__header">
          <span>{{ $t('pages.cart') }}:</span>
          <span>({{ itemsQty }})</span>
        </div>
        <PerfectScrollbar
          :class="{ 'cart-preview__scroll-container--active': itemsQty > 2 }"
          class="cart-preview__scroll-container"
        >
          <div class="cart-preview__body">
            <CartPreviewItem
              v-for="(item, index) in cart.items"
              :key="getPreviewItemKey(item.id, index)"
              :item="item"
            />
          </div>
        </PerfectScrollbar>
        <div class="cart-preview__footer">
          <span>{{ $t('cart.total') }}:</span>
          <b>{{ cart.formatted_grand_total }}</b>
        </div>
        <BButton
          :to="$i18n.path('checkout')"
          block
          variant="primary"
          class="cart-preview__btn-checkout"
        >
          {{ $t('checkoutPage.checkout') }}
        </BButton>
      </div>
      <LoadingOverlay v-if="isLoading" />
    </BPopover>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import CartPreviewItem from './CartPreviewItem'
import LoadingOverlay from '@/components/shared/LoadingOverlay'

export default {
  components: {
    CartPreviewItem,
    LoadingOverlay
  },
  data() {
    return {
      isVisible: false,
      isDisabled: true
    }
  },
  computed: {
    ...mapState({
      cart: (state) => state.cart.cartData,
      isLoading: (state) => state.cart.isLoading
    }),
    itemsQty() {
      return this.cart && this.cart.items_qty ? Number(this.cart.items_qty) : 0
    }
  },
  watch: {
    itemsQty: {
      handler(value) {
        if (!this.isDisabled && !value) {
          this.isDisabled = true

          /* istanbul ignore else */
          if (this.isVisible) {
            this.isVisible = false
          }
        } else if (this.isDisabled && value) {
          this.isDisabled = false
        }

        this.$forceUpdate()
      },
      immediate: true
    }
  },
  mounted() {
    document.addEventListener('mouseup', this.hideOnOutSideClick)
    this.$bus.$on('add-to-cart', this.onAddItem)
  },
  beforeDestroy() {
    document.removeEventListener('mouseup', this.hideOnOutSideClick)
    this.$bus.$off('add-to-cart', this.onAddItem)
  },
  methods: {
    getPreviewItemKey(id, index) {
      return `${id}_${index}`
    },
    hideOnOutSideClick({ target }) {
      const isClickInside =
        target.classList.contains('cart-preview__remove') ||
        target.classList.contains('cart-preview__icon')

      /* istanbul ignore else */
      if (this.isVisible && !isClickInside) {
        this.isVisible = false
      }
    },
    onAddItem() {
      this.isVisible = true
    }
  }
}
</script>

<style lang="scss">
.cart-preview {
  padding: 25px 35px 35px 35px;

  &__scroll-container {
    width: 288px;
    max-height: 228px;
    overflow: auto;

    &--active {
      padding-right: 15px;
    }
  }

  &__scroll-container--active &__content {
    max-width: 120px;
  }

  &__header {
    margin-bottom: 15px;
    font-size: 16px;
    font-weight: bold;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 10px;
    margin-bottom: 14px;
    color: #3e3e3e;
  }
}
</style>
