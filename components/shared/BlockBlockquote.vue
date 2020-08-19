<template>
  <div class="blockquote-text">
    <BContainer>
      <div class="blockquote-text__description" v-html="content"></div>
    </BContainer>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
.blockquote-text {
  &__description {
    position: relative;
    padding-bottom: 4px;
    padding-left: 25px;
    font-size: 20px;
    font-weight: 300;
    line-height: 25px;

    &::before {
      position: absolute;
      top: -1px;
      bottom: 4px;
      left: 0;
      width: 3px;
      content: '';
      background-color: $primary-light-1;
    }

    b {
      font-weight: 700;
    }
  }

  @include media-breakpoint-up(md) {
    &__description {
      max-width: 560px;
      padding-bottom: 0;
      margin-left: 76px;
      font-size: 23px;
      line-height: 29px;

      &::before {
        top: -6px;
        bottom: -6px;
        left: -16px;
        width: 5px;
      }
    }
  }

  @include media-breakpoint-up(lg) {
    &__description {
      margin-left: 256px;
    }
  }

  @include media-breakpoint-up(xl) {
    &__description {
      max-width: 700px;
      margin-left: 316px;
      font-size: 35px;
      line-height: 44px;

      &::before {
        top: 0;
        bottom: 0;
      }
    }
  }

  @include media-breakpoint-up(xxl) {
    &__description {
      max-width: 750px;
      margin-left: 376px;

      &::before {
        top: -4px;
        bottom: -4px;
      }
    }
  }
}
</style>
