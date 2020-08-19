<template>
  <BPagination
    v-model="currentPageModel"
    :total-rows="totalRows"
    :per-page="1"
    :limit="5"
    hide-goto-end-buttons
    class="page-pagination"
    @change="onPageChange"
  >
    <template v-slot:prev-text>
      <svg-icon
        name="arrow"
        class="page-pagination__icon page-pagination__icon--prev"
      />
    </template>
    <template v-slot:next-text>
      <svg-icon
        name="arrow"
        class="page-pagination__icon page-pagination__icon--next"
      />
    </template>
  </BPagination>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalRows: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      currentPageModel: this.currentPage
    }
  },
  watch: {
    currentPage(nextCurrentPage) {
      this.currentPageModel = nextCurrentPage
    }
  },
  methods: {
    onPageChange(currentPage) {
      this.$emit('page-change', currentPage)
    }
  }
}
</script>

<style lang="scss">
.page-pagination {
  margin-bottom: 0;

  .page-item {
    &:first-child {
      .page-link {
        padding-right: 16px;
      }
    }

    &:last-child {
      .page-link {
        padding-left: 16px;
      }
    }
  }

  .page-link {
    font-size: 14px;
  }

  &__icon {
    width: 30px;
    height: 10px;
    fill: $black;

    &--prev {
      transform: rotate(180deg);
    }
  }
}
</style>
