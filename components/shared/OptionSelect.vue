<template>
  <div
    :id="id"
    :class="{ 'options-select--active': isVisible }"
    class="options-select"
  >
    <div
      :class="{
        'options-select__active-option--color': attributeCode === 'color',
        'options-select__active-option--size': attributeCode === 'size'
      }"
      class="options-select__active-option"
      @click="toggleVisibility"
    >
      {{ activeOption.label }}
      <svg-icon
        name="chevron"
        class="options-select__icon"
        width="10"
        height="10"
      />
    </div>
    <BPopover :show.sync="isVisible" :target="id" placement="bottom">
      <div class="options-select__popover">
        <div
          v-for="option in options"
          :key="option.id"
          :class="{
            'options-select__option--color': attributeCode === 'color',
            'options-select__option--size': attributeCode === 'size',
            'options-select__option--active': option.id === activeOption.id,
            'options-select__option--disabled': option.disabled
          }"
          class="options-select__option"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </div>
      </div>
    </BPopover>
  </div>
</template>

<script>
export default {
  props: {
    attributeId: {
      type: Number,
      required: true
    },
    attributeCode: {
      type: String,
      required: true
    },
    activeOption: {
      type: Object,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
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
    toggleVisibility() {
      this.isVisible = !this.isVisible
    },
    hideOnOutSideClick() {
      if (this.isVisible) {
        this.isVisible = false
      }
    },
    selectOption(option) {
      this.$emit('change', {
        attributeId: this.attributeId,
        attributeCode: this.attributeCode,
        option
      })
    }
  }
}
</script>

<style lang="scss">
.options-select {
  &--active &__icon {
    transform: rotate(180deg);
  }

  &__icon {
    width: 10px;
    height: 10px;
    margin-bottom: 1px;
    color: $gray-dark-1;
    transition: transform 0.3s;
  }

  &__popover {
    padding: 6px 0;
  }

  &__active-option,
  &__option {
    font-size: 14px;
    line-height: 18px;
    cursor: pointer;

    &--color {
      color: $text-color;
    }

    &--size {
      color: $primary;
    }
  }

  &__option {
    padding: 0 13px;
    font-size: 12px;
    line-height: 1.5;
    cursor: pointer;
    transition: color 0.3s;

    &--size {
      color: $text-color;
    }

    &--active {
      color: $primary;
      pointer-events: none;
      cursor: default;
    }

    &--disabled {
      pointer-events: none;
      opacity: 0.5;
    }

    &:hover {
      color: darken($primary, 15%);
    }
  }

  @include media-breakpoint-down(lg) {
    &__active-option {
      font-size: 12px;
      line-height: 15px;
    }
  }
}
</style>
