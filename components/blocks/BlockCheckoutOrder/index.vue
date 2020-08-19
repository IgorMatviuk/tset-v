<template>
  <div class="checkout-order">
    <div class="checkout-order__header">
      <div class="checkout-order__title">
        {{ $t('checkoutPage.yourOrder') }}
      </div>
      <NuxtLink :to="backToShoppingLink" class="checkout-order__proceed">
        {{ $t('checkoutPage.backToShopping') }}
      </NuxtLink>
    </div>
    <div class="checkout-order__content">
      <BlockCheckoutOrderItem
        v-for="(item, index) in orderSummary.items"
        :key="item.variant_id"
        :page="'checkout'"
        :item="item"
        :index="index"
        class="checkout-order__item"
      />
    </div>
    <!-- TODO: uncomment for the future release -->
    <!-- <BlockCheckoutOrderCoupon class="checkout-order__coupon" /> -->
    <div class="checkout-order__footer">
      <transition-group name="fade">
        <div
          v-if="orderSummary.discount_price"
          key="price"
          class="checkout-order__footer-item checkout-order__footer-item--sale"
        >
          <div
            class="checkout-order__footer-title checkout-order__footer-title--sale"
          >
            {{ $t('checkoutPage.orderPrice') }}
          </div>
          <div class="checkout-order__price">
            {{ orderSummary.formatted_grand_total }}
          </div>
        </div>
        <div
          v-if="orderSummary.discount_price"
          key="sale"
          class="checkout-order__footer-item"
        >
          <div
            class="checkout-order__footer-title checkout-order__footer-title--sale"
          >
            {{ $t('checkoutPage.discount') }}
          </div>
          <div class="checkout-order__sale">
            - {{ orderSummary.grand_total - orderSummary.discount_price }} грн
          </div>
        </div>
        <div
          v-if="orderSummary.grand_total > 1000"
          key="freeShipping"
          class="checkout-order__footer-item"
        >
          <div class="checkout-order__footer-title">
            {{ $t('checkoutPage.freeShipping.name') }}
          </div>
          <div class="checkout-order__total-price">
            {{ $t('checkoutPage.freeShipping.price') }}
          </div>
        </div>
        <div key="totalPrice" class="checkout-order__footer-item">
          <div class="checkout-order__footer-title">
            {{ $t('cart.total') }}
          </div>
          <div class="checkout-order__total-price">
            {{
              orderSummary.discount_price
                ? orderSummary.formatted_discount_price
                : orderSummary.formatted_grand_total
            }}
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import BlockCheckoutOrderItem from './BlockCheckoutOrderItem'
// import BlockCheckoutOrderCoupon from './BlockCheckoutOrderCoupon'

export default {
  components: {
    BlockCheckoutOrderItem
    // BlockCheckoutOrderCoupon
  },
  props: {
    orderSummary: {
      type: Object,
      required: true
    }
  },
  computed: {
    backToShoppingLink() {
      return this.$i18n.path(this.$store.getters['catalog/defaultCategorySlug'])
    }
  }
}
</script>

<style lang="scss">
.checkout-order {
  &__header,
  &__footer-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    font-size: 14px;
    line-height: 18px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__proceed {
    font-size: 12px;
    font-weight: 300;
    line-height: 15px;
    letter-spacing: 0.05em;
    text-decoration-line: underline;

    @include hover-focus-active {
      text-decoration-line: underline;
    }
  }

  &__content {
    padding-top: 19px;
    margin-bottom: 23px;
  }

  &__item {
    position: relative;

    &:not(:last-of-type) {
      margin-bottom: 51px;

      &::after {
        position: absolute;
        right: 0;
        bottom: -26px;
        left: 28px;
        height: 1px;
        content: '';
        background-color: $gray;
      }
    }
  }

  &__coupon {
    padding-top: 15px;
    margin-bottom: 20px;
    margin-left: 27px;
    border-top: 1px solid $gray;
  }

  &__footer {
    margin-left: 27px;
  }

  &__footer-item {
    padding-bottom: 13px;
    border-bottom: 1px solid $gray;

    &:not(:last-of-type) {
      margin-bottom: 15px;
    }

    &--sale {
      padding-top: 12px;
    }
  }

  &__footer-title {
    font-size: 12px;
    line-height: 15px;
    text-transform: uppercase;
    letter-spacing: 0.05em;

    &--sale {
      text-transform: none;
    }
  }

  &__price,
  &__sale {
    font-size: 16px;
    line-height: 19px;
    color: $input-color;
  }

  &__sale {
    color: $primary;
  }

  &__total-price {
    font-size: 18px;
    font-weight: 500;
    line-height: 23px;
    color: $input-color;
  }

  @include media-breakpoint-down(lg) {
    &__header {
      padding-left: 6px;
    }

    &__content {
      margin-bottom: 16px;
    }

    &__item {
      &:not(:last-of-type) {
        margin-bottom: 34px;

        &::after {
          bottom: -17px;
        }
      }
    }

    &__coupon {
      padding-top: 30px;
    }
  }

  @include media-breakpoint-down(md) {
    &__header {
      padding-left: 0;
    }

    &__content {
      margin-bottom: 20px;
    }

    &__item {
      &:not(:last-of-type) {
        margin-bottom: 40px;

        &::after {
          bottom: -20px;
        }
      }
    }
  }

  @include media-breakpoint-down(sm) {
    &__content {
      padding-top: 27px;
      margin-bottom: 19px;
    }

    &__item {
      &:not(:last-of-type) {
        &::after {
          left: 0;
        }
      }
    }

    &__coupon {
      padding-top: 14px;
      margin-bottom: 24px;
      margin-left: 0;
    }

    &__footer {
      margin-left: 0;
    }

    &__footer-item {
      padding-bottom: 10px;
    }

    &__footer-title {
      font-size: 11px;
      line-height: 14px;
      letter-spacing: 0.05em;
    }

    &__price {
      font-size: 11px;
      line-height: 14px;
    }

    &__sale {
      font-size: 11px;
      line-height: 14px;
    }

    &__total-price {
      font-size: 13px;
      line-height: 16px;
    }
  }
}
</style>
