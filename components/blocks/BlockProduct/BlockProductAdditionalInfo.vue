<template>
  <div class="product-info__additional-info">
    <BlockProductCollapse
      v-for="content in items"
      :key="content.code"
      class="product-info__collapse"
    >
      <template v-slot:title>
        <span>{{ content.name }}</span>
      </template>
      <template v-slot:text>
        <span>{{ content.value }}</span>
      </template>
    </BlockProductCollapse>
  </div>
</template>

<script>
import BlockProductCollapse from './BlockProductCollapse'

export default {
  components: {
    BlockProductCollapse
  },
  props: {
    items: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
.product-info__additional-info {
  width: 100%;
}
</style>
