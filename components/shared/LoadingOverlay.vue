<template>
  <div class="loading-overlay">
    <Spinner size="medium" color="black" />
  </div>
</template>

<script>
import Spinner from './Spinner'

export default {
  components: {
    Spinner
  }
}
</script>

<style lang="scss">
.loading-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.5);
}
</style>
