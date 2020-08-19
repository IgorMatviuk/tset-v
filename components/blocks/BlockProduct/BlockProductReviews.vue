<template>
  <BlockProductCollapse class="product-info__collapse">
    <template v-slot:title>
      <span>{{ $t('productPage.info.reviews') }}</span>
    </template>
    <template v-slot:reviews>
      <BlockProductReview
        v-for="review in items"
        :key="review.id"
        :review="review"
        class="product-info__review"
      />
    </template>
  </BlockProductCollapse>
</template>

<script>
import BlockProductCollapse from './BlockProductCollapse'
import BlockProductReview from './BlockProductReview'

export default {
  components: {
    BlockProductCollapse,
    BlockProductReview
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
