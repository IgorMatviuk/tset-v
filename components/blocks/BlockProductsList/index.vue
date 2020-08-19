<template>
  <div class="featured-products">
    <BContainer>
      <SectionHeader>
        <template v-slot:title>{{ heading }}</template>
        <template v-slot:navigation>
          <div class="featured-products__navigation">
            <SliderArrow arrow-type="prev" class="featured-products__prev" />
            <SliderArrow arrow-type="next" class="featured-products__next" />
          </div>
        </template>
      </SectionHeader>
      <BlockProductsListSlider :items="products" :parent-class="parentClass" />
    </BContainer>
  </div>
</template>

<script>
import BlockProductsListSlider from './BlockProductsListSlider'
import SectionHeader from '@/components/shared/SectionHeader'
import SliderArrow from '@/components/shared/SliderArrow'

export default {
  components: {
    BlockProductsListSlider,
    SectionHeader,
    SliderArrow
  },
  props: {
    products: {
      type: Array,
      required: true
    },
    parentClass: {
      type: String,
      required: true
    },
    heading: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
.featured-products {
  margin-top: 30px;

  &__navigation {
    position: relative;
    width: 115px;
    margin-top: 2px;
    margin-right: -4px;
  }

  &__pagination {
    display: none;
  }

  @include media-breakpoint-down(sm) {
    &__pagination {
      display: block;
    }

    &__navigation {
      display: none;
    }
  }
}
</style>
