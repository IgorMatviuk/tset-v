<template>
  <NotFound />
</template>

<script>
import NotFound from '@/components/views/NotFound'

import seoMeta from '@/mixins/seo-meta'

export default {
  components: {
    NotFound
  },
  mixins: [seoMeta],
  props: {
    error: {
      type: Object,
      required: true
    }
  },
  layout: 'nohud'
}
</script>
