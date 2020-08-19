<template>
  <div class="featured-products__slide swiper-slide">
    <ProductPreview :item="item" />
  </div>
</template>

<script>
import ProductPreview from '@/components/shared/ProductPreview'

export default {
  components: {
    ProductPreview
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
