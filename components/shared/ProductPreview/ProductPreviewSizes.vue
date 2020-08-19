<template>
  <div class="product-preview__sizes">
    <div class="product-preview__size-title">выберете размер</div>
    <div class="product-preview__size-wrapper">
      <div
        v-for="size in options.items"
        :key="size.id"
        class="product-preview__btn-size"
        @click="onSizeOptionClick(size)"
      >
        {{ size.label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  methods: {
    onSizeOptionClick(option) {
      this.$emit('selected', { option, attributeId: this.options.attribute })
    }
  }
}
</script>

<style lang="scss">
.product-preview {
  &__sizes {
    position: absolute;
    bottom: 35px;
    left: 50%;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(100% - 20px);
    padding: 5px;
    color: $white;
    background-color: rgba(0, 0, 0, 0.2);
    border: 1px solid $white;
    border-radius: $border-radius;
    transition: transform 0.5s, opacity 0.5s;
    transform: translate(-50%, 25px);
  }

  &__size-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }

  &__size-title {
    font-size: 12px;
  }

  &__btn-size {
    display: block;
    width: 25px;
    height: 25px;
    font-size: 13px;
    line-height: 25px;
    text-align: center;
    cursor: pointer;
    border-radius: 2px;
    transition: background-color 0.5s, color 0.5s;

    &:not(:last-child) {
      margin-right: 5px;
    }

    &:hover {
      color: $black;
      background-color: $white;
    }
  }

  @include media-breakpoint-down(sm) {
    &__sizes {
      min-width: 90%;
    }
  }

  @include media-breakpoint-up(md) {
    &__sizes {
      max-width: 190px;
    }
  }

  @include media-breakpoint-up(xl) {
    &:hover &__sizes {
      opacity: 1;
      transform: translate(-50%, 0);
    }

    &__sizes {
      bottom: 20px;
      max-width: 210px;
      opacity: 0;
    }

    &__size-wrapper {
      margin-top: 5px;
    }

    &__btn-size {
      font-size: 15px;
    }
  }
}
</style>
