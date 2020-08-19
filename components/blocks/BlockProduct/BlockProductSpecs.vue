<template>
  <div class="product-info__spec">
    <div
      v-for="(spec, key) in items"
      :key="key"
      class="product-spec product-info__spec-item"
    >
      <div class="product-spec__name">{{ spec.name }}:</div>
      <div class="product-spec__desc">{{ spec.value }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
.product-info {
  &__spec {
    width: 100%;
    padding-bottom: 25px;
    margin-top: 25px;
    border-bottom: 1px solid $light-1;
  }

  &__spec-item {
    &:not(:last-of-type) {
      margin-bottom: 18px;
    }
  }

  @include media-breakpoint-down(lg) {
    &__spec {
      padding-bottom: 21px;
    }

    &__spec-item {
      &:not(:last-of-type) {
        margin-bottom: 9px;
      }
    }
  }

  @include media-breakpoint-down(sm) {
    &__spec {
      padding-bottom: 20px;
      margin-top: 19px;
    }

    &__spec-item {
      &:not(:last-of-type) {
        margin-bottom: 17px;
      }
    }
  }
}

.product-spec {
  &__name {
    margin-bottom: 4px;
    font-size: 12px;
    font-weight: 300;
    line-height: 15px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  &__desc {
    font-size: 13px;
    font-weight: 300;
    line-height: 16px;
  }

  @include media-breakpoint-down(lg) {
    &__desc {
      font-size: 12px;
    }
  }

  @include media-breakpoint-down(sm) {
    text-align: center;

    &__name {
      font-size: 9px;
      line-height: 11px;
    }

    &__desc {
      font-size: 12px;
      line-height: 15px;
    }
  }
}
</style>
