<template>
  <div class="swiper-slide posts__slide">
    <BlockFeaturedPostsCard :post="post" />
  </div>
</template>

<script>
import BlockFeaturedPostsCard from './BlockFeaturedPostsCard'

export default {
  components: {
    BlockFeaturedPostsCard
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>
