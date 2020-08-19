<template>
  <div class="related-slider">
    <BContainer>
      <div class="related-slider__content">
        <hr class="related-slider__delimiter" />
        <div class="related-slider__heading">
          {{ $t('relatedPosts.title') }}
        </div>
        <div class="related-slider__navigation">
          <SliderArrow arrow-type="prev" />
          <SliderArrow arrow-type="next" />
        </div>
        <div
          v-swiper:postRelatedSlider="swiperOptions"
          :cleanup-styles-on-destroy="false"
          class="related-slider__slider"
        >
          <div class="related-slider__slider-wrapper swiper-wrapper">
            <BlockPostRelatedSliderItem
              v-for="(post, index) in posts"
              :key="index"
              :post="post"
            />
          </div>
          <SliderPagination class="related-slider__pagination" />
        </div>
      </div>
    </BContainer>
  </div>
</template>

<script>
import BlockPostRelatedSliderItem from './BlockPostRelatedSliderItem'
import SliderPagination from '@/components/shared/SliderPagination'
import SliderArrow from '@/components/shared/SliderArrow'

export default {
  components: {
    BlockPostRelatedSliderItem,
    SliderPagination,
    SliderArrow
  },
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: 2,
        spaceBetween: 5,
        watchOverflow: true,
        pagination: {
          el: '.related-slider__pagination',
          clickable: true
        },
        navigation: {
          prevEl: '.related-slider__navigation .swiper-button-prev',
          nextEl: '.related-slider__navigation .swiper-button-next'
        },
        keyboard: {
          enabled: true,
          onlyInViewport: true
        },
        breakpoints: {
          768: {
            slidesPerView: 3,
            spaceBetween: 30
          },
          992: {
            slidesPerView: 4,
            spaceBetween: 30
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
.related-slider {
  padding-top: 1px;

  &__delimiter {
    margin-top: 8px;
    border-top: 2px solid $primary-light-2;
  }

  &__heading {
    padding-top: 4px;
    padding-bottom: 4px;
    margin-bottom: 10px;
    font-size: 16px;
    line-height: 20px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__slider {
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
    margin-bottom: 24px;

    &__content {
      position: relative;
      width: 450px;
      margin-right: auto;
      margin-left: auto;
    }

    &__delimiter {
      margin-bottom: 19px;
    }

    &__heading {
      margin-bottom: 20px;
      font-size: 18px;
      line-height: 23px;
    }

    &__pagination {
      display: none;
    }

    &__navigation {
      position: absolute;
      top: 15px;
      right: 0;
      z-index: 1;
      display: flex;
      justify-content: space-between;
      width: 100px;
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

    &__delimiter {
      margin-top: 6px;
      margin-bottom: 26px;
    }

    &__navigation {
      top: 23px;
    }
  }

  @include media-breakpoint-up(xl) {
    &__content {
      width: 770px;
    }

    &__delimiter {
      margin-top: 0;
    }
  }

  @include media-breakpoint-up(xxl) {
    &__content {
      width: 930px;
    }

    &__delimiter {
      margin-top: 14px;
      margin-bottom: 37px;
    }

    &__navigation {
      top: 31px;
    }
  }
}
</style>
