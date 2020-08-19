<template>
  <div class="product-grid">
    <div
      v-for="(preview, index) in formattedPreviews"
      :key="index"
      class="product-grid__item"
    >
      <BlockProductPreview :item="preview" />
    </div>
  </div>
</template>

<script>
import BlockProductPreview from './BlockProductPreview'

import formattedPreviews from '@/mixins/formatted-previews'

export default {
  components: {
    BlockProductPreview
  },
  mixins: [formattedPreviews],
  props: {
    previews: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">
.product-grid {
  display: none;

  &__item {
    &:not(:last-of-type) {
      margin-bottom: 6px;
    }
  }

  @include media-breakpoint-up(md) {
    display: block;
  }

  @include media-breakpoint-up(lg) {
    display: flex;
    flex-wrap: wrap;
    margin-left: -2.5px;

    &__item {
      flex: 0 0 50%;
      max-width: 50%;
      padding-right: 2.5px;
      padding-left: 2.5px;
    }
  }

  @include media-breakpoint-up(xl) {
    margin-left: -4px;

    &__item {
      padding-right: 4px;
      padding-left: 4px;

      &:not(:last-of-type) {
        margin-bottom: 8px;
      }
    }
  }
}
</style>
