<template>
  <div :class="catalogResultsClassName" class="catalog-results">
    <div class="catalog-results__wrapper">
      <div
        v-for="product in products"
        :key="product.id"
        class="catalog-results__item"
      >
        <ProductPreview :item="product" :show-large="showLargePreviews" />
      </div>
    </div>
    <div class="catalog-results__pagination-wrapper">
      <PagePagination
        v-if="totalPages > 1"
        :current-page="currentPage"
        :total-rows="totalPages"
        @page-change="onPageChange"
      />
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

import ProductPreview from '@/components/shared/ProductPreview'
import PagePagination from '@/components/shared/PagePagination'

import catalogPageChange from '@/mixins/catalog-page-change'

const { mapState } = createNamespacedHelpers('catalog')

export default {
  components: {
    ProductPreview,
    PagePagination
  },
  mixins: [catalogPageChange],
  data() {
    return {
      mqlSm: null
    }
  },
  computed: {
    ...mapState(['products', 'showItemsCount', 'currentPage', 'totalPages']),
    catalogResultsClassName() {
      return this.showItemsCount === 2
        ? 'catalog-results--row'
        : 'catalog-results--grid'
    },
    showLargePreviews() {
      return this.showItemsCount === 2 && this.mqlSm && this.mqlSm.matches
    }
  },
  mounted() {
    this.mqlSm = matchMedia('(max-width: 767px)')
  }
}
</script>

<style lang="scss">
.catalog-results {
  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    margin-right: -19px;
    margin-left: -19px;
  }

  &--grid &__item {
    flex-basis: 50%;
    max-width: 50%;
  }

  &--row &__item {
    flex-basis: 100%;
    max-width: 100%;
  }

  &__item {
    padding-right: 4px;
    padding-left: 4px;
    margin-bottom: 20px;
  }

  &__pagination-wrapper {
    display: flex;
    justify-content: flex-end;
  }

  @include media-breakpoint-up(md) {
    &__wrapper {
      margin-right: -15px;
      margin-left: -15px;
    }

    &--grid &__item {
      flex-basis: 33.33%;
      max-width: 33.33%;
      margin-bottom: 40px;
    }

    &--row &__item {
      flex-basis: 50%;
      max-width: 50%;
      margin-bottom: 25px;
    }

    &__item {
      padding-right: 15px;
      padding-left: 15px;
    }
  }

  @include media-breakpoint-up(lg) {
    &--grid &__item {
      flex-basis: 25%;
      max-width: 25%;
    }
  }

  @include media-breakpoint-up(xl) {
    &--grid &__wrapper {
      margin-right: -8px;
      margin-left: -8px;
    }

    &--grid &__item {
      padding-right: 8px;
      padding-left: 8px;
    }
  }

  @include media-breakpoint-up(xxl) {
    &__pagination-wrapper {
      margin-bottom: 72px;
    }
  }
}
</style>
