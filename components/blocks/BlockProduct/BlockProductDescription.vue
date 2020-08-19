<template>
  <BlockProductCollapse class="product-info__collapse">
    <template v-slot:title>
      <span>{{ $t('productPage.info.description') }}</span>
    </template>
    <template v-slot:text>
      <div v-html="content"></div>
    </template>
  </BlockProductCollapse>
</template>

<script>
import BlockProductCollapse from './BlockProductCollapse'

export default {
  components: {
    BlockProductCollapse
  },
  props: {
    content: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
.collapse-info__text {
  p {
    &:only-child {
      margin-bottom: 0;
    }
  }
}
</style>
