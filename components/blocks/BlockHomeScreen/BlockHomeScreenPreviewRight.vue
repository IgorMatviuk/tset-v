<template>
  <div class="home-screen__right">
    <picture>
      <source
        :data-srcset="image.banner_xl | webp"
        srcset="/img/stub.png"
        type="image/webp"
      />
      <img
        class="home-screen__img home-screen__img--right lazyload"
        :data-src="image.banner_xl"
        :alt="altText"
        src="/img/stub.png"
        loading="lazy"
        data-swiper-parallax="25"
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
  &__right {
    position: absolute;

    /* right: -85%; */
    left: 52%;
    z-index: -1;
    opacity: 0;
    transform: translate(0, -50px);
  }

  &__img {
    &--right {
      width: auto;
      height: calc(100vh - 50px);
    }
  }

  @include media-breakpoint-up(md) {
    &__right {
      left: 70%;
    }

    &__img {
      &--right {
        width: auto;
        height: 100vh;
      }
    }
  }

  @include media-breakpoint-between(lg, xl) {
    &__right {
      display: none;
    }
  }

  @include media-breakpoint-up(xxl) {
    &__right {
      top: 0;
      left: 85%;
    }

    &__right &__img {
      height: 1070px;

      /* width: 590px; */
    }
  }
}

.has-banner .home-screen__img {
  &--right {
    height: calc(100vh - 80px);

    @include media-breakpoint-up(xxl) {
      height: calc(100vh - 30px);
    }
  }
}
</style>
