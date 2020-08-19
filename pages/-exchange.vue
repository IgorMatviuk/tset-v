<template>
  <main>
    <TheBreadcrumb :is-float="true" :items="breadcrumb" />
    <BlockContacts class="contacts-page__block" />
    <BlockExhangeReturn class="block-exhange" />
  </main>
</template>

<script>
import TheBreadcrumb from '@/components/layout/breadcrumb/TheBreadcrumb'
import BlockExhangeReturn from '@/components/blocks/BlockExchange/BlockExhangeReturn.vue'

import breadcrumb from '@/mixins/breadrumb'

export default {
  components: {
    TheBreadcrumb,
    BlockExhangeReturn
  },
  mixins: [breadcrumb({ isStaticPage: true, pageName: 'contacts' })]
}
</script>
<style lang="scss">
@include media-breakpoint-up(xs) {
  .block-exhange {
    padding: 10px 20px 1px 20px;
  }
}

@include media-breakpoint-up(sm) {
  .block-exhange {
    padding: 10px 100px 1px 100px;
  }
}

@include media-breakpoint-up(md) {
  .block-exhange {
    padding: 10px 100px 1px 100px;
  }
}

@include media-breakpoint-up(lg) {
  .block-exhange {
    padding: 10px 100px 1px 100px;
  }
}

@include media-breakpoint-up(xl) {
  .block-exhange {
    padding: 10px 100px 1px 100px;
  }
}

@include media-breakpoint-up(xxl) {
  .block-exhange {
    padding: 10px 320px 1px 320px;
  }
}
</style>
