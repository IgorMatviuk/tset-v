<template>
  <div class="payment-methods">
    <div class="payment-methods__title">{{ $t('footer.paymentMethods') }}</div>
    <svg-icon
      name="visa"
      class="payment-methods__icon"
      width="36"
      height="11"
    />
    <svg-icon
      name="mastercard"
      class="payment-methods__icon"
      width="21"
      height="16"
    />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.payment-methods {
  &__title {
    margin-bottom: 1px;
    font-size: 12px;
    line-height: 1.25;
    color: $text-color;
  }

  &__icon {
    &:not(:last-of-type) {
      margin-right: 7px;
    }
  }

  @include media-breakpoint-down(sm) {
    display: flex;
    align-items: center;
    justify-content: center;

    &__title {
      margin-right: 12px;
      margin-bottom: 0;
    }
  }
}
</style>
