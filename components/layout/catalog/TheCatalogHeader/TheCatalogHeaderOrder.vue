<template>
  <div
    id="orderListSync"
    :class="[{ 'catalog-order--active': isVisible }, 'catalog-order']"
    @click="toggleVisibility"
  >
    <div class="catalog-order__active-sort">
      {{ activeOrder.title }}
      <svg-icon name="chevron" class="catalog-order__icon" />
    </div>
    <BPopover :show.sync="isVisible" target="orderListSync" placement="bottom">
      <div class="catalog-order-popover">
        <div
          v-for="(item, index) in orderList"
          :key="index"
          class="catalog-order-popover__item"
        >
          <div
            :class="{
              'catalog-order-popover__link--active': item.type === order
            }"
            class="catalog-order-popover__link"
            @click="toggleOrder(item.type)"
          >
            {{ item.title }}
          </div>
        </div>
      </div>
    </BPopover>
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
  },
  mounted() {
    document.addEventListener('mouseup', this.hideOnOutSideClick)
  },
  beforeDestroy() {
    document.removeEventListener('mouseup', this.hideOnOutSideClick)
  },
  methods: {
    hideOnOutSideClick() {
      if (this.isVisible) {
        this.isVisible = false
      }
    }
  }
}
</script>

<style lang="scss">
.catalog-order {
  &__active-sort {
    font-size: 13px;
    line-height: 35px;
    cursor: pointer;
  }

  &--active &__icon {
    transform: rotate(180deg);
  }

  &__icon {
    width: 10px;
    height: 10px;
    transition: transform 0.3s;
  }

  @include media-breakpoint-down(lg) {
    &__active-sort {
      color: $text-color;
    }
  }
}

.catalog-order-popover {
  padding-top: 6px;
  padding-right: 13px;
  padding-bottom: 6px;
  padding-left: 20px;

  &__item {
    display: block;
  }

  &__link {
    font-size: 12px;
    line-height: 25px;
    cursor: pointer;
    transition: color 0.3s;

    &--active {
      color: $primary;
      cursor: default;
    }

    &:hover {
      color: darken($primary, 15%);
    }
  }
}
</style>
