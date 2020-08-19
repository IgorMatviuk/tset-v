<template>
  <div class="swiper-slide our-features__slide">
    <BlockOurFeaturesCard :item="item" />
  </div>
</template>

<script>
import BlockOurFeaturesCard from './BlockOurFeaturesCard'

export default {
  components: {
    BlockOurFeaturesCard
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
