<template>
  <div
    :class="{ 'home-screen--animate': !isPreloaderVisible }"
    class="home-screen"
  >
    <div
      :style="{ 'background-color': bgColors.left }"
      class="home-screen__bg home-screen__bg--left"
    ></div>
    <BContainer class="home-screen__container">
      <BlockHomeScreenSlider :items="offers" @slide-change="setBgColors" />
    </BContainer>
    <div ref="brand" class="home-screen__brand">Virna</div>
    <div
      :style="{ 'background-color': bgColors.right }"
      class="home-screen__bg home-screen__bg--right"
    ></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import gsap from 'gsap'

import BlockHomeScreenSlider from './BlockHomeScreenSlider'

import { mutationTypes as uiMutationTypes } from '@/store/ui'

export default {
  components: {
    BlockHomeScreenSlider
  },
  props: {
    offers: {
      type: Array,
      required: true
    }
  },
  data() {
    const { left, right } = this.offers[0].colors

    return {
      bgColors: { left, right }
    }
  },
  computed: {
    ...mapState({
      isPreloaderVisible: (state) => state.ui.isPreloaderVisible,
      isBackgroundRevealed: (state) => state.ui.isBackgroundRevealed
    })
  },
  watch: {
    isPreloaderVisible: 'onAppLoaded',
    isBackgroundRevealed: 'animate'
  },
  mounted() {
    if (!this.isPreloaderVisible) {
      this.$store.commit(
        `ui/${uiMutationTypes.SET_BACKGROUND_REVEALED_TOGGLE}`,
        true
      )
    }
  },
  methods: {
    setBgColors(activeItem) {
      this.bgColors = activeItem.colors
    },
    onAppLoaded(status) {
      if (!status) {
        // Await for animation
        setTimeout(() => {
          this.$store.commit(
            `ui/${uiMutationTypes.SET_BACKGROUND_REVEALED_TOGGLE}`,
            true
          )
        }, 600)
      }
    },
    animate(status) {
      if (status) {
        gsap.to(this.$refs.brand, {
          x: 0,
          opacity: 1,
          duration: 2,
          delay: 0.8,
          ease: 'expo.out(1, 0.3)'
        })
      }
    }
  }
}
</script>

<style lang="scss">
.home-screen {
  position: relative;
  overflow: hidden;

  &__bg {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: -1;
    content: '';
    transition: transform 1s 0.5s cubic-bezier(0.32, 0.32, 0, 0.99);
    transform: scaleY(0);
  }

  &__bg--left {
    left: 0;
    transform-origin: top;
  }

  &__bg--right {
    right: 0;
    left: 0;
    transform-origin: top;
  }

  &--animate &__bg {
    transform: scaleY(1);
  }

  &__container {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
  }

  &__arrow {
    width: 30px;
    height: 9px;

    &--left {
      transform: rotate(180deg);
    }
  }

  &__brand {
    position: absolute;
    bottom: 35%;
    left: -130px;
    z-index: -1;
    font-family: $font-family-cg;
    font-size: 400px;
    line-height: 1;
    color: rgba(255, 255, 255, 0.4);
    text-transform: uppercase;
    user-select: none;
    opacity: 0;
    transform: translate(50px, 0);
  }

  @include media-breakpoint-down(sm) {
    height: calc(100vh - 50px);
  }

  @include media-breakpoint-down(md) {
    & > &__brand {
      display: none;
    }
  }

  @include media-breakpoint-only(md) {
    height: calc(100vh - 60px);
  }

  @include media-breakpoint-up(md) {
    margin-top: -60px;

    &__brand {
      top: 40px;
      left: -18px;
      font-size: 500px;
    }
  }

  @include media-breakpoint-down(md) {
    &__bg--left {
      right: 0;
    }

    &__bg--right {
      display: none;
    }
  }

  @include media-breakpoint-up(lg) {
    height: 100vh;

    &__bg--left {
      right: 58%;
      transform-origin: bottom;
    }

    &__bg--right {
      left: 42%;
    }

    &__container {
      align-items: flex-end;
    }

    &__brand {
      top: 60px;
      left: 285px;
    }
  }

  @include media-breakpoint-between(lg, xl) {
    &__bg--left {
      z-index: 2;
    }

    &__brand {
      z-index: 1;
    }
  }

  @include media-breakpoint-up(xl) {
    &__bg--left {
      right: 60%;
    }

    &__bg--right {
      left: 40%;
    }

    &__brand {
      top: -40px;
      left: 330px;
      font-size: 700px;
    }
  }

  @include media-breakpoint-up(xxl) {
    &__bg--left {
      right: 62%;
    }

    &__bg--right {
      left: 38%;
    }

    & > &__brand {
      display: none;
    }

    &__brand {
      top: 0;
      left: 490px;
      z-index: 0;
      max-width: 1155px;
    }
  }
}

.has-banner .home-screen {
  @include media-breakpoint-down(sm) {
    height: calc(100vh - 80px);
  }

  @include media-breakpoint-up(md) {
    padding-top: 30px;
    margin-top: -30px;
  }

  @include media-breakpoint-up(lg) {
    margin-top: -90px;
  }
}
</style>
