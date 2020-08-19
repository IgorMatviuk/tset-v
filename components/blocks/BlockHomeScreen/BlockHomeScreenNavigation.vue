<template>
  <div class="home-screen__navigation">
    <button class="home-screen__btn-nav home-screen__btn-nav--prev">
      <svg-icon
        name="arrow"
        class="home-screen__arrow home-screen__arrow--left"
      />
    </button>
    <button class="home-screen__btn-nav home-screen__btn-nav--next">
      <svg-icon name="arrow" class="home-screen__arrow" />
    </button>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.home-screen {
  &__navigation {
    position: absolute;
    top: calc(30% + 230px);
    left: 15px;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 180px;
    opacity: 0;
  }

  &__btn-nav {
    padding: 0;
    background: none;

    &,
    &:active,
    &:focus {
      border: none;
      outline: none;
      box-shadow: none;
    }
  }

  &__btn-nav &__arrow {
    color: $primary;
  }

  &__btn-nav--disabled &__arrow {
    opacity: 0.5;
  }

  @include media-breakpoint-up(md) {
    &__navigation {
      top: calc(18% + 370px);
      left: 50px;
    }
  }

  @include media-breakpoint-up(lg) {
    &__navigation {
      top: calc(22% + 300px);
      left: 50%;
    }
  }

  @include media-breakpoint-up(xl) {
    &__navigation {
      top: calc(20% + 300px);
      width: 470px;
    }
  }

  @include media-breakpoint-up(xxl) {
    &__navigation {
      top: 65%;
      left: 602px;
      width: 510px;
    }
  }
}
</style>
