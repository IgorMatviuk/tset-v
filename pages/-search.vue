<template>
  <main class="search-page">
    <TheBreadcrumb />
    <div class="search-page__search-result">
      <div v-if="isLoading" class="search-page__preloader"></div>
      <transition name="fade" mode="out-in">
        <BlockSearchResult
          v-if="products.length"
          :products="products"
          :query="query"
        />
        <BlockSearchResultNotFound v-else :query="query" />
      </transition>
    </div>
  </main>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

import TheBreadcrumb from '@/components/layout/breadcrumb/TheBreadcrumb'
import BlockSearchResult from '@/components/blocks/BlockSearchResult/index'
import BlockSearchResultNotFound from '@/components/blocks/BlockSearchResult/BlockSearchResultNotFound'

import breadrumb from '@/mixins/breadrumb'

import pageActions from '@/utils/page-actions'

const { mapState } = createNamespacedHelpers('search')

export default {
  components: {
    TheBreadcrumb,
    BlockSearchResult,
    BlockSearchResultNotFound
  },
  mixins: [breadrumb({ isStaticPage: true, pageName: 'search' })],
  async fetch({ app, store, route }) {
    await pageActions.search({ store, route })
  },
  computed: {
    ...mapState(['isLoading', 'query', 'products'])
  },
  watch: {
    isLoading: 'scrollToTop',
    $route: 'fetchProducts'
  },
  methods: {
    async fetchProducts() {
      await pageActions.search({ store: this.$store, route: this.$route })
    },
    scrollToTop(nextStatus, prevStatus) {
      if (!nextStatus && prevStatus) {
        this.$scrollTo(document.body, 800, { force: true })
      }
    }
  }
}
</script>

<style lang="scss">
.search-page {
  &__search-result {
    position: relative;
  }

  &__preloader {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    background-color: rgba(255, 255, 255, 0.5);
  }
}
</style>
