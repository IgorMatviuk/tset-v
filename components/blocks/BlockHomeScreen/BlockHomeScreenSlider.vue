<template>
  <div
    v-swiper:homeScreenSlider="swiperOptions"
    :cleanup-styles-on-destroy="false"
    class="home-screen__slider"
  >
    <div class="swiper-wrapper">
      <BlockHomeScreenSlide
        v-for="(item, index) in items"
        :key="index"
        :content="item"
      />
    </div>
    <BlockHomeScreenNavigation ref="navigation" />
    <div class="home-screen__brand">Virna</div>
    <BlockHomeScreenCard ref="card" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import gsap from 'gsap'

import BlockHomeScreenSlide from './BlockHomeScreenSlide'
import BlockHomeScreenCard from './BlockHomeScreenCard'
import BlockHomeScreenNavigation from './BlockHomeScreenNavigation'

export default {
  components: {
    BlockHomeScreenSlide,
    BlockHomeScreenCard,
    BlockHomeScreenNavigation
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      swiperOptions: {
        speed: 800,
        parallax: true,
        effect: 'fade',
        simulateTouch: false,
        // autoplay: {
        //   delay: 4500
        // },
        autoplay: false,
        navigation: {
          prevEl: '.home-screen__btn-nav--prev',
          nextEl: '.home-screen__btn-nav--next',
          disabledClass: 'home-screen__btn-nav--disabled'
        },
        on: {
          slideChange: this.onSlideChange
        }
      }
    }
  },
  computed: {
    ...mapState({
      isBackgroundRevealed: (state) => state.ui.isBackgroundRevealed
    })
  },
  watch: {
    isBackgroundRevealed: 'animate'
  },
  methods: {
    onSlideChange() {
      const activeItem = this.items[this.homeScreenSlider.activeIndex]
      this.$emit('slide-change', activeItem)
    },
    startAutoplay() {
      this.swiperOptions.autoplay = { delay: 4500 }

      if (this.homeScreenSlider) {
        this.homeScreenSlider.autoplay.start()
      }
    },
    animate(status) {
      if (status) {
        const brand = this.$el.querySelector('.home-screen__brand')
        const navigation = this.$refs.navigation.$el
        const card = this.$refs.card.$el

        const timeline = gsap.timeline({ onComplete: this.startAutoplay })

        timeline
          .to(brand, {
            x: 0,
            opacity: 1,
            duration: 2,
            delay: 0.8,
            ease: 'expo.out(1, 0.3)'
          })
          .to(
            navigation,
            {
              opacity: 1,
              duration: 1
            },
            '-=1.95'
          )

        gsap.to(card, {
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
  &__slider {
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  @include media-breakpoint-between(lg, xl) {
    &__slider {
      z-index: 3;
    }

    &__slider &__brand {
      display: none;
    }
  }

  @include media-breakpoint-up(xxl) {
    &__slider &__brand {
      font-size: 690px;
    }
  }
}
</style>
