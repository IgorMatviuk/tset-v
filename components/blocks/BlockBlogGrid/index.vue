<template>
  <div class="blog-grid">
    <div v-if="isLoading" class="blog-grid__preloader"></div>
    <BContainer>
      <PagePagination
        class="blog-grid__top-pagination"
        :current-page="currentPage"
        :total-rows="totalPages"
        @page-change="onPageChange"
      />
      <!-- FIXME: key='id' -->
      <div class="blog-grid__container">
        <BlockBlogGridItem
          v-for="(post, index) in posts"
          :key="index"
          :post="post"
        />
        <PagePagination
          class="blog-grid__bottom-pagination"
          :current-page="currentPage"
          :total-rows="totalPages"
          @page-change="onPageChange"
        />
      </div>
    </BContainer>
  </div>
</template>

<script>
import BlockBlogGridItem from './BlockBlogGridItem'
import PagePagination from '@/components/shared/PagePagination'

import blogPageChange from '@/mixins/blog-page-change'

export default {
  components: {
    BlockBlogGridItem,
    PagePagination
  },
  mixins: [blogPageChange],
  props: {
    posts: {
      type: Array,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    currentPage() {
      return this.$store.state.blog.currentPage
    },
    totalPages() {
      return this.$store.state.blog.totalPages
    }
  }
}
</script>

<style lang="scss">
.blog-grid {
  position: relative;

  &__preloader {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    background-color: rgba($color: $white, $alpha: 0.5);
  }

  &__top-pagination,
  &__bottom-pagination {
    margin-left: -8px;
  }

  &__top-pagination {
    margin-bottom: 22px;
  }

  @include media-breakpoint-up(md) {
    &__top-pagination {
      justify-content: flex-end;
      margin-right: -7px;
      margin-bottom: 33px;
      margin-left: 0;
    }

    &__container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: 532px 79px;
      gap: 10px 30px;
    }

    &__bottom-pagination {
      grid-column: 1;
      align-self: center;
      margin-top: 10px;
    }
  }

  @include media-breakpoint-up(lg) {
    &__container {
      grid-auto-rows: 665px 97px;
      gap: 20px 30px;
    }

    &__bottom-pagination {
      margin-top: 22px;
    }
  }

  @include media-breakpoint-up(xl) {
    &__top-pagination {
      margin-bottom: 23px;
    }

    &__container {
      grid-auto-rows: 830px 127px;
      gap: 22px 30px;
    }

    &__bottom-pagination {
      margin-top: 0;
      margin-bottom: 7px;
    }
  }

  @include media-breakpoint-up(xxl) {
    &__container {
      grid-auto-rows: 990px 140px;
      gap: 40px 30px;
    }

    &__bottom-pagination {
      margin-top: 5px;
      margin-bottom: 0;
    }
  }
}
</style>
