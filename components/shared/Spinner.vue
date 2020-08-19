<template>
  <span :class="`is-${size} is-${color}`" class="spinner">
    <span class="spinner__circle"></span>
  </span>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: () => 'small'
    },
    color: {
      type: String,
      default: () => 'white'
    }
  }
}
</script>

<style lang="scss">
.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  transform: translate(-50%, -50%);

  &.is-small &__circle {
    width: 20px;
    height: 20px;
    border-width: 2px;
  }

  &.is-medium &__circle {
    width: 30px;
    height: 30px;
    border-width: 3px;
  }

  &.is-white &__circle {
    border-color: rgba($white, 0.25);
    border-top-color: rgba($white, 1);
  }

  &.is-black &__circle {
    border-color: rgba($black, 0.25);
    border-top-color: rgba($black, 1);
  }

  &__circle {
    display: block;
    border-style: solid;
    border-radius: 50%;
    animation: spinnerRotation 0.6s infinite linear;

    @keyframes spinnerRotation {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(359deg);
      }
    }
  }
}
</style>
