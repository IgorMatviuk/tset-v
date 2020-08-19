<template>
  <div class="home-screen__left">
    <picture>
      <source
        :data-srcset="image.banner_xl | webp"
        scrset="/img/stub.png"
        type="image/webp"
      />
      <img
        class="home-screen__img lazyload"
        :data-src="image.banner_xl"
        :alt="altText"
        src="/img/stub.png"
        loading="lazy"
        data-swiper-parallax="-50"
        data-swiper-parallax-opacity="0"
      />
    </picture>
  </div>
</template>

<script>
import imageNextGen from '@/mixins/image-next-gen'

export default {
  mixins: [imageNextGen],
  props: {
    image: {
      type: Object,
      required: true
    },
    altText: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
.home-screen {
  &__left {
    z-index: 1;
    display: none;
    opacity: 0;
    transform: translate(0, 50px);
  }

  @include media-breakpoint-up(md) {
    &__left &__img {
      width: 400px;
    }
  }

  @include media-breakpoint-up(lg) {
    &__left {
      display: block;
    }

    &__left &__img {
      width: auto;
      height: auto;
      max-height: 90vh;
    }
  }

  @include media-breakpoint-only(xl) {
    &__left {
      padding-left: 50px;
    }
  }

  @include media-breakpoint-only(xxl) {
    &__left {
      padding-left: 0;
    }
  }
}
</style>
