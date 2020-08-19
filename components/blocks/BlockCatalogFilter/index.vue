<template>
  <div class="catalog-filter">
    <BlockCatalogFilterBox />
    <PagePagination
      v-if="totalPages > 1"
      :current-page="currentPage"
      :total-rows="totalPages"
      class="catalog-filter__pagination"
      @page-change="onPageChange"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

import BlockCatalogFilterBox from './BlockCatalogFilterBox'
import PagePagination from '@/components/shared/PagePagination'

import catalogPageChange from '@/mixins/catalog-page-change'

const { mapState } = createNamespacedHelpers('catalog')

export default {
  components: {
    BlockCatalogFilterBox,
    PagePagination
  },
  mixins: [catalogPageChange],
  computed: {
    ...mapState(['currentPage', 'totalPages'])
  }
}
</script>

<style lang="scss">
.catalog-filter {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;

  @include media-breakpoint-down(lg) {
    &__pagination {
      display: none;
    }
  }
}
</style>
