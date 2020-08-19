<template>
  <main class="not-found-page">
    <BlockNotFound />
  </main>
</template>

<script>
import BlockNotFound from '@/components/blocks/BlockNotFound'

export default {
  components: {
    BlockNotFound
  }
}
</script>

<style lang="scss">
.not-found-page {
  // position: fixed;
  // top: 0;
  // right: 0;
  // bottom: env(safe-area-inset-bottom);
  // left: 0;
  // padding-top: 45px;
  background-color: $primary-light-3;
}
</style>
