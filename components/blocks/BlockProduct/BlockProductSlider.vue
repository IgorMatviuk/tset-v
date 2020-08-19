<template>
  <div class="product-slider">
    <div
      v-swiper:productSlider="swiperOptions"
      :cleanup-styles-on-destroy="false"
      class="product-slider__container"
    >
      <div class="swiper-wrapper product-slider__wrapper">
        <div
          v-for="(preview, index) in formattedPreviews"
          :key="index"
          class="swiper-slide product-slider__slide"
        >
          <BlockProductPreview ref="previewItem" :item="preview" />
        </div>
      </div>
      <SliderPagination class="product-slider__pagination" />
    </div>
  </div>
</template>

<script>
import BlockProductPreview from './BlockProductPreview'
import SliderPagination from '@/components/shared/SliderPagination'

import formattedPreviews from '@/mixins/formatted-previews'

export default {
  components: {
    BlockProductPreview,
    SliderPagination
  },
  mixins: [formattedPreviews],
  props: {
    previews: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.product-slider__pagination',
          clickable: true
        },
        on: {
          slideChange: this.onSlideChange
        }
      }
    }
  },
  methods: {
    onSlideChange() {
      const video = this.$el.querySelector('video')

      if (this.productSlider.activeIndex === 1) {
        this.toggleVideoPlayState(video, 'play')
      } else {
        this.toggleVideoPlayState(video, 'pause')
      }
    },
    toggleVideoPlayState(video, nextState) {
      const isPlaying = !video.paused || !video.ended

      if (nextState === 'play') {
        video.play()
      } else if (isPlaying) {
        video.pause()
      }
    }
  }
}
</script>

<style lang="scss">
.product-slider {
  &__pagination {
    .swiper-pagination-bullet {
      bottom: 7px !important;
      width: 8px;
      height: 8px;
      margin: 0 5.5px !important;
    }
  }

  @include media-breakpoint-up(md) {
    display: none;

    &__pagination {
      display: none;
    }
  }
}
</style>
