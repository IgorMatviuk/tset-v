<template>
  <div
    :class="arrowType === 'next' ? 'swiper-button-next' : 'swiper-button-prev'"
  >
    <svg-icon
      :class="
        arrowType === 'next'
          ? 'swiper-button-next-icon'
          : 'swiper-button-prev-icon'
      "
      name="arrow"
      width="30"
      height="9"
    />
  </div>
</template>

<script>
export default {
  props: {
    arrowType: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
.swiper-button-prev,
.swiper-button-next {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;

  &::after {
    content: none;
  }

  @include hover-focus-active {
    outline: none;
    box-shadow: none;
  }

  &.swiper-button-disabled {
    cursor: not-allowed;
    opacity: 1;

    .swiper-button-next-icon,
    .swiper-button-prev-icon {
      color: $gray;
    }
  }

  &.swiper-button-lock {
    display: none;
  }
}

.swiper-button-prev {
  left: 0;
}

.swiper-button-next {
  right: 0;
  left: initial;
}

.swiper-button-next-icon,
.swiper-button-prev-icon {
  color: $black;
}

.swiper-button-prev-icon {
  transform: rotate(180deg);
}
</style>
