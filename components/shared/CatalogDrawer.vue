<template>
  <div
    :class="{ 'catalog-drawer--with-footer': $slots.controls }"
    class="catalog-drawer"
  >
    <div class="catalog-drawer__header">
      <button
        class="catalog-drawer__close"
        type="button"
        @click="closeCatalogDrawers()"
      >
        <svg-icon
          class="catalog-drawer__icon"
          name="cross"
          width="14"
          height="14"
        />
      </button>
      <slot name="heading"></slot>
    </div>
    <div class="catalog-drawer__content">
      <slot name="content"></slot>
    </div>
    <div class="catalog-drawer__footer">
      <slot name="controls"></slot>
    </div>
  </div>
</template>

<script>
import { mutationTypes } from '@/store/ui'

export default {
  methods: {
    closeCatalogDrawers() {
      this.$store.commit(
        `ui/${mutationTypes.SET_CATEGORIES_DRAWER_VISIBILITY_TOGGLE}`,
        false
      )

      this.$store.commit(
        `ui/${mutationTypes.SET_FILTERS_DRAWER_VISIBILITY_TOGGLE}`,
        false
      )
    }
  }
}
</script>

<style lang="scss">
.catalog-drawer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 12;
  width: 100%;
  height: 100%;
  padding-top: 51px;
  padding-bottom: 25px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  background-color: $white;

  &--with-footer {
    padding-bottom: 85px;
  }

  &__header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    height: 51px;
    padding-right: 15px;
    padding-left: 3px;
    font-size: 12px;
    font-weight: 500;
    line-height: 20px;
    text-transform: uppercase;
    background-color: $white;
    border-bottom: 2px solid $light-1;
  }

  &__close {
    @include reset-button-styles();

    width: 40px;
    height: 40px;
  }

  &__icon {
    width: 14px;
    height: 14px;
    color: $gray-dark-2;
  }

  &__content {
    padding-right: 15px;
    padding-left: 15px;
  }

  &__footer {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    display: none;
    align-items: center;
    justify-content: space-between;
    padding: 18px 15px;
    padding-right: 23px;
    padding-bottom: calc(18px + env(safe-area-inset-bottom));
    background-color: $white;
  }

  &--with-footer &__footer {
    display: flex;
  }
}
</style>
