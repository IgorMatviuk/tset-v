<template>
  <div class="section-header">
    <div class="section-header__title">
      <slot name="title"></slot>
    </div>
    <div class="section-header__navigation">
      <slot name="navigation"></slot>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
  padding-bottom: 20px;

  &__title {
    font-size: 18px;
    font-weight: 400;
    line-height: 1.2;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  @include media-breakpoint-down(xl) {
    padding-top: 14px;
    padding-bottom: 14px;
  }

  @include media-breakpoint-down(lg) {
    padding-top: 9px;
    padding-bottom: 9px;
  }

  @include media-breakpoint-down(sm) {
    padding-top: 13px;
    padding-bottom: 13px;

    &__title {
      font-size: 16px;
    }
  }
}
</style>
