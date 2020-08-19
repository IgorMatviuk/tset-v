<template>
  <div class="bonuses-content">
    <BContainer>
      <div class="bonuses-content__container" v-html="content"></div>
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
.bonuses-content {
  margin-bottom: 30px;

  &__container {
    padding-left: 17px;

    h1,
    h2 {
      position: relative;
      margin-bottom: 31px;
      font-size: 16px;
      font-weight: 400;
      line-height: 20px;
      text-transform: uppercase;
      letter-spacing: 0.05em;

      &::after {
        position: absolute;
        bottom: -16px;
        left: -15px;
        width: 90px;
        height: 1px;
        content: '';
        background-color: $primary-light-1;
      }
    }

    h3,
    h4,
    h5,
    h6 {
      margin-bottom: 16px;
      font-size: 13px;
      font-weight: 500;
      line-height: 16px;
      letter-spacing: 0.05em;
    }

    p {
      margin-bottom: 0;
      font-size: 12px;
      line-height: 15px;
      color: $text-color;

      &:not(:last-child) {
        margin-bottom: 15px;
      }
    }
  }

  @include media-breakpoint-up(md) {
    &__container {
      padding-left: 0;

      h1,
      h2 {
        margin-bottom: 36px;

        &::after {
          bottom: -21px;
          left: -10px;
          width: 100px;
        }
      }
    }
  }

  @include media-breakpoint-up(lg) {
    &__container {
      width: 770px;
      padding-left: 0;
      margin-right: auto;
      margin-left: auto;

      h1,
      h2 {
        &::after {
          left: -30px;
        }
      }
    }
  }

  @include media-breakpoint-up(xl) {
    &__container {
      width: 970px;

      h1,
      h2 {
        font-size: 18px;
        line-height: 23px;

        &::after {
          left: -34px;
          width: 110px;
        }
      }

      h3,
      h4,
      h5,
      h6 {
        margin-bottom: 13px;
        font-size: 14px;
        line-height: 18px;
      }

      p {
        font-size: 13px;
        line-height: 16px;

        &:not(:last-child) {
          margin-bottom: 17px;
        }
      }
    }
  }

  @include media-breakpoint-up(xxl) {
    &__container {
      width: 1170px;
    }
  }
}
</style>
