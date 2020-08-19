<template>
  <div class="posts">
    <BContainer>
      <SectionHeader>
        <template v-slot:title>{{ title }}</template>
        <template v-slot:navigation>
          <div class="posts__navigation">
            <SliderArrow arrow-type="prev" class="post__prev" />
            <SliderArrow arrow-type="next" class="post__next" />
          </div>
          <MoreLink url="blog" class="posts__more">
            Весь блог
          </MoreLink>
        </template>
      </SectionHeader>
      <div class="posts__slider-container">
        <BlockFeaturedPostsSlider :posts="posts" />
      </div>
    </BContainer>
  </div>
</template>

<script>
import BlockFeaturedPostsSlider from './BlockFeaturedPostsSlider'
import SectionHeader from '@/components/shared/SectionHeader'
import SliderArrow from '@/components/shared/SliderArrow'
import MoreLink from '@/components/shared/MoreLink'

export default {
  components: {
    SectionHeader,
    BlockFeaturedPostsSlider,
    SliderArrow,
    MoreLink
  },
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      title: 'блог'
    }
  }
}
</script>

<style lang="scss">
.posts {
  margin-top: 30px;

  &__navigation {
    position: relative;
    top: -3px;
    right: -5px;
    width: 115px;
  }

  &__more {
    display: none;
  }

  &__slide {
    flex: 0 0 690px;
    max-width: 690px;
    margin-right: 30px;
  }

  &__pagination {
    display: none;
  }

  @include media-breakpoint-down(xl) {
    margin-top: 34px;

    &__slide {
      flex: 0 0 570px;
      max-width: 570px;
      margin-right: 30px;
    }
  }

  @include media-breakpoint-down(lg) {
    margin-top: 14px;

    &__navigation {
      display: none;
    }

    &__more {
      display: block;
      padding-top: 4px;
      margin-right: -3px;
    }

    &__slider {
      padding-bottom: 52px;
    }

    &__slide {
      flex: 0 0 auto;
      max-width: 100%;
      margin-right: 0;
    }

    &__pagination {
      display: block;
    }
  }

  @include media-breakpoint-down(md) {
    margin-top: 9px;
  }

  @include media-breakpoint-down(sm) {
    margin-top: 14px;

    &__more {
      padding-top: 0;
    }

    &__slider-container {
      margin-right: -15px;
      margin-left: -15px;
    }

    &__slider {
      padding-right: 15px;
      padding-bottom: 54px;
      padding-left: 15px;
    }
  }
}
</style>
