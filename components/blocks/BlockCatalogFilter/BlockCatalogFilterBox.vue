<template>
  <div class="catalog-filter__box">
    <div class="catalog-filter__header">
      <div
        :class="{
          'catalog-filter__label--active': contentType === 'categories'
        }"
        class="catalog-filter__label catalog-filter__label--categories"
        @click="toggleVisibility('categories')"
      >
        <span>{{ $t('catalogPage.categories') }}</span>
        <svg-icon name="chevron" class="catalog-filter__icon" />
      </div>
      <div
        :class="{
          'catalog-filter__label--active': contentType === 'filters'
        }"
        class="catalog-filter__label catalog-filter__label--filters"
        @click="toggleVisibility('filters')"
      >
        <span>{{ $t('catalogPage.filter.action') }}</span>
        <svg-icon name="chevron" class="catalog-filter__icon" />
      </div>
      <BlockCatalogFilterSelection
        class="catalog-filter__selection"
        @toggle-filters="toggleVisibility('filters')"
        @clear-filters="clearFilters"
      />
    </div>
    <div v-if="filtersVisibility" class="catalog-filter__filters-wrapper">
      <BCollapse v-model="isVisible">
        <template v-if="contentType === 'filters'">
          <div key="column-wrapper" class="catalog-filter__column-wrapper">
            <BlockCatalogFilterColumn
              v-for="attribute in attributes"
              ref="filterGroup"
              :key="attribute.id"
              :attribute="attribute"
              @toggle-filters-application="onToggleFiltersApplication"
            />
          </div>
          <div key="filter-footer" class="catalog-filter__footer">
            <BButton
              :disabled="!allowFiltersApplication"
              variant="primary"
              class="catalog-filter__btn-apply"
              @click="onApplyFiltersEmit"
            >
              {{ $t('buttons.apply') }}
            </BButton>
            <ButtonClearFilters @clear-filters="onClearFiltersEmit" />
          </div>
        </template>
        <template v-else-if="contentType === 'categories'">
          <TheCatalogMenu
            key="catalog-menu"
            class="catalog-filter__categories-wrapper"
          />
        </template>
      </BCollapse>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import BlockCatalogFilterSelection from './BlockCatalogFilterSelection.vue'
import BlockCatalogFilterColumn from './BlockCatalogFilterColumn'
import ButtonClearFilters from '@/components/shared/ButtonClearFilters'
import TheCatalogMenu from '@/components/layout/catalog/TheCatalogMenu'

import filtersController from '@/mixins/filters-controller'
import { mutationTypes } from '@/store/ui'

export default {
  components: {
    BlockCatalogFilterSelection,
    BlockCatalogFilterColumn,
    ButtonClearFilters,
    TheCatalogMenu
  },
  mixins: [filtersController],
  data() {
    return {
      isVisible: false,
      contentType: null,
      allowFiltersApplication: false,
      filtersVisibility: true
    }
  },
  computed: {
    ...mapState({
      attributes: (state) => state.catalog.attributes,
      filters: (state) => state.catalog.filters
    })
  },
  watch: {
    filters(nextValue) {
      if (nextValue && !nextValue.length) {
        this.allowFiltersApplication = false
      }
    }
  },
  created() {
    if (this.$device.isMobile) {
      this.filtersVisibility = false
    } else {
      this.filtersVisibility = true
    }
  },
  mounted() {
    const mqlSm = matchMedia('(min-width: 768px)')

    mqlSm.addListener(() => {
      if (mqlSm.matches) {
        this.filtersVisibility = true
      } else {
        this.filtersVisibility = false
      }
    })
  },
  methods: {
    onToggleFiltersApplication(status) {
      const filters = this.getFilterSelections()

      /* istanbul ignore else */
      if ((!status && !filters.length) || (status && filters.length)) {
        this.allowFiltersApplication = status
      }
    },
    onApplyFiltersEmit() {
      this.isVisible = false
      this.contentType = null
      this.applyFilters()
    },
    onClearFiltersEmit() {
      this.isVisible = false
      this.contentType = null
      this.clearFilters()
    },
    toggleVisibility(contentType) {
      /* istanbul ignore next */
      if (this.filtersVisibility) {
        if (this.isVisible && contentType === this.contentType) {
          this.isVisible = !this.isVisible
          this.contentType = null
        } else if (this.isVisible && contentType !== this.contentType) {
          this.contentType = contentType
        } else if (!this.isVisible && contentType === this.contentType) {
          this.isVisible = !this.isVisible
        } else if (!this.isVisible && contentType !== this.contentType) {
          this.isVisible = !this.isVisible
          this.contentType = contentType
        }
      } else if (!this.filtersVisibility) {
        if (contentType === 'categories') {
          this.$store.commit(
            `ui/${mutationTypes.SET_CATEGORIES_DRAWER_VISIBILITY_TOGGLE}`,
            true
          )
        } else {
          this.$store.commit(
            `ui/${mutationTypes.SET_FILTERS_DRAWER_VISIBILITY_TOGGLE}`,
            true
          )
        }
      }
    }
  }
}
</script>

