<template>
  <div class="post-slider">
    <BContainer>
      <div class="post-slider__content">
        <div
          v-swiper:postSlider="swiperOptions"
          :cleanup-styles-on-destroy="false"
          class="post-slider__slider"
        >
          <div class="swiper-wrapper post-slider__slider-wrapper">
            <div
              v-for="(item, index) in items"
              :key="index"
              class="swiper-slide post-slider__slide"
            >
              <BlockPostSliderItem :item="item" />
            </div>
          </div>
          <SliderPagination class="post-slider__pagination" />
          <div class="post-slider__navigation">
            <SliderArrow arrow-type="prev" />
            <SliderArrow arrow-type="next" />
          </div>
        </div>
      </div>
    </BContainer>
  </div>
</template>

<script>
import BlockPostSliderItem from './BlockPostSliderItem'
import SliderPagination from '@/components/shared/SliderPagination'
import SliderArrow from '@/components/shared/SliderArrow'

export default {
  components: {
    BlockPostSliderItem,
    SliderPagination,
    SliderArrow
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
        spaceBetween: 15,
        watchOverflow: true,
        pagination: {
          el: '.post-slider__pagination',
          clickable: true
        },
        navigation: {
          prevEl: '.post-slider__navigation .swiper-button-prev',
          nextEl: '.post-slider__navigation .swiper-button-next'
        },
        keyboard: {
          enabled: true,
          onlyInViewport: true
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 30
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
.post-slider {
  margin-bottom: 25px;

  &__content {
    margin-right: -15px;
    margin-left: -15px;

    @media only screen and (min-width: 540px) {
      margin-right: 0;
      margin-left: 0;
    }
  }

  &__pagination.swiper-pagination {
    position: static;
    margin-top: 8px;
  }

  &__navigation {
    display: none;
  }

  @include media-breakpoint-up(md) {
    margin-bottom: 4px;

    &__content {
      width: 450px;
      margin-right: auto;
      margin-left: auto;
    }

    &__pagination {
      display: none;
    }

    &__navigation {
      display: flex;
      justify-content: space-between;
      height: 40px;
      margin-right: -5px;
      margin-left: -5px;

      .swiper-button-prev,
      .swiper-button-next {
        position: static;
        margin-top: 0;
      }
    }
  }

  @include media-breakpoint-up(lg) {
    &__content {
      width: 610px;
    }
  }

  @include media-breakpoint-up(xl) {
    margin-bottom: 12px;

    &__content {
      width: 770px;
    }
  }

  @include media-breakpoint-up(xxl) {
    &__content {
      width: 930px;
    }
  }
}
</style>
