<template>
  <div class="our-features">
    <BContainer>
      <div class="our-features__container">
        <BlockOurFeaturesSlider :features="features" />
        <SliderArrow arrow-type="next" class="our-features__next" />
        <SliderArrow arrow-type="prev" class="our-features__prev" />
      </div>
    </BContainer>
  </div>
</template>

<script>
import BlockOurFeaturesSlider from './BlockOurFeaturesSlider'
import SliderArrow from '@/components/shared/SliderArrow'

export default {
  components: {
    BlockOurFeaturesSlider,
    SliderArrow
  },
  props: {
    features: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">
.our-features {
  padding-top: 50px;

  &__container {
    position: relative;
    padding-right: 50px;
    padding-left: 50px;
  }

  &__slide {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__pagination {
    display: none;
  }

  &__next {
    right: -5px;
  }

  &__prev {
    left: -5px;
  }

  @include media-breakpoint-down(xl) {
    &__container {
      padding-right: 60px;
      padding-left: 60px;
    }
  }

  @include media-breakpoint-down(lg) {
    &__container {
      padding-right: 25px;
      padding-left: 25px;
    }

    &__slider {
      padding-bottom: 59px;
    }

    &__next.swiper-button-next,
    &__prev.swiper-button-prev {
      display: none;
    }

    &__pagination {
      display: block;
    }
  }

  @include media-breakpoint-down(md) {
    padding-top: 51px;

    &__container {
      padding-right: 30px;
      padding-left: 30px;
    }

    &__slider {
      padding-bottom: 78px;
    }
  }

  @include media-breakpoint-down(sm) {
    padding-top: 43px;

    &__container {
      padding-right: 5px;
      padding-left: 5px;
    }

    &__slider {
      padding-bottom: 61px;
    }
  }
}
</style>
