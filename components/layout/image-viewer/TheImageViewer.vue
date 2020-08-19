<template>
  <transition name="fade">
    <div class="image-viewer">
      <div
        v-swiper:imageViewerSlider="swiperOptions"
        :cleanup-styles-on-destroy="false"
        class="image-viewer__slider"
      >
        <div class="swiper-wrapper image-viewer__slider-wrapper">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="swiper-slide image-viewer__slide"
          >
            <div class="image-viewer__image-wrapper">
              <picture>
                <source
                  :data-srcset="item.preview_lg | webp"
                  srcset="/img/stub.png"
                  media="(max-width: 1439px)"
                  type="image/webp"
                />
                <source
                  :data-srcset="item.preview_lg"
                  srcset="/img/stub.png"
                  media="(max-width: 1439px)"
                  type="image/jpeg"
                />
                <source
                  :data-srcset="item.preview_xl | webp"
                  srcset="/img/stub.png"
                  type="image/webp"
                />
                <img
                  :data-src="item.preview_xl"
                  :title="item.title"
                  :alt="item.alt"
                  src="/img/stub.png"
                  class="image-viewer__image lazyload"
                  loading="lazy"
                  data-object-fit="cover"
                />
              </picture>
            </div>
          </div>
        </div>
        <SliderArrow arrow-type="prev" class="image-viewer__prev" />
        <SliderArrow arrow-type="next" class="image-viewer__next" />
        <button class="image-viewer__close" type="button" @click="closeGallery">
          <svg-icon
            name="close"
            class="image-viewer__icon"
            width="12"
            height="12"
          />
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import SliderArrow from '@/components/shared/SliderArrow'

import { mutationTypes as productMutationsTypes } from '@/store/product'

import imageNextGen from '@/mixins/image-next-gen'

export default {
  components: {
    SliderArrow
  },
  mixins: [imageNextGen],
  props: {
    activeIndex: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      swiperOptions: {
        watchOverflow: true,
        effect: 'fade',
        initialSlide: this.activeIndex,
        navigation: {
          nextEl: '.image-viewer__next',
          prevEl: '.image-viewer__prev'
        },
        keyboard: {
          enabled: true,
          onlyInViewport: false
        },
        breakpoints: {
          1200: {
            allowTouchMove: false
          }
        }
      }
    }
  },
  computed: {
    items() {
      const formattedPreviews = this.$store.state.product.activeVariant.previews.filter(
        (preview) => preview.preview_type !== 'video'
      )

      return formattedPreviews
    }
  },
  mounted() {
    window.addEventListener('keydown', this.closeOnEscapePress)
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.closeOnEscapePress)
  },
  methods: {
    closeGallery() {
      this.$store.commit(
        `product/${productMutationsTypes.SET_IMAGE_VIEWER_VISIBILITY_TOGGLE}`,
        false
      )
    },
    closeOnEscapePress($event) {
      /* istanbul ignore else */
      if ($event.code === 'Escape') {
        this.closeGallery()
      }
    }
  }
}
</script>

<style lang="scss">
.image-viewer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  // display: none;
  width: 100%;
  height: 100%;
  background-color: $white;

  &__slider {
    height: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  &__wrapper {
    height: 100%;
  }

  &__slide {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  &__image-wrapper {
    height: 100%;
  }

  &__image {
    display: block;
    max-width: 100%;
    max-height: 100%;
  }

  &__next,
  &__prev {
    position: absolute;
    top: 50%;
    color: $black;
    background-color: $white;
    border-radius: 50%;
    transform: translateY(-50%);
  }

  &__next {
    right: 15px;

    &.swiper-button-next {
      width: 50px;
      height: 50px;
    }
  }

  &__prev {
    left: 15px;

    &.swiper-button-prev {
      width: 50px;
      height: 50px;
    }
  }

  &__close {
    @include reset-button-styles();

    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    color: $black;
    background-color: $white;
    border-radius: 50%;
  }

  &__icon {
    width: 20px;
    height: 20px;
  }

  @media only screen and (max-width: 1199.98px) and (orientation: portrait) {
    &__slider {
      padding: 0;
    }

    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center center;
    }
  }

  @include media-breakpoint-down(sm) {
    &__next {
      &.swiper-button-next {
        width: 35px;
        height: 35px;
      }

      .icon {
        width: 19px;
        height: 6px;
      }
    }

    &__prev {
      &.swiper-button-prev {
        width: 35px;
        height: 35px;
      }

      .icon {
        width: 19px;
        height: 6px;
      }
    }

    &__close {
      top: 12px;
      right: 12px;
      width: 35px;
      height: 35px;
    }

    &__icon {
      width: 12px;
      height: 12px;
    }
  }
}
</style>
