<template>
  <div class="filter-sorting">
    <button
      :class="{ 'filter-sorting__title--active': isVisible }"
      class="filter-sorting__title"
      :aria-expanded="isVisible ? 'true' : 'false'"
      type="button"
      @click="toggleVisibility"
    >
      Упорядочить
      <svg-icon
        class="filter-sorting__icon"
        name="chevron"
        width="10"
        height="10"
      />
    </button>
    <BCollapse v-model="isVisible" accordion="collapseMobileFilter">
      <div class="filter-sorting__collapse">
        <div
          v-for="(item, index) in orderList"
          :key="index"
          :class="{
            'filter-sorting__link--active': item.type === order
          }"
          class="filter-sorting__link"
          @click="toggleOrder(item.type)"
        >
          {{ item.title }}
        </div>
      </div>
    </BCollapse>
  </div>
</template>

<script>
import catalogOrderChange from '@/mixins/catalog-order-change'

export default {
  mixins: [catalogOrderChange],
  data() {
    return {
      isVisible: false
    }
  }
}
</script>

<style lang="scss">
.filter-sorting {
  &__title {
    @include reset-button-styles();

    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-size: 12px;
    line-height: 49px;
    color: $input-color;
    letter-spacing: 0.05em;
    border-bottom: 1px solid $light-1;
  }

  &__title--active &__icon {
    transform: rotate(180deg);
  }

  &__icon {
    width: 10px;
    height: 10px;
    margin-right: 2px;
    transition: transform 0.3s;
  }

  &__collapse {
    padding-left: 7px;
  }

  &__link {
    font-size: 12px;
    line-height: 32px;
    border-bottom: 1px solid $light-3;
    transition: color 0.3s;

    &--active {
      color: $primary;
    }
  }
}
</style>
