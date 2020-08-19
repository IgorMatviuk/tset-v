<template>
  <div class="swiper-slide collections__slide">
    <BlockCollectionsCard :collection="item" />
  </div>
</template>

<script>
import BlockCollectionsCard from './BlockCollectionsCard'

export default {
  components: {
    BlockCollectionsCard
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
