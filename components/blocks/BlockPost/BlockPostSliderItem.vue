<template>
  <div class="post-slider-item">
    <BlockPostImage :item="item" />
  </div>
</template>

<script>
import BlockPostImage from './BlockPostImage'

export default {
  components: {
    BlockPostImage
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
.post-slider-item {
  width: 100%;
}
</style>
