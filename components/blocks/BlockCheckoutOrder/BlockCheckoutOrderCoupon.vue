<template>
  <div class="order-coupon">
    <div class="order-coupon__title">ввести промокод</div>
    <form novalidate @submit.prevent="submitCoupon">
      <div class="order-coupon__group">
        <!-- TODO: field and button animation fix -->
        <BFormInput
          ref="couponInput"
          v-model="coupon"
          :class="{ 'order-coupon__input--accepted': couponAccepted }"
          class="order-coupon__input"
          type="text"
          :readonly="couponAccepted"
          :trim="true"
          placeholder="Ввести промокод"
        />
        <transition name="fade">
          <BButton
            v-if="!couponAccepted"
            class="order-coupon__button newsletter__button"
            type="submit"
            variant="primary"
            size="sm"
          >
            <svg-icon
              class="order-coupon__icon newsletter__icon"
              name="button-arrow"
              width="27"
              height="9"
            />
          </BButton>
        </transition>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      couponAccepted: false,
      coupon: ''
    }
  },
  methods: {
    submitCoupon() {
      // TODO: submit coupon
      if (this.coupon) {
        setTimeout(() => {
          this.couponAccepted = !this.couponAccepted
          this.$refs.couponInput.blur()
        }, 500)
      }
    }
  }
}
</script>

<style lang="scss">
.order-coupon {
  &__title {
    margin-bottom: 14px;
    font-size: 12px;
    line-height: 15px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__group {
    display: flex;
  }

  &__input {
    width: 462px;
    transition: width 0.7s;

    &--accepted {
      width: 100%;
      color: $primary;
      pointer-events: none;
    }
  }

  &__button {
    margin-left: 32px;
  }

  @include media-breakpoint-down(lg) {
    &__title {
      margin-bottom: 12px;
    }
  }

  @include media-breakpoint-down(md) {
    &__input {
      width: 572.6px;

      &--accepted {
        width: 100%;
      }
    }

    &__button {
      margin-left: 39px;
    }
  }

  @include media-breakpoint-down(sm) {
    &__title {
      margin-bottom: 7px;
      font-size: 11px;
      line-height: 14px;
      letter-spacing: 0.05em;
    }

    &__button {
      margin-left: 19px;
    }
  }
}
</style>
