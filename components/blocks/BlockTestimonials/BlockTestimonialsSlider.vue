<template>
  <div
    v-swiper:testimonialsSlider="swiperOptions"
    :cleanup-styles-on-destroy="false"
    class="testimonials__slider"
  >
    <div class="swiper-wrapper testimonials__slider-wrapper">
      <BlockTestimonialsSlide
        v-for="(item, index) in items"
        :key="index"
        :item="item"
        :items="items"
        :index="index"
        :is-testimonials-page="isTestimonialsPage"
      />
    </div>
    <SliderPagination class="testimonials__slider-pagination" />
  </div>
</template>

<script>
import BlockTestimonialsSlide from './BlockTestimonialsSlide'
import SliderPagination from '@/components/shared/SliderPagination'

export default {
  components: {
    BlockTestimonialsSlide,
    SliderPagination
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    isTestimonialsPage: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: 1,
        watchOverflow: true,
        pagination: {
          el: '.testimonials__slider-pagination',
          clickable: true
        },
        breakpoints: {
          768: {
            slidesPerView: 3
          },
          1200: {
            slidesPerView: 4
          }
        }
      }
    }
  }
}
</script>