<style lang="scss">
.catalog-filter {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__label {
    font-size: 13px;
    font-weight: 500;
    color: $text-color;
    cursor: pointer;

    &--categories {
      display: none;
    }
  }

  &__label--active &__icon {
    transform: rotate(180deg);
  }

  &__icon {
    width: 10px;
    height: 10px;
    transition: transform 0.3s;
  }

  &__filters-wrapper {
    position: absolute;
    right: 0;
    left: 0;
    z-index: 1;
    margin-top: 20px;
    background-color: $white;
  }

  &__column-wrapper {
    display: flex;
    justify-content: space-between;
    padding-top: 6px;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 40px;
    margin-top: 6px;
  }

  &__btn-apply {
    min-width: 120px;
    height: 30px;
    margin-right: 32px;
    font-size: 13px;
    line-height: 28px;
  }

  &__categories-wrapper {
    display: none;
  }

  @include media-breakpoint-down(lg) {
    &__box {
      width: 100%;
    }

    &__header {
      justify-content: flex-start;
    }

    &__label {
      order: 1;
      margin-left: auto;
      font-size: 12px;
      text-transform: uppercase;

      &--categories {
        display: block;
        order: 0;
        margin-right: 53px;
        margin-left: 0;
      }
    }

    &__column-wrapper {
      padding-top: 10px;
    }

    &__categories-wrapper {
      position: static;
      display: block;
      padding-top: 10px;
      box-shadow: none;
    }

    .catalog-menu {
      &__additional-links {
        flex-basis: 198px;
        max-width: 198px;
        padding-left: 50px;

        .catalog-menu__item {
          line-height: 15px;
          text-transform: uppercase;

          &:nth-of-type(1) {
            display: none;
          }
        }
      }

      &__list-wrapper {
        &:nth-child(1) {
          flex-basis: 195px;
          max-width: 195px;
        }

        &:nth-child(2) {
          flex-basis: 235px;
          max-width: 235px;
        }

        &:nth-child(3) {
          flex-basis: 230px;
          max-width: 230px;
        }

        &:nth-child(4) {
          flex-basis: 175px;
          max-width: 175px;
        }
      }

      &__list {
        &:not(.catalog-menu__list--no-children):not(:only-child) {
          margin-bottom: 27px;
        }

        &:not(:first-child):not(:only-child) {
          margin-top: 21px;
        }
      }

      &__item {
        &--child {
          margin-bottom: 6.5px;
        }
      }

      &__link {
        display: inline-block;
        font-size: 12px;
      }
    }
  }

  @include media-breakpoint-down(md) {
    &__label {
      &--categories {
        margin-right: 0;
      }
    }

    &__column-wrapper {
      flex-wrap: wrap;
      justify-content: flex-start;
      padding-top: 20px;
    }

    &__footer {
      padding-bottom: 28px;
    }

    &__categories-wrapper {
      display: block;
      padding-top: 20px;
    }

    .catalog-menu {
      &__container {
        padding-right: 0;
        padding-left: 0;
      }

      &__additional-links {
        flex-basis: 103px;
        max-width: 103px;
        padding-left: 0;
      }

      &__list-wrapper {
        &:nth-child(1) {
          flex-basis: 145px;
          max-width: 145px;
        }

        &:nth-child(2) {
          flex-basis: 170px;
          max-width: 170px;
        }

        &:nth-child(3) {
          flex-basis: 160px;
          max-width: 160px;
        }

        &:nth-child(4) {
          flex-basis: 117px;
          max-width: 117px;
          margin-left: auto;
        }
      }
    }
  }

  @include media-breakpoint-down(sm) {
    &__selection {
      display: none;
    }

    &__filters-wrapper {
      display: none;
    }
  }
}
</style>
