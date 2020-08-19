<template>
  <div class="member-road">
    <BContainer>
      <div class="member-road__content">
        <div class="member-road__title">{{ content.title }}</div>
        <div
          v-for="(item, index) in content.items"
          :key="index"
          class="member-road__item"
        >
          <div class="member-road__icon-wrapper">
            <svg-icon
              :name="item.icon"
              class="member-road__icon"
              width="22"
              height="22"
            />
          </div>
          <div class="member-road__text">{{ item.content }}</div>
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
.member-road {
  margin-bottom: 55px;

  &__content {
    padding-left: 17px;
  }

  &__title {
    margin-bottom: 26px;
    font-size: 13px;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0.05em;
  }

  &__item {
    position: relative;
    display: flex;
    align-items: center;

    &:not(:last-of-type) {
      margin-bottom: 32px;

      &::after {
        position: absolute;
        bottom: -31px;
        left: 6px;
        width: 30px;
        height: 30px;
        content: '';
        background-image: url("data:image/svg+xml,%3Csvg width='9' height='12' viewBox='0 0 9 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.79189 7.98146C9.06937 7.70252 9.06937 7.25026 8.79189 6.97131C8.51441 6.69237 8.06453 6.69237 7.78706 6.97131L5.21053 9.56147L5.21053 0.714286C5.21053 0.319796 4.89241 -1.79548e-07 4.5 -1.96701e-07C4.10759 -2.13854e-07 3.78947 0.319796 3.78947 0.714286L3.78947 9.56147L1.21294 6.97131C0.935466 6.69237 0.485585 6.69237 0.208109 6.97131C-0.0693696 7.25026 -0.0693697 7.70252 0.208109 7.98146L3.99758 11.791C4.27506 12.0699 4.72494 12.0699 5.00242 11.791L8.79189 7.98146Z' fill='%23D7969E'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 9px 12px;
      }
    }
  }

  &__icon-wrapper {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    background-color: $primary;
    border-radius: 50%;
  }

  &__icon {
    width: 22px;
    height: 22px;
    color: $white;
  }

  &__text {
    padding-right: 15px;
    padding-left: 20px;
    font-size: 13px;
    line-height: 16px;
  }

  @include media-breakpoint-up(md) {
    margin-bottom: 57px;

    &__content {
      @include make-row();

      padding-left: 0;
    }

    &__title {
      @include make-col(12);
      @include make-col-ready();
    }

    &__item {
      @include make-col(4);
      @include make-col-ready();

      display: block;

      &:not(:last-of-type) {
        margin-bottom: 0;

        &::after {
          top: 2px;
          right: 10px;
          bottom: unset;
          left: unset;
          width: 40px;
          height: 40px;
          background-image: url("data:image/svg+xml,%3Csvg width='30' height='9' viewBox='0 0 30 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M25.9815 0.208108C25.7025 -0.0693695 25.2503 -0.0693695 24.9713 0.208108C24.6924 0.485586 24.6924 0.935467 24.9713 1.21294L27.5615 3.78947H0.714286C0.319797 3.78947 0 4.10759 0 4.5C0 4.89241 0.319797 5.21053 0.714286 5.21053H27.5615L24.9713 7.78706C24.6924 8.06453 24.6924 8.51441 24.9713 8.79189C25.2503 9.06937 25.7025 9.06937 25.9815 8.79189L29.791 5.00242C30.0699 4.72494 30.0699 4.27506 29.791 3.99758L25.9815 0.208108Z' fill='%23D7969E'/%3E%3C/svg%3E");
          background-size: 30px 9px;
        }
      }
    }

    &__icon-wrapper {
      margin-bottom: 19px;
    }

    &__text {
      padding-left: 0;
      font-size: 12px;
      line-height: 15px;
    }
  }

  @include media-breakpoint-up(lg) {
    &__content {
      width: 800px;
      padding-left: 0;
      margin-right: auto;
      margin-left: auto;
    }
  }

  @include media-breakpoint-up(xl) {
    margin-bottom: 49px;

    &__content {
      width: 1000px;
    }

    &__title {
      font-size: 14px;
      line-height: 18px;
      letter-spacing: 0.05em;
    }

    &__item {
      flex: 0 0 30%;
      max-width: 30%;
    }

    &__text {
      font-size: 14px;
      line-height: 18px;
    }
  }

  @include media-breakpoint-up(xxl) {
    margin-bottom: 59px;

    &__content {
      width: 1200px;
    }
  }
}
</style>
