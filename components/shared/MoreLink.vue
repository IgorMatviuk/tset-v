<template>
  <NuxtLink
    :to="$i18n.path(`${url}`)"
    :class="{ 'more-link--is-black': isBlack }"
    class="more-link"
  >
    <slot></slot>
    <svg-icon name="caret" class="more-link__icon" width="11" height="9" />
  </NuxtLink>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    },
    isBlack: {
      type: Boolean,
      default: () => false
    }
  }
}
</script>

<style lang="scss">
.more-link {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 14px;
  line-height: 1.285;
  color: $primary-dark-1;

  &--is-black {
    color: $black;
  }

  &--is-black &__icon {
    margin-left: 6px;
  }

  @include hover-focus-active() {
    color: $primary-dark-1;
    text-decoration: none;
  }

  &__icon {
    margin-left: -2px;
  }

  @include media-breakpoint-down(sm) {
    &__icon {
      margin-left: 0;
    }
  }
}
</style>
