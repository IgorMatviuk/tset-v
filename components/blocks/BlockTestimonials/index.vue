<template>
  <div
    :class="{ 'testimonials--is-page': isTestimonialsPage }"
    class="testimonials"
  >
    <BContainer>
      <SectionHeader>
        <template v-slot:title>{{ $t('reviewsPage.title') }}</template>
        <template v-slot:navigation>
          <MoreLink
            v-if="!isTestimonialsPage"
            url="reviews"
            class="testimonials__reviews"
          >
            {{ $t('buttons.allReviews') }}
          </MoreLink>
          <PagePagination
            v-else
            class="testimonials__pagination"
            :current-page="currentPage"
            :total-rows="totalPages"
            @page-change="onPageChange"
          />
        </template>
      </SectionHeader>
      <div class="testimonials__slider-container">
        <BlockTestimonialsSlider
          :items="testimonials"
          :is-testimonials-page="isTestimonialsPage"
        />
      </div>
    </BContainer>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import BlockTestimonialsSlider from './BlockTestimonialsSlider'
import SectionHeader from '@/components/shared/SectionHeader'
import MoreLink from '@/components/shared/MoreLink'
import PagePagination from '@/components/shared/PagePagination'

import testimonialsPageChange from '@/mixins/testimonials-page-change'

export default {
  components: {
    SectionHeader,
    BlockTestimonialsSlider,
    MoreLink,
    PagePagination
  },
  mixins: [testimonialsPageChange],
  props: {
    testimonials: {
      type: Array,
      required: true
    },
    isTestimonialsPage: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  computed: {
    ...mapState({
      currentPage(state) {
        return state.testimonials.currentPage
      },
      totalPages(state) {
        return state.testimonials.totalPages
      }
    })
  }
}
</script>

<style lang="scss">
.testimonials {
  overflow-x: hidden;

  &__slider-container {
    margin-right: -29px;
    margin-left: -29px;
  }

  &__slider {
    padding-right: 15px;
    padding-left: 15px;
  }

  &__slide {
    padding-right: 15px;
    padding-left: 15px;
  }

  &__reviews {
    display: none;
  }

  @include media-breakpoint-up(xl) {
    &--is-page &__slider {
      padding-bottom: 39px;
    }
  }

  @include media-breakpoint-down(xl) {
    &__slider-container {
      margin-right: -30px;
      margin-left: -30px;
    }

    &__slide {
      padding-right: 15px;
      padding-left: 15px;
    }
  }

  @include media-breakpoint-up(lg) {
    &--is-page &__slider {
      padding-bottom: 55px;
    }
  }

  @include media-breakpoint-down(lg) {
    &__slider-container {
      margin-right: -20px;
      margin-left: -20px;
    }

    &__slider {
      padding-right: 5px;
      padding-bottom: 54px;
      padding-left: 5px;
    }

    &__slide {
      padding-right: 15px;
      padding-left: 15px;
    }

    &__reviews {
      display: block;
      padding-top: 4px;
      margin-right: -3px;
    }

    &--is-page &__reviews {
      display: none;
    }
  }

  @include media-breakpoint-down(md) {
    &__slider {
      padding-bottom: 52px;
    }
  }

  @include media-breakpoint-down(sm) {
    &__slider-container {
      margin-right: -18.5px;
      margin-left: -18.5px;
    }

    &__slider {
      padding-right: 0;
      padding-bottom: 42px;
      padding-left: 0;
    }

    &__slide {
      padding-right: 3.5px;
      padding-left: 3.5px;
    }

    &__reviews {
      padding-top: 0;
    }

    &__pagination {
      display: none;
    }
  }
}
</style>
