<template>
  <div class="site-nav">
    <div class="site-nav__body">
      <TheSiteNavSlider class="site-nav__slider" />
      <TheSiteNavBlockRegular class="site-nav__block-regular" />
    </div>
  </div>
</template>

<script>
import TheSiteNavSlider from './TheSiteNavSlider'
import TheSiteNavBlockRegular from './TheSiteNavBlockRegular'

export default {
  components: {
    TheSiteNavSlider,
    TheSiteNavBlockRegular
  }
}
</script>

<style lang="scss">
.site-nav {
  $border-color: #e7e7e7;

  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  min-height: 100vh;
  min-height: -webkit-fill-available;
  padding-top: 50px;
  background-color: $white;
  border-top: 1px solid $border-color;

  &__block-regular {
    display: none;
  }

  @include media-breakpoint-up(md) {
    padding-top: 60px;
  }

  @include media-breakpoint-up(lg) {
    position: absolute;
    top: 100%;
    bottom: unset;
    padding-top: 30px;
    padding-bottom: 30px;
    border-top: none;
    box-shadow: 2px 2px 12px rgba(41, 54, 136, 0.1);

    &__slider {
      display: none;
    }

    &__block-regular {
      display: block;
    }
  }
}
</style>
