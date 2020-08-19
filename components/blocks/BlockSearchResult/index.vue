<template>
  <div class="search-result">
    <BContainer>
      <div class="search-result__header">
        <SearchBox
          :initial-value="query"
          :with-label="true"
          class="search-result__box"
        />
        <PagePagination
          v-if="totalPages > 1"
          class="search-result__top-pagination"
          :current-page="currentPage"
          :total-rows="totalPages"
          @page-change="onPageChange"
        />
      </div>
      <div class="search-result__row">
        <div
          v-for="product in products"
          :key="product.id"
          class="search-result__item"
        >
          <ProductPreview :item="product" />
        </div>
        <PagePagination
          v-if="totalPages > 1"
          class="search-result__pagination"
          :current-page="currentPage"
          :total-rows="totalPages"
          @page-change="onPageChange"
        />
      </div>
    </BContainer>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

import SearchBox from '@/components/functional/SearchBox'
import ProductPreview from '@/components/shared/ProductPreview'
import PagePagination from '@/components/shared/PagePagination'

import searchPageChange from '@/mixins/search-page-change'

const { mapState } = createNamespacedHelpers('search')

export default {
  components: {
    SearchBox,
    ProductPreview,
    PagePagination
  },
  mixins: [searchPageChange],
  props: {
    products: {
      type: Array,
      required: true
    },
    query: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState(['currentPage', 'totalPages'])
  }
}
</script>

<style lang="scss">
.search-result {
  padding-top: 8px;
  padding-bottom: 75px;
  overflow: hidden;

  &__header {
    @include make-col(10);

    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 30px;
  }

  &__box {
    flex-basis: 48.5%;
    max-width: 48.5%;

    .search-box {
      &__label {
        margin-bottom: 17px;
        font-size: 16px;
      }
    }
  }

  &__row {
    @include make-row();

    max-width: 85%;
  }

  &__item {
    @include make-col(6);
    @include make-col-ready();

    margin-bottom: 25px;
  }

  &__top-pagination {
    margin-bottom: 7px;
  }

  &__pagination {
    justify-content: flex-end;
    width: 100%;
  }

  @include media-breakpoint-down(xl) {
    padding-bottom: 62px;

    &__header {
      margin-bottom: 25px;
    }

    &__row {
      max-width: 85.5%;
    }

    &__item {
      margin-bottom: 15px;
    }

    &__pagination {
      margin-top: 13px;
    }
  }

  @include media-breakpoint-down(lg) {
    padding-top: 0;
    padding-bottom: 57px;

    &__header {
      @include make-col(12);

      margin-bottom: 28px;
    }

    &__box {
      flex: 0 0 50.5%;
      max-width: 50.5%;

      .search-box {
        &__label {
          margin-bottom: 9px;
        }
      }
    }

    &__row {
      width: unset;
      max-width: unset;
    }

    &__item {
      margin-bottom: 28px;
    }

    &__pagination {
      justify-content: center;
      margin-top: 0;
    }
  }

  @include media-breakpoint-down(md) {
    padding-bottom: 52px;

    &__box {
      flex: 0 0 48%;
      max-width: 48%;
    }
  }

  @include media-breakpoint-down(sm) {
    padding-bottom: 44px;

    &__header {
      margin-bottom: 13px;
    }

    &__box {
      flex: 0 0 100%;
      max-width: 100%;
    }

    &__top-pagination {
      display: none;
    }

    &__row {
      margin-right: -30px;
      margin-left: -30px;
    }

    &__item {
      @include make-col(12);

      margin-bottom: 17px;
    }

    &__pagination {
      margin-top: 20px;
    }
  }
}
</style>
