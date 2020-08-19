<template>
  <div class="product-preview__colors">
    <div
      v-for="color in options.items"
      :key="color.id"
      :class="{
        'product-preview__color--active': active
          ? active.id === color.id
          : initial.id === color.id
      }"
      class="product-preview__color"
      @click="onColorOptionClick(color)"
    >
      <div
        :style="{ backgroundColor: color.swatch_value }"
        class="product-preview__color-value"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      required: true
    },
    active: {
      type: Object,
      default: () => null
    },
    initial: {
      type: Object,
      required: true
    }
  },
  methods: {
    onColorOptionClick(option) {
      this.$emit('selected', { option, attributeId: this.options.attribute })
    }
  }
}
</script>

<style lang="scss">
.product-preview {
  &__colors {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    margin-bottom: 19px;
  }

  &__color {
    padding: 7px;
    cursor: pointer;
  }

  &__color--active &__color-value {
    &::before {
      position: absolute;
      top: -4px;
      left: -4px;
      width: 18px;
      height: 18px;
      content: '';
      border: 1px solid $black;
    }
  }

  &__color-value {
    position: relative;
    width: 12px;
    height: 12px;
    border: 1px solid rgba($color: $black, $alpha: 0.1);
  }

  @include media-breakpoint-up(md) {
    &__colors {
      margin-bottom: 14px;
    }
  }

  @include media-breakpoint-up(xl) {
    &__color--active &__color-value {
      &::before {
        top: -3px;
        left: -3px;
        width: 14px;
        height: 14px;
      }
    }

    &__color-value {
      width: 10px;
      height: 10px;
    }

    &__colors {
      margin-bottom: 10px;
    }
  }

  @include media-breakpoint-up(xxl) {
    &__colors {
      margin-bottom: 15px;
    }
  }
}
</style>
