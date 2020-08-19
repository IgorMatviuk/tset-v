<template>
  <div class="checkout-info">
    <div class="checkout-info__title">
      {{ $t('checkoutPage.paymentMethod') }}
    </div>
    <BFormGroup class="checkout-info__group">
      <BFormRadioGroup
        v-model="value.paymentInfo.paymentMethod.$model"
        class="checkout-info__radio-group"
        name="payment-method"
      >
        <BFormRadio
          v-if="isAbroadDelivery"
          :class="{ error: value.paymentInfo.paymentMethod.$error }"
          class="checkout-info__radio checkout-info__radio--payment"
          value="cod"
        >
          {{ $t('checkoutPage.paymentMethods.cod') }}
        </BFormRadio>
        <BFormRadio
          v-if="isAbroadDelivery"
          :class="{ error: value.paymentInfo.paymentMethod.$error }"
          class="checkout-info__radio checkout-info__radio--payment"
          value="privat24"
        >
          {{ $t('checkoutPage.paymentMethods.privat') }}
        </BFormRadio>
        <BFormRadio
          :class="{ error: value.paymentInfo.paymentMethod.$error }"
          class="checkout-info__radio checkout-info__radio--payment"
          value="liqPay"
        >
          Credit Card / Debit Card (LiqPay)
        </BFormRadio>
      </BFormRadioGroup>
    </BFormGroup>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    isAbroadDelivery: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss">
.checkout-info {
  &__radio {
    &--payment {
      width: 100%;

      &:not(:last-of-type) {
        margin-right: 0;
        margin-bottom: 12px;
      }
    }
  }

  @include media-breakpoint-down(sm) {
    &__radio {
      &--payment {
        &:not(:last-of-type) {
          margin-bottom: 8px;
        }
      }
    }
  }
}
</style>
