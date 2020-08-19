<template>
  <div class="testimonials-list">
    <BContainer>
      <div class="testimonials-list__row">
        <div v-if="isLoading" class="testimonials-list__preloader"></div>
        <BlockTestimonialsListItem
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="testimonials-list__item"
          :testimonial="testimonial"
        />
      </div>
      <div class="testimonials-list__pagination">
        <PagePagination
          :current-page="currentPage"
          :total-rows="totalPages"
          @page-change="onPageChange"
        />
      </div>
      <BButton
        v-dynamic-modal:form="createModalConfig('feedback')"
        variant="primary"
        class="testimonials-list__button"
        type="button"
      >
        {{ $t('buttons.postAReview') }}
      </BButton>
    </BContainer>
  </div>
</template>

<script>
import BlockTestimonialsListItem from './BlockTestimonialsListItem'
import PagePagination from '@/components/shared/PagePagination'

import testimonialsPageChange from '@/mixins/testimonials-page-change'
import modalConfig from '@/mixins/modal-config'

export default {
  components: {
    PagePagination,
    BlockTestimonialsListItem
  },
  mixins: [testimonialsPageChange, modalConfig],
  props: {
    testimonials: {
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
      return this.$store.state.testimonials.currentPage
    },
    totalPages() {
      return this.$store.state.testimonials.totalPages
    }
  }
}
</script>

<style lang="scss">
.testimonials-list {
  &__row {
    position: relative;
  }

  &__preloader {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    background-color: rgba($color: $white, $alpha: 0.5);
  }

  &__item {
    &:not(:last-of-type) {
      margin-bottom: 30px;
    }
  }

  &__pagination {
    display: flex;
    justify-content: center;
    margin-top: 39px;
  }

  &__button {
    display: block;
    min-width: 250px;
    margin-top: 33px;
    margin-right: auto;
    margin-left: auto;
  }

  @include media-breakpoint-up(md) {
    &__row {
      padding-left: 80px;
    }

    &__item {
      &:not(:last-of-type) {
        margin-bottom: 34px;
      }
    }

    &__pagination {
      justify-content: flex-end;
      margin-top: 29px;
    }
  }

  @include media-breakpoint-up(lg) {
    &__row {
      padding-left: 60px;
    }

    &__item {
      &:not(:last-of-type) {
        margin-bottom: 35px;
      }
    }

    &__button {
      margin-top: 24px;
    }
  }

  @include media-breakpoint-up(xl) {
    &__row {
      padding-left: 100px;
    }

    &__item {
      &:not(:last-of-type) {
        margin-bottom: 37px;
      }
    }

    &__pagination {
      margin-top: 2px;
    }

    &__button {
      margin-top: 20px;
    }
  }

  @include media-breakpoint-up(xxl) {
    &__row {
      padding-left: 120px;
    }

    &__pagination {
      padding-right: 116px;
      margin-top: -18px;
    }

    &__button {
      margin-top: 53px;
    }
  }
}
</style>
