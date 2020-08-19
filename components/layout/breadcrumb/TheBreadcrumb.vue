<template>
  <div
    class="breadcrumb-wrapper"
    :class="{ 'breadcrumb-wrapper--float': isFloat }"
  >
    <BContainer class="breadcrumb-wrapper__container">
      <BBreadcrumb>
        <BBreadcrumbItem
          v-for="(item, index) in items"
          :key="index"
          :active="index === items.length - 1"
          :to="item.href"
          :text="item.text"
        />
      </BBreadcrumb>
    </BContainer>
  </div>
</template>

<script>
export default {
  props: {
    isFloat: {
      type: Boolean,
      default: () => false
    },
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss">
.breadcrumb-wrapper {
  overflow: hidden;

  &--float {
    position: absolute;
    right: 0;
    left: 0;
    z-index: 1;
  }

  &:not(.breadcrumb-wrapper--float) &__container {
    position: relative;

    &::after,
    &::before {
      position: absolute;
      top: 0;
      bottom: 0;
      z-index: 1;
      width: 15px;
      content: '';
    }
    // stylelint-disable
    &::before {
      left: 0;
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 1) 33%,
        rgba(255, 255, 255, 0.7) 66%,
        rgba(255, 255, 255, 0) 100%
      );
    }

    &::after {
      right: 0;
      background: linear-gradient(
        to left,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 1) 33%,
        rgba(255, 255, 255, 0.7) 66%,
        rgba(255, 255, 255, 0) 100%
      );
    }
    // stylelint-enable
  }
}

.breadcrumb {
  flex-wrap: nowrap;
  height: 81.5px;
  padding-right: 15px;
  padding-bottom: 30px;
  padding-left: 15px;
  margin-right: -15px;
  margin-bottom: -30px;
  margin-left: -15px;
  overflow-x: auto;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
}

.breadcrumb-item {
  white-space: nowrap;

  a,
  span {
    white-space: nowrap;
  }

  &:not(.active) a {
    color: #c6c6c6;
    transition: color 0.3s;

    @include hover-focus-active() {
      color: $primary;
    }
  }

  & + .breadcrumb-item {
    &::before {
      color: #c6c6c6;
    }
  }

  &:last-of-type {
    padding-right: 15px;
  }
}
</style>
