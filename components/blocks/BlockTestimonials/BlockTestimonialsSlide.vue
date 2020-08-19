<template>
  <div class="swiper-slide testimonials__slide">
    <BlockTestimonialsCard
      :item="item"
      :items="items"
      :index="index"
      :is-testimonials-page="isTestimonialsPage"
    />
  </div>
</template>

<script>
import BlockTestimonialsCard from './BlockTestimonialsCard'

export default {
  components: {
    BlockTestimonialsCard
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    isTestimonialsPage: {
      type: Boolean,
      default: false
    }
  }
}
</script>
