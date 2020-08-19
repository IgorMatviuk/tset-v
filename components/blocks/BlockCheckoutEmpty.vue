<template>
  <div class="checkout-empty">
    <BContainer>
      <div class="checkout-empty__text">{{ $t('cart.empty') }}</div>
      <BButton to="/" variant="primary">{{ $t('cart.continue') }}</BButton>
    </BContainer>
  </div>
</template>

<script>
// TODO: empty cart layout
export default {}
</script>

<style lang="scss">
.checkout-empty {
  &__text {
    max-width: 305px;
    margin-bottom: 22px;
    font-size: 14px;
    color: $text-color;
  }

  @include media-breakpoint-up(md) {
    &__text {
      max-width: 620px;
    }
  }

  @include media-breakpoint-up(xl) {
    &__text {
      max-width: 470px;
    }
  }
}
</style>
