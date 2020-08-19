<template>
  <div class="filter-selection">
    <div
      v-swiper:selectionSlider="swiperOptions"
      :cleanup-styles-on-destroy="false"
      class="filter-selection__slider"
    >
      <div class="swiper-wrapper">
        <div
          v-for="(selection, index) in filters"
          :key="index"
          class="swiper-slide filter-selection__item"
          @click="onSelectionClick"
        >
          <div class="filter-selection__label">{{ selection.label }}:</div>
          <div class="filter-selection__value">
            {{ getFormattedValue(selection) }}
          </div>
          <svg-icon name="chevron" class="filter-selection__icon" />
        </div>
      </div>
    </div>
    <ButtonClearFilters
      v-if="filters.length"
      class="filter-selection__btn-clear"
      @clear-filters="clearFilters"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import ButtonClearFilters from '@/components/shared/ButtonClearFilters'

export default {
  components: {
    ButtonClearFilters
  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: 'auto',
        freeMode: true,
        grabCursor: true
      }
    }
  },
  computed: {
    ...mapState({
      filters: (state) => state.catalog.filters,
      attributes: (state) => state.catalog.attributes
    })
  },
  methods: {
    onSelectionClick() {
      this.$emit('toggle-filters')
    },
    clearFilters() {
      this.$emit('clear-filters')
    },
    getNoun(number) {
      return (one, two, five) => {
        let n = Math.abs(number)
        n %= 100

        /* istanbul ignore else */
        if (n >= 5 && n <= 20) {
          return five
        }

        n %= 10

        /* istanbul ignore else */
        if (n >= 2 && n <= 4) {
          return two
        }

        return one
      }
    },
    getFormattedValue({ code, value }) {
      /* istanbul ignore else */
      if (value.length > 1) {
        const pluralize = this.getNoun(value.length)
        const pluralLabel = pluralize(
          this.$t(`attributes.${code}.one`),
          this.$t(`attributes.${code}.two`),
          this.$t(`attributes.${code}.five`)
        )

        return `${value.length} ${pluralLabel.toLowerCase()}`
      }

      return this.$store.getters['catalog/optionLabel'](code, value[0])
    }
  }
}
</script>

<style lang="scss">
.filter-selection {
  display: flex;
  align-items: center;
  margin-left: 30px;

  &__slider {
    position: relative;
    padding-right: 20px;
    padding-left: 20px;
    margin-right: -20px;
    margin-left: -20px;

    &::before,
    &::after {
      position: absolute;
      top: 0;
      bottom: 0;
      z-index: 2;
      width: 20px;
      content: '';
    }

    // stylelint-disable
    &::before {
      left: 0;
      background: linear-gradient(
        -90deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 1) 100%
      );
    }

    &::after {
      right: 0;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 1) 100%
      );
    }
    // stylelint-enable
  }

  &__item {
    display: flex;
    align-items: center;
    width: auto;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;

    &:not(:last-child) {
      margin-right: 25px;
    }
  }

  /* &__item--active &__icon {
    transform: rotate(180deg);
  } */

  &__label,
  &__value {
    margin-right: 5px;
  }

  &__label {
    color: $text-color;
  }

  &__value {
    color: $primary;
    white-space: nowrap;
  }

  &__icon {
    width: 10px;
    height: 10px;
    transition: transform 0.3s;
  }

  &__btn-clear {
    margin-left: 30px;
  }

  @include media-breakpoint-up(md) {
    &__slider {
      max-width: 320px;
    }
  }

  @include media-breakpoint-up(lg) {
    &__slider {
      max-width: 470px;
    }
  }

  @include media-breakpoint-up(xl) {
    &__slider {
      max-width: 430px;
    }
  }

  @include media-breakpoint-up(xxl) {
    &__slider {
      max-width: 622px;
    }
  }
}
</style>
