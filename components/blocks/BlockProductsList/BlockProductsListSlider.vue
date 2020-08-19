<template>
  <div
    v-swiper:featuredProductsSlider="swiperOptions"
    :cleanup-styles-on-destroy="false"
    class="featured-products__slider"
  >
    <div class="swiper-wrapper">
      <BlockProductsListSlide
        v-for="item in items"
        :key="item.id"
        :item="item"
      />
    </div>
    <SliderPagination class="featured-products__pagination" />
  </div>
</template>

<script>
import BlockProductsListSlide from './BlockProductsListSlide'
import SliderPagination from '@/components/shared/SliderPagination'

export default {
  components: {
    BlockProductsListSlide,
    SliderPagination
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    parentClass: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: 2,
        watchOverflow: true,
        spaceBetween: 8,
        navigation: {
          nextEl: `.${this.parentClass} .featured-products__next`,
          prevEl: `.${this.parentClass} .featured-products__prev`
        },
        pagination: {
          el: `.${this.parentClass} .featured-products__pagination`,
          clickable: true
        },
        breakpoints: {
          768: {
            slidesPerView: 3,
            spaceBetween: 30
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

<style lang="scss">
.featured-products {
  &__slider {
    @include media-breakpoint-down(xl) {
      padding-top: 7px;
    }

    @include media-breakpoint-down(lg) {
      padding-top: 12px;
      padding-bottom: 54px;
    }

    @include media-breakpoint-down(sm) {
      padding-top: 1px;
      padding-bottom: 50px;
      margin-right: -15px;
      margin-left: -15px;
    }
  }
}
</style>
