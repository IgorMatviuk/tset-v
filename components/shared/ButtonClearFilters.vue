<template>
  <div class="btn-clear-filters" @click="onClearFilterClick">
    <span>{{ $t('catalogPage.filter.clear') }}</span>
    <svg-icon name="cross" class="btn-clear-filters__icon-close" />
  </div>
</template>

<script>
export default {
  methods: {
    onClearFilterClick() {
      this.$emit('clear-filters')
    }
  }
}
</script>

<style lang="scss">
.btn-clear-filters {
  font-size: 13px;
  font-weight: 500;
  color: $text-color;

  &:hover {
    cursor: pointer;
  }

  &__icon-close {
    width: 10px;
    height: 10px;
    margin-left: 6px;
  }
}
</style>
