<template>
  <div
    v-swiper:ourFeaturesSlider="swiperOptions"
    :cleanup-styles-on-destroy="false"
    class="our-features__slider"
  >
    <div class="swiper-wrapper our-features__wrapper">
      <BlockOurFeaturesSlide
        v-for="(item, index) in features"
        :key="index"
        :item="item"
      />
    </div>
    <SliderPagination class="our-features__pagination" />
  </div>
</template>

<script>
import BlockOurFeaturesSlide from './BlockOurFeaturesSlide'
import SliderPagination from '@/components/shared/SliderPagination'

export default {
  components: {
    BlockOurFeaturesSlide,
    SliderPagination
  },
  props: {
    features: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: 1,
        watchOverflow: true,
        navigation: {
          nextEl: '.our-features__next',
          prevEl: '.our-features__prev'
        },
        pagination: {
          el: '.our-features__pagination',
          clickable: true
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 80
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 20
          }
        }
      }
    }
  }
}
</script>
