<template>
  <div class="swiper-pagination"></div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.swiper-pagination.swiper-pagination-lock {
  display: none;
}

.swiper-pagination-bullet {
  width: 12px;
  height: 12px;
  background-color: $gray;
  opacity: 1;

  @include hover-focus-active() {
    outline: none;
    box-shadow: none;
  }
}

.swiper-pagination-bullet-active {
  background-color: $primary;
}

@include media-breakpoint-down(md) {
  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
  }
}
</style>
