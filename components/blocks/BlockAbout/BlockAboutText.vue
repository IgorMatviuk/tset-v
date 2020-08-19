<template>
  <div class="about-text">
    <div class="about-text__title" v-html="content.title"></div>
    <div class="about-text__content" v-html="content.description"></div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
.about-text {
  padding-left: 15px;

  &__title {
    position: relative;
    margin-bottom: 31px;
    font-size: 16px;
    line-height: 20px;
    text-transform: uppercase;
    letter-spacing: 0.05em;

    &::before {
      position: absolute;
      bottom: -16px;
      left: -15px;
      width: 90px;
      height: 1px;
      content: '';
      background-color: $primary-light-1;
    }
  }

  &__content {
    padding-right: 5px;
    font-size: 12px;
    line-height: 15px;
    color: $text-color;

    p {
      margin-bottom: 14.5px;
      font-size: 12px;
      line-height: 15px;
      color: $text-color;
    }
  }

  @include media-breakpoint-up(md) {
    &__title {
      margin-bottom: 36px;

      &::before {
        bottom: -21px;
        left: -20px;
        width: 110px;
      }
    }
  }

  @include media-breakpoint-up(xl) {
    &__title {
      margin-bottom: 30px;
      font-size: 18px;
      line-height: 23px;

      &::before {
        bottom: -15px;
        left: -41px;
      }
    }

    &__content {
      font-size: 13px;
      line-height: 16px;

      p {
        margin-bottom: 16px;
        font-size: 13px;
        line-height: 16px;
      }
    }
  }
}
</style>
