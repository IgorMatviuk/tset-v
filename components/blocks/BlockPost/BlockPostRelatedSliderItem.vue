<template>
  <div class="related-slider__slide swiper-slide">
    <BlockPostRelatedPost :post="post" />
  </div>
</template>

<script>
import BlockPostRelatedPost from './BlockPostRelatedPost'

export default {
  components: {
    BlockPostRelatedPost
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss"></style>
