<template>
  <div class="filter-box">
    <button
      :class="{ 'filter-box__title--active': isVisible }"
      class="filter-box__title"
      :aria-expanded="isVisible ? 'true' : 'false'"
      type="button"
      @click="toggleVisibility"
    >
      {{ label }}
      <svg-icon
        class="filter-box__icon"
        name="chevron"
        width="10"
        height="10"
      />
    </button>
    <BCollapse v-model="isVisible" accordion="collapseMobileFilter">
      <div class="filter-box__collapse">
        <slot name="filter-column"></slot>
      </div>
    </BCollapse>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isVisible: false
    }
  },
  methods: {
    toggleVisibility() {
      this.isVisible = !this.isVisible
    }
  }
}
</script>

<style lang="scss">
.filter-box {
  &__title {
    @include reset-button-styles();

    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-size: 12px;
    line-height: 49px;
    color: $input-color;
    letter-spacing: 0.05em;
    border-bottom: 1px solid $light-1;
  }

  &__title--active &__icon {
    transform: rotate(180deg);
  }

  &__icon {
    width: 10px;
    height: 10px;
    margin-right: 2px;
    transition: transform 0.3s;
  }

  &__collapse {
    padding-left: 7px;
  }
}
</style>
