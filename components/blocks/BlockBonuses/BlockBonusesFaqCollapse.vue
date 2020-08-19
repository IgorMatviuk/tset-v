<template>
  <div class="faq-collapse">
    <div
      :class="{ 'faq-collapse__title--active': isVisible }"
      class="faq-collapse__title"
      @click="isVisible = !isVisible"
    >
      {{ content.title }}
    </div>
    <BCollapse v-model="isVisible" accordion="collapseBonusesFaq">
      <div class="faq-collapse__content" v-html="content.content"></div>
    </BCollapse>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isVisible: false
    }
  }
}
</script>

<style lang="scss">
.faq-collapse {
  padding-left: 32px;

  &__title {
    position: relative;
    font-size: 13px;
    font-weight: 500;
    line-height: 16px;

    &::after,
    &::before {
      position: absolute;
      top: 7px;
      left: -32px;
      width: 14px;
      height: 2px;
      content: '';
      background-color: $primary-light-1;
      transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
      transform-origin: center center;
    }

    &::after {
      top: 1px;
      left: -26px;
      width: 2px;
      height: 14px;
    }

    &--active {
      &::after,
      &::before {
        transform: rotate(180deg);
      }

      &::after {
        opacity: 0;
      }
    }
  }

  &__content {
    padding-top: 11px;
    font-size: 12px;
    line-height: 15px;
    color: $text-color;

    & > * {
      margin-bottom: 0;

      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
  }

  @include media-breakpoint-up(md) {
    padding-left: 30px;

    &__content {
      padding-top: 10px;
    }
  }

  @include media-breakpoint-up(xl) {
    padding-left: 33px;

    &__title {
      font-size: 14px;
      line-height: 18px;

      &::before {
        top: 8px;
      }

      &::after {
        top: 2px;
      }
    }

    &__content {
      font-size: 13px;
      line-height: 16px;
    }
  }
}
</style>
