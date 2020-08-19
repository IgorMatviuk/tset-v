<template>
  <div class="product-review">
    <div class="product-review__header">
      <div class="product-review__author">{{ review.author }}</div>
      <div class="product-review__date">{{ review.published_at }}</div>
    </div>
    <div class="product-review__body">
      <div class="product-review__title">{{ review.title }}</div>
      <div class="product-review__comment">{{ review.comment }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    review: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
.product-review {
  width: 100%;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__author {
    font-size: 11px;
    font-weight: 500;
    line-height: 14px;
    letter-spacing: 0.05em;
  }

  &__date {
    font-size: 11px;
    font-weight: 300;
    line-height: 14px;
    color: $text-color;
    letter-spacing: 0.07em;
  }

  &__body {
    position: relative;
    padding-top: 13px;
    padding-right: 12px;
    padding-bottom: 26px;
    padding-left: 18px;
    margin-top: 10px;
    border: 1px solid $light-4;
    border-radius: 4px;

    &::after {
      position: absolute;
      top: -6px;
      left: 22px;
      width: 10px;
      height: 10px;
      content: '';
      background-color: $white;
      border-top: 1px solid $light-4;
      border-left: 1px solid $light-4;
      border-top-left-radius: 2px;
      transform: rotate(45deg);
    }
  }

  &__title {
    margin-bottom: 7px;
    font-size: 11px;
    line-height: 14px;
    letter-spacing: 0.05em;
  }

  &__comment {
    font-size: 11px;
    font-weight: 300;
    line-height: 14px;
  }
}
</style>
