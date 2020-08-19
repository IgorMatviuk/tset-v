<template>
  <div
    :class="{
      'ratings--primary': variant === 'primary',
      'ratings--light': variant === 'light',
      'ratings--static': isStatic
    }"
    class="ratings"
  >
    <template v-if="isStatic">
      <RatingsStarSvg
        v-for="(item, index) in ratingsLength"
        :key="index"
        :class="{ 'ratings__item--active': item <= value }"
        class="ratings__item"
      />
    </template>
    <template v-if="!isStatic">
      <label
        v-for="(item, index) in ratingsLength"
        :key="index"
        :class="{
          'ratings__item--active': Number(item) <= Number(value.$model)
        }"
        class="ratings__item"
      >
        <input
          v-model="value.$model"
          class="ratings__control"
          type="radio"
          :value="item"
          name="ratings"
        />
        <RatingsStarSvg />
      </label>
    </template>
  </div>
</template>

<script>
import RatingsStarSvg from '@/components/shared/RatingsStarSvg'

export default {
  components: {
    RatingsStarSvg
  },
  props: {
    isStatic: {
      type: Boolean,
      default: () => true
    },
    value: {
      type: undefined,
      default: () => undefined
    },
    variant: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      ratingsLength: [5, 4, 3, 2, 1]
    }
  }
}
</script>

<style lang="scss">
.ratings {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;

  &__item,
  &__item svg {
    width: 12px;
    height: 12px;
    transition: fill 0.1s, stroke 0.1s;

    &:not(:first-of-type) {
      margin-right: 2.5px;
    }
  }

  &__control {
    display: none;
  }

  &--light &__item {
    fill: rgba($color: $white, $alpha: 0);
    stroke: $white;

    &:not(:first-of-type) {
      margin-right: 1.5px;
    }
  }

  &--light &__item--active {
    fill: $white;
  }

  // stylelint-disable
  &--light:not(.ratings--static) &__item:hover,
  &--light:not(.ratings--static) &__item:hover ~ &__item {
    // stylelint-enable
    cursor: pointer;
    fill: $white;
  }

  &--primary &__item {
    fill: rgba($color: $primary, $alpha: 0);
    stroke: $gray-light-1;
  }

  &--primary &__item--active {
    fill: $primary;
    stroke: $primary;
  }

  // stylelint-disable
  &--primary:not(.ratings--static) &__item:hover,
  &--primary:not(.ratings--static) &__item:hover ~ &__item {
    // stylelint-enable
    cursor: pointer;
    fill: $primary;
    stroke: $primary;
  }

  @include media-breakpoint-up(md) {
    &--light &__item,
    &--light &__item svg {
      width: 14px;
      height: 14px;
    }
  }

  @include media-breakpoint-up(xl) {
    &--light &__item,
    &--light &__item svg {
      width: 18px;
      height: 18px;
    }
  }
}
</style>
