<template>
  <div class="collapse-info">
    <button
      :aria-expanded="isVisible ? 'true' : 'false'"
      :class="{ 'collapse-info__title--active': isVisible }"
      class="collapse-info__title"
      @click="isVisible = !isVisible"
    >
      <slot name="title"></slot>
      <svg-icon
        class="collapse-info__icon"
        name="chevron"
        width="10"
        height="10"
      />
    </button>
    <BCollapse v-model="isVisible" accordion="collapseInfoAccordion">
      <div class="collapse-info__content">
        <div v-if="$slots.text" class="collapse-info__text">
          <slot name="text"></slot>
        </div>
        <div v-else-if="$slots.reviews" class="collapse-info__reviews">
          <slot name="reviews"></slot>
        </div>
      </div>
    </BCollapse>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false
    }
  }
}
</script>

<style lang="scss">
.collapse-info {
  border-bottom: 1px solid $light-1;

  &__title {
    @include reset-button-styles();

    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-left: 2px;
    font-size: 12px;
    font-weight: 300;
    line-height: 40px;
    text-align: left;
    text-transform: uppercase;
  }

  &__title--active &__icon {
    transform: rotate(0);
  }

  &__icon {
    width: 10px;
    height: 10px;
    transition: transform 0.3s;
    transform: rotate(-90deg);
  }

  &__content {
    padding-bottom: 18px;
  }

  &__text {
    font-size: 13px;
    font-weight: 300;
    line-height: 16px;
  }

  &__reviews {
    padding-top: 17px;
    padding-bottom: 12px;
  }

  @include media-breakpoint-down(lg) {
    &__title {
      padding-left: 0;
    }

    &__text {
      font-size: 11px;
      line-height: 14px;
    }
  }

  @include media-breakpoint-down(sm) {
    &__title {
      font-size: 10px;
      line-height: 37.5px;
    }

    &__content {
      padding-bottom: 12px;
    }
  }
}
</style>
