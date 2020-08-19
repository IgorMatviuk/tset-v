<template>
  <div class="img-loader" :class="{ 'img-loader--negative': negative }">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    negative: {
      type: Boolean,
      default: () => false
    }
  }
}
</script>

<style lang="scss">
.img-loader {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #dedcdc;

  &--negative {
    z-index: -1;
  }
}
</style>
