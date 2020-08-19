<template>
  <div class="post-text-content">
    <BContainer>
      <div class="post-text-content__wrapper" v-html="content"></div>
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
.post-text-content {
  margin-bottom: 25px;

  &__wrapper {
    p {
      margin-bottom: 0;
      font-size: 12px;
      line-height: 15px;
      color: $input-color;

      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }

    h2,
    h3,
    h4 {
      margin-bottom: 15px;
      font-size: 13px;
      font-weight: 500;
      line-height: 16px;
      color: $black;
      text-align: center;
    }
  }

  @include media-breakpoint-up(md) {
    &__wrapper {
      width: 450px;
      margin-right: auto;
      margin-left: auto;

      p {
        font-size: 13px;
        line-height: 16px;
      }

      h2,
      h3,
      h4 {
        margin-bottom: 12px;
        font-size: 14px;
        line-height: 18px;
      }
    }
  }

  @include media-breakpoint-up(lg) {
    &__wrapper {
      width: 610px;

      p {
        font-size: 14px;
        line-height: 18px;
      }

      h2,
      h3,
      h4 {
        margin-bottom: 15px;
      }
    }
  }

  @include media-breakpoint-up(xl) {
    margin-bottom: 30px;

    &__wrapper {
      width: 770px;
    }
  }

  @include media-breakpoint-up(xxl) {
    &__wrapper {
      width: 930px;
    }
  }
}
</style>
