<template>
  <div class="item-count">
    <div class="item-count__title">{{ $t('catalogPage.showToggle') }}</div>
    <div class="item-count__switches">
      <div
        :class="[
          { 'item-count__item--active': showItemsCount === 2 },
          'item-count__item'
        ]"
        @click="toggleShowItems(2)"
      >
        2
        <svg-icon name="views-2" class="item-count__icon" />
      </div>
      <div
        :class="[
          { 'item-count__item--active': showItemsCount === 4 },
          'item-count__item'
        ]"
        @click="toggleShowItems(4)"
      >
        4
        <svg-icon name="views-4" class="item-count__icon" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mutationTypes } from '@/store/catalog'

export default {
  computed: {
    ...mapState({
      showItemsCount: (state) => state.catalog.showItemsCount
    })
  },
  methods: {
    toggleShowItems(showItemsCount) {
      this.$store.commit(
        `catalog/${mutationTypes.SET_SHOW_ITEMS_COUNT}`,
        showItemsCount
      )
    }
  }
}
</script>

<style lang="scss">
.item-count {
  display: flex;

  &__title {
    font-size: 13px;
    line-height: 35px;
  }

  &__switches {
    display: flex;
  }

  &__item {
    position: relative;
    display: block;
    flex-shrink: 0;
    width: 25px;
    font-size: 13px;
    line-height: 35px;
    color: $gray-dark-2;
    text-align: center;
    cursor: pointer;

    &--active {
      color: $black;
      cursor: default;
    }

    &:not(:last-of-type) {
      margin-right: 3px;

      &::after {
        position: absolute;
        top: calc(50% - 7.5px);
        right: -2px;
        width: 1px;
        height: 15px;
        content: '';
        background-color: $gray-dark-2;
      }
    }
  }

  &__icon {
    display: none;
  }

  @include media-breakpoint-down(lg) {
    &__title {
      display: none;
    }

    &__item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 35px;
      height: 35px;
      font-size: 0;
      line-height: 0;

      &--active {
        color: $primary;
      }

      &:not(:last-of-type) {
        margin-right: 14px;

        &::after {
          display: none;
        }
      }
    }

    &__icon {
      display: block;
      width: 24px;
      height: 24px;
    }
  }

  @include media-breakpoint-down(sm) {
    &__item {
      width: 20px;
      height: 20px;

      &:not(:last-of-type) {
        margin-right: 0;
      }
    }

    &__icon {
      width: 15px;
      height: 15px;
    }
  }
}
</style>
