<template>
  <div
    :class="{
      'top-info--animate': isHomePage,
      'top-info--animated': isAnimationFinished
    }"
    class="top-info"
  >
    <BContainer class="top-info__container">
      <NuxtLink
        :to="$i18n.path(banner.url)"
        class="top-info__link"
        target="_blank"
      />
      <picture>
        <source
          srcset="/img/stub.png"
          :data-srcset="banner.image.large_image_url"
          type="image/webp"
          media="(min-width: 1200px)"
        />
        <source
          srcset="/img/stub.png"
          :data-srcset="banner.image.large_image_url"
          type="image/png"
          media="(min-width: 1200px)"
        />
        <source
          srcset="/img/stub.png"
          :data-srcset="banner.image.medium_image_url"
          type="image/webp"
          media="(min-width: 768px)"
        />
        <source
          srcset="/img/stub.png"
          :data-srcset="banner.image.medium_image_url"
          type="image/png"
          media="(min-width: 768px)"
        />
        <source
          srcset="/img/stub.png"
          :data-srcset="banner.image.small_image_url"
          type="image/webp"
        />
        <img
          :data-src="banner.image.small_image_url"
          src="/img/stub.png"
          data-object-fit="cover"
          data-object-position="center bottom"
          alt="Top Info"
          class="top-info__img lazyload"
          width="100"
          height="100"
          loading="lazy"
        />
      </picture>
    </BContainer>
  </div>
</template>

<script>
import gsap from 'gsap'
import { mapState } from 'vuex'

export default {
  props: {
    banner: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isAnimationFinished: false
    }
  },
  computed: {
    ...mapState({
      isBackgroundRevealed: (state) => state.ui.isBackgroundRevealed,
      currLocale: (state) => state.locale
    }),
    isHomePage() {
      return (
        this.$route.path === '/' ||
        this.$route.path === `/${this.currLocale}` ||
        this.$route.path === `/${this.currLocale}/`
      )
    }
  },
  watch: {
    isBackgroundRevealed: 'animate'
  },
  mounted() {
    if (!this.isHomePage) {
      this.isAnimationFinished = true
    }
  },
  methods: {
    animate(status) {
      /* istanbul ignore else */
      if (status && this.isHomePage) {
        gsap.to(this.$el, {
          y: 0,
          duration: 1,
          delay: 0.15,
          ease: 'expo.out(1, 0.3)',
          onComplete: () => (this.isAnimationFinished = true)
        })
      }
    }
  }
}
</script>

<style lang="scss">
.top-info {
  position: relative;
  z-index: 12;
  height: 30px;
  background-color: $primary-light-1;

  &__container {
    position: relative;
  }

  &__link {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  &__img {
    width: 100%;
    height: 30px;
    object-fit: cover;
    object-position: center;
  }
}

.has-banner .top-info--animate:not(.top-info--animated) {
  @include media-breakpoint-up(lg) {
    transform: translateY(-30px);
  }
}
</style>
