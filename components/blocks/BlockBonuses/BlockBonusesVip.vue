<template>
  <div class="vip-bonuses">
    <BContainer>
      <div class="vip-bonuses__content">
        <div class="vip-bonuses__heading">{{ content.title }}</div>
        <div
          v-for="(item, index) in content.items"
          :key="index"
          class="vip-bonuses__item"
        >
          <div class="vip-bonuses__icon-wrapper">
            <svg-icon
              :name="item.icon"
              class="vip-bonuses__icon"
              width="24"
              height="24"
            />
          </div>
          <div class="vip-bonuses__title" v-html="item.title"></div>
          <div class="vip-bonuses__text" v-html="item.content"></div>
        </div>
      </div>
    </BContainer>
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
.vip-bonuses {
  padding-top: 45px;
  padding-bottom: 54px;
  background-color: rgba(242, 230, 230, 0.2);

  &__content {
    padding-left: 17px;
  }

  &__heading {
    position: relative;
    margin-bottom: 38px;
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
      margin-bottom: 22px;
    }
  }

  &__icon-wrapper {
    display: flex;
    align-items: center;
    width: 40px;
    height: 40px;
    margin-bottom: 7px;
  }

  &__icon {
    width: 24px;
    height: 24px;
    color: $primary-light-1;
  }

  &__title {
    margin-bottom: 10px;
    font-size: 13px;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0.05em;
  }

  &__text {
    font-size: 12px;
    line-height: 15px;
    color: $text-color;

    b {
      color: $black;
    }

    a {
      color: $primary;
      text-decoration: underline;
    }
  }

  @include media-breakpoint-up(md) {
    padding-top: 39px;
    padding-bottom: 37px;

    &__content {
      padding-left: 0;
    }

    &__heading {
      margin-bottom: 43px;

      &::after {
        bottom: -21px;
        left: -10px;
        width: 100px;
      }
    }

    &__item {
      position: relative;
      padding-top: 9px;
      padding-left: 50px;

      &:not(:last-of-type) {
        margin-bottom: 20px;
      }
    }

    &__icon-wrapper {
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  @include media-breakpoint-up(lg) {
    &__content {
      width: 770px;
      margin-right: auto;
      margin-left: auto;
    }
  }

  @include media-breakpoint-up(xl) {
    padding-top: 61px;
    padding-bottom: 67px;

    &__content {
      width: 970px;
    }

    &__heading {
      margin-bottom: 52px;
      font-size: 18px;
      line-height: 23px;

      &::after {
        left: -34px;
        width: 110px;
      }
    }

    &__title {
      font-size: 14px;
      line-height: 18px;
    }

    &__text {
      font-size: 13px;
      line-height: 16px;
    }
  }

  @include media-breakpoint-up(xxl) {
    padding-bottom: 77px;

    &__content {
      width: 1170px;
    }

    &__heading {
      margin-bottom: 52px;
    }
  }
}
</style>
