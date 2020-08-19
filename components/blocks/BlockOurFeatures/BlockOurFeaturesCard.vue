<template>
  <div class="features-card">
    <svg-icon :name="item.icon" class="features-card__icon"></svg-icon>
    <div class="features-card__title">{{ item.title }}</div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
.features-card {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  &__icon {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    margin-right: 25px;
    color: $primary;
  }

  &__title {
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    text-transform: uppercase;
  }

  @include media-breakpoint-down(xl) {
    max-width: 250px;
  }

  @include media-breakpoint-down(sm) {
    max-width: 290px;

    &__icon {
      margin-right: 20px;
    }
  }
}
</style>
