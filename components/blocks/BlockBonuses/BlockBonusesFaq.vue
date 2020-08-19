<template>
  <div class="bonuses-faq">
    <BContainer>
      <div class="bonuses-faq__content">
        <div class="bonuses-faq__heading">{{ content.title }}</div>
        <BlockBonusesFaqCollapse
          v-for="(item, index) in content.items"
          :key="index"
          :content="item"
          class="bonuses-faq__item"
        />
      </div>
    </BContainer>
  </div>
</template>

<script>
import BlockBonusesFaqCollapse from './BlockBonusesFaqCollapse'

export default {
  components: {
    BlockBonusesFaqCollapse
  },
  props: {
    content: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
.bonuses-faq {
  padding-top: 45px;
  padding-bottom: 49px;

  &__content {
    padding-left: 17px;
  }

  &__heading {
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

  &__item {
    &:not(:last-of-type) {
      margin-bottom: 27px;
    }
  }

  @include media-breakpoint-up(md) {
    padding-top: 41px;
    padding-bottom: 88px;

    &__content {
      padding-left: 30px;
    }

    &__heading {
      margin-bottom: 35px;

      &::after {
        bottom: -20px;
        left: -30px;
        width: 100px;
      }
    }

    &__item {
      &:not(:last-of-type) {
        margin-bottom: 29px;
      }
    }
  }

  @include media-breakpoint-up(lg) {
    padding-bottom: 76px;

    &__content {
      width: 770px;
      padding-left: 0;
      margin-right: auto;
      margin-left: auto;
    }

    &__heading {
      margin-bottom: 36px;
    }
  }

  @include media-breakpoint-up(xl) {
    padding-top: 60px;
    padding-bottom: 98px;

    &__content {
      width: 970px;
    }

    &__heading {
      margin-bottom: 46px;
      font-size: 18px;
      line-height: 23px;

      &::after {
        bottom: -21px;
        left: -34px;
        width: 110px;
      }
    }

    &__item {
      &:not(:last-of-type) {
        margin-bottom: 28px;
      }
    }
  }

  @include media-breakpoint-up(xxl) {
    padding-top: 90px;
    padding-bottom: 120px;

    &__content {
      width: 1170px;
    }

    &__heading {
      margin-bottom: 41px;
    }
  }
}
</style>
