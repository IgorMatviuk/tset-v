<template>
  <div class="images">
    <BlockExhangeDocumentsItem
      v-for="(item, index) in content.items"
      :key="index"
      :content="item"
    />
  </div>
</template>

<script>
import BlockExhangeDocumentsItem from '@/components/blocks/BlockExchange/BlockExhangeDocumentsItem.vue'

export default {
  components: {
    BlockExhangeDocumentsItem
  },
  props: {
    content: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
.images {
  display: flex;
  justify-content: space-evenly;
  width: 30%;
}

@include media-breakpoint-down(sm) {
  .images {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
}
</style>
