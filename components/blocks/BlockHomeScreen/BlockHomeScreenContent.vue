<template>
  <div class="home-screen__content">
    <div
      class="home-screen__title"
      data-swiper-parallax="-25"
      data-swiper-parallax-opacity="0"
    >
      <div
        v-for="(block, index) in rollingBlocks"
        :key="index"
        class="home-screen__rolling-block"
      >
        <div class="home-screen__rolling-title">{{ block }}</div>
      </div>
    </div>
    <div class="home-screen__subtitle">
      <span data-swiper-parallax="25" data-swiper-parallax-opacity="0">
        {{ content.subtitle }}
      </span>
    </div>
    <div data-swiper-parallax-opacity="0">
      <BButton :to="content.url" variant="primary" class="home-screen__btn">
        {{ $t('homeScreen.button') }}
      </BButton>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import gsap from 'gsap'

export default {
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
      isBackgroundRevealed: (state) => state.ui.isBackgroundRevealed
    }),
    rollingBlocks() {
      return this.content.title
        .split(' ')
        .map((block, i) => (i > 0 ? ` ${block}` : block))
    }
  },
  watch: {
    isBackgroundRevealed: 'animate'
  },
  methods: {
    animate(status) {
      if (status) {
        const rollingTitle = this.$el.querySelectorAll(
          '.home-screen__rolling-title'
        )
        const subtitle = this.$el.querySelector('.home-screen__subtitle')
        const btn = this.$el.querySelector('.btn')

        gsap.to(rollingTitle, {
          y: 0,
          duration: 1.5,
          delay: 0.2,
          stagger: 0.2,
          ease: 'expo.out(2, 0.3)'
        })

        gsap.to([subtitle, btn], {
          // y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.6,
          stagger: 0.2,
          ease: 'expo.out(1, 0.3)'
        })
      }
    }
  }
}
</script>

<style lang="scss">
.home-screen {
  &__content {
    position: absolute;
    top: 30%;
    padding-right: 15px;
    padding-left: 15px;
    user-select: none;
  }

  &__title {
    font-size: 40px;
    font-weight: bold;
    line-height: 1.12;
    text-transform: uppercase;
  }

  &__rolling-block {
    overflow: hidden;
  }

  &__rolling-title {
    transform: translate(0, -100%);
  }

  &__subtitle {
    margin-bottom: 12px;
    font-weight: 500;
    opacity: 0;
  }

  &__btn {
    opacity: 0;
  }

  @include media-breakpoint-only(md) {
    &__content {
      padding-right: 0;
      padding-left: 50px;
    }
  }

  @include media-breakpoint-up(md) {
    &__content {
      top: 18%;
    }

    &__title {
      font-size: 90px;
    }

    &__subtitle {
      margin-bottom: 22px;
      font-size: 20px;
    }
  }

  @include media-breakpoint-up(lg) {
    &__content {
      top: 22%;
      left: 50%;
      padding-right: 0;
      padding-left: 0;
      user-select: none;
    }

    &__title {
      font-size: 65px;
    }

    &__subtitle {
      margin-top: 12px;
      margin-bottom: 32px;
    }
  }

  @include media-breakpoint-up(xl) {
    &__content {
      top: 20%;
    }
  }

  @include media-breakpoint-up(xxl) {
    &__content {
      top: 22%;
      left: 602px;
    }

    &__title {
      font-size: 85px;
    }

    &__subtitle {
      font-size: 24px;
    }
  }
}
</style>
