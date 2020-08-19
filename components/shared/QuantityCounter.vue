<template>
  <div class="counter">
    <button
      class="counter__toggle counter__toggle--decrease"
      type="button"
      @click="decreaseValue"
    >
      <svg-icon name="minus" class="counter__icon" height="1" width="17" />
    </button>
    <input v-model="counterValue" class="counter__input" type="text" />
    <button
      class="counter__toggle counter__toggle--increase"
      type="button"
      @click="increaseValue"
    >
      <svg-icon name="plus" class="counter__icon" height="17" width="17" />
    </button>
  </div>
</template>

<script>
import _debounce from 'lodash.debounce'

import { PRODUCT_MAX_QTY } from '@/utils/constants'

export default {
  props: {
    count: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      counterValue: null
    }
  },
  watch: {
    count: {
      handler(newValue, oldValue) {
        /* istanbul ignore else */
        if (newValue !== oldValue) {
          this.counterValue = newValue
        }
      },
      immediate: true
    },
    counterValue: _debounce(function(newValue, oldValue) {
      const isEqual = newValue === oldValue
      const isEdges = newValue === PRODUCT_MAX_QTY || newValue === 1

      if (!isEqual && !isEdges) {
        const parsedValue = parseInt(newValue)
        const isNumber = !isNaN(parsedValue)

        let normilizedValue

        if (isNumber) {
          if (parsedValue > PRODUCT_MAX_QTY) {
            normilizedValue = PRODUCT_MAX_QTY
          } else if (parsedValue > 0) {
            normilizedValue = parsedValue
          } else {
            normilizedValue = 1
          }
        } else {
          normilizedValue = 1
        }

        this.counterValue = normilizedValue
        this.onCounterValueUpdate()
      }
    }, 300)
  },
  methods: {
    decreaseValue() {
      if (this.counterValue > 1) {
        this.counterValue = Number(this.counterValue) - 1
      }
    },
    increaseValue() {
      this.counterValue = Number(this.counterValue) + 1
    },
    onCounterValueUpdate() {
      this.$emit('change', this.counterValue)
    }
  }
}
</script>

<style lang="scss">
.counter {
  display: flex;

  &__input {
    width: 52px;
    height: 27px;
    padding-right: 5px;
    padding-left: 5px;
    font-size: 14px;
    font-weight: 500;
    color: $black;
    text-align: center;
    border: 1px solid $gray;
    border-radius: 4px;
    transition: border-color 0.3s;

    &:focus,
    &:active {
      border-color: $primary;
      outline: none;
      box-shadow: none;
    }
  }

  &__toggle {
    @include reset-button-styles();

    display: flex;
    align-items: center;
    justify-content: center;
    width: 27px;
    height: 27px;

    &--decrease {
      justify-content: flex-start;
    }

    &--increase {
      justify-content: flex-end;
    }
  }

  &__toggle:hover &__icon,
  &__toggle:focus &__icon,
  &__toggle:active &__icon {
    color: $primary;
  }

  &__icon {
    width: 17px;
    height: 17px;
    color: $text-color;
    transition: color 0.3s;
  }

  @include media-breakpoint-down(sm) {
    &__toggle {
      width: 22px;
      height: 22px;
    }

    &__input {
      width: 42px;
      height: 22px;
    }
  }
}
</style>
