<template>
  <div
    v-swiper:collectionSlider="swiperOptions"
    :cleanup-styles-on-destroy="false"
    class="collections__slider"
  >
    <div class="swiper-wrapper collections__wrapper">
      <BlockCollectionsSlide
        v-for="item in collections"
        :key="item.id"
        :item="item"
      />
    </div>
    <SliderPagination class="collections__pagination" />
  </div>
</template>

<script>
import BlockCollectionsSlide from './BlockCollectionsSlide'
import SliderPagination from '@/components/shared/SliderPagination'

export default {
  components: {
    SliderPagination,
    BlockCollectionsSlide
  },
  props: {
    collections: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: 1,
        watchOverflow: true,
        spaceBetween: 30,
        navigation: {
          nextEl: '.collections__next',
          prevEl: '.collections__prev'
        },
        pagination: {
          el: '.collections__pagination',
          clickable: true
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 30
          },
          1200: {
            slidesPerView: 2,
            spaceBetween: 25
          }
        }
      }
    }
  },
  mounted() {
    this.collectionSlider.on('slideChange', () => {
      this.$bus.$emit(
        'collection:slide-change',
        this.collectionSlider.activeIndex
      )
    })
  }
}
</script>
