<template>
  <div
    v-swiper:featuredPostsSlider="swiperOptions"
    :cleanup-styles-on-destroy="false"
    class="posts__slider"
  >
    <div class="swiper-wrapper posts__slider-wrapper">
      <BlockFeaturedPostsSlide
        v-for="post in posts"
        :key="post.id"
        :post="post"
      />
    </div>
    <SliderPagination class="posts__pagination" />
  </div>
</template>

<script>
import BlockFeaturedPostsSlide from './BlockFeaturedPostsSlide'
import SliderPagination from '@/components/shared/SliderPagination'

export default {
  components: {
    BlockFeaturedPostsSlide,
    SliderPagination
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
        watchOverflow: true,
        slidesPerView: 1,
        spaceBetween: 50,
        navigation: {
          nextEl: '.post__next',
          prevEl: '.post__prev'
        },
        pagination: {
          el: '.posts__pagination',
          clickable: true
        },
        breakpoints: {
          1200: {
            slidesPerView: 2,
            spaceBetween: 30
          }
        }
      }
    }
  }
}
</script>
