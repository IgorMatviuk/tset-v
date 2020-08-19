<template>
  <div
    :class="[directionContentClass, typeContentClass, isFirstContentClass]"
    class="about-content"
  >
    <BContainer>
      <div class="about-content__row">
        <div class="about-content__video-wrapper">
          <div class="about-content__overlay"></div>
          <BlockAboutVideo :content="content" class="about-content__video" />
        </div>
        <BlockAboutText :content="content" class="about-content__text" />
      </div>
    </BContainer>
  </div>
</template>

<script>
import BlockAboutVideo from './BlockAboutVideo'
import BlockAboutText from './BlockAboutText'

export default {
  components: {
    BlockAboutVideo,
    BlockAboutText
  },
  props: {
    content: {
      type: Object,
      required: true
    },
    direction: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    isFirst: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  computed: {
    directionContentClass() {
      return this.direction === 'right'
        ? 'about-content--is-right'
        : 'about-content--is-left'
    },
    typeContentClass() {
      return this.type === 'background'
        ? 'about-content--background'
        : this.type === 'overlay'
        ? 'about-content--overlay'
        : this.type === 'stretch'
        ? 'about-content--stretch'
        : ''
    },
    isFirstContentClass() {
      return this.isFirst ? 'about-content--is-first' : ''
    }
  }
}
</script>

<style lang="scss">
.about-content {
  &--stretch {
    overflow: hidden;
  }

  &--background {
    background-color: rgba(242, 230, 230, 0.3);
  }

  &__row {
    display: flex;
    flex-direction: column;
  }

  &__video-wrapper {
    position: relative;
    margin-right: -15px;
  }

  &--is-first &__video-wrapper {
    order: 1;
    margin-top: 34px;
  }

  &--background &__video-wrapper {
    margin-top: -20px;
  }

  &:not(.about-content--is-first) &__video-wrapper {
    margin-bottom: 40px;
  }

  &--stretch &__video-wrapper {
    margin-left: -15px;
  }

  &__overlay {
    position: absolute;
    display: none;
    width: 250px;
    height: 220px;
    background-color: $primary-light-3;
  }

  &--overlay &__overlay {
    display: block;
  }

  &--is-right &__overlay {
    top: -15px;
    left: -15px;
  }

  &--is-left &__overlay {
    top: -15px;
    left: -15px;
  }

  @include media-breakpoint-up(md) {
    &__row {
      flex-direction: row;
      align-items: flex-start;
    }

    &__video-wrapper {
      @include make-col(6);

      margin-right: 0;
    }

    &--is-right &__video-wrapper {
      order: unset;
    }

    &--overlay.about-content--is-right &__video-wrapper {
      padding-top: 10px;
      padding-right: 15px;
      padding-left: 26px;
      margin-top: 35px;
    }

    &--is-left &__video-wrapper {
      order: 1;
    }

    &--overlay.about-content--is-left &__video-wrapper {
      padding-left: 41px;
      margin-top: 46px;
      margin-bottom: 0;
    }

    &--background.about-content--is-right &__video-wrapper {
      align-self: center;
      padding-right: 15px;
      margin-top: 18px;
      margin-bottom: 0;
    }

    &--stretch.about-content--is-left &__video-wrapper {
      flex: 0 0 49.88vw;
      max-width: 49.88vw;
      padding-left: 13px;
      margin-bottom: 0;
      margin-left: 0;

      .about-video {
        padding-bottom: 111.2%;
      }
    }

    &__overlay {
      width: 240px;
      height: 188px;
    }

    &--is-right &__overlay {
      left: 0;
    }

    &--is-left &__overlay {
      top: unset;
      bottom: -28px;
      left: 15px;
    }

    &__text {
      @include make-col(6);
    }

    &--overlay.about-content--is-right &__text {
      padding-left: 50px;
    }

    &--overlay.about-content--is-left &__text {
      padding-left: 30px;
    }

    &--background.about-content--is-right &__text {
      padding-left: 29px;
      margin-top: 41px;
    }

    &--stretch.about-content--is-left &__text {
      padding-left: 19px;
      margin-top: 48px;

      .about-text__content {
        padding-right: 0;
      }
    }
  }

  @include media-breakpoint-up(lg) {
    &__video-wrapper {
      @include make-col(7);
    }

    &--overlay.about-content--is-right &__video-wrapper {
      padding-right: 13px;
      padding-left: 80px;
      margin-top: 12px;
    }

    &--overlay.about-content--is-left &__video-wrapper {
      padding-left: 92px;
      margin-top: -26px;
    }

    &--background.about-content--is-right &__video-wrapper {
      @include make-col(6);

      align-self: flex-start;
      margin-top: -70px;
    }

    &--stretch.about-content--is-left &__video-wrapper {
      flex: 0 0 58vw;
      max-width: 58vw;
      padding-left: 12px;

      .about-video {
        padding-bottom: 87.7%;
      }
    }

    &__overlay {
      width: 320px;
      height: 295px;
    }

    &--is-right &__overlay {
      top: -20px;
      left: 50px;
    }

    &--is-left &__overlay {
      left: 62px;
    }

    &__text {
      @include make-col(5);
    }

    &--overlay.about-content--is-right &__text {
      padding-left: 38px;
    }

    &--background.about-content--is-right &__text {
      @include make-col(6);

      padding-left: 35px;
      margin-top: 20px;
    }

    &--stretch.about-content--is-left &__text {
      padding-right: 18px;
      padding-left: 38px;
      margin-top: 74px;
    }
  }

  @include media-breakpoint-up(xl) {
    &__video-wrapper {
      @include make-col(8);
    }

    &--overlay.about-content--is-right &__video-wrapper {
      padding-right: 80px;
      padding-left: 100px;
    }

    &--overlay.about-content--is-left &__video-wrapper {
      padding-right: 70px;
      padding-left: 110px;
      margin-top: 0;
    }

    &--background.about-content--is-right &__video-wrapper {
      flex: 0 0 52%;
      max-width: 52%;
      padding-right: 8px;
      margin-top: -80px;
    }

    &--stretch.about-content--is-left &__video-wrapper {
      flex: 0 0 51.098vw;
      max-width: 51.098vw;
      padding-left: 0;

      .about-video {
        padding-bottom: 81.7%;
      }
    }

    &__overlay {
      width: 430px;
      height: 370px;
    }

    &--is-right &__overlay {
      top: -17px;
      left: 70px;
    }

    &--is-left &__overlay {
      left: 80px;
    }

    &__text {
      @include make-col(4);
    }

    &--overlay.about-content--is-right &__text {
      padding-left: 60px;
      margin-top: 28px;
    }

    &--overlay.about-content--is-left &__text {
      padding-right: 15px;
      margin-top: 65px;
    }

    &--background.about-content--is-right &__text {
      flex: 0 0 48%;
      max-width: 48%;
      padding-left: 131px;
      margin-top: 60px;
    }

    &--stretch.about-content--is-left &__text {
      flex: 0 0 48.75%;
      max-width: 48.75%;
      padding-right: 100px;
      padding-left: 139px;
      margin-top: 95px;
    }
  }

  @include media-breakpoint-up(xxl) {
    &--overlay.about-content--is-right &__video-wrapper {
      padding-right: 100px;
      padding-left: 120px;
    }

    &--overlay.about-content--is-left &__video-wrapper {
      padding-right: 90px;
      padding-left: 130px;
    }

    &--background.about-content--is-right &__video-wrapper {
      padding-right: 13px;
    }

    &--stretch.about-content--is-left &__video-wrapper {
      flex: 0 0 50.781vw;
      max-width: 50.781vw;

      .about-video {
        padding-bottom: 58.4615%;
      }
    }

    &__overlay {
      width: 510px;
      height: 470px;
    }

    &--is-right &__overlay {
      top: -20px;
      left: 90px;
    }

    &--is-left &__overlay {
      bottom: -30px;
      left: 100px;
    }

    &--overlay.about-content--is-right &__text {
      margin-top: 86px;
    }

    &--background.about-content--is-right &__text {
      padding-left: 267px;
      margin-top: 70px;
    }

    &--stretch.about-content--is-left &__text {
      flex: 0 0 49%;
      max-width: 49%;
      padding-right: 119px;
      padding-left: 159px;
      margin-top: 150px;
    }
  }
}
</style>
