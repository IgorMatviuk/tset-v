<template>
  <div class="filter-column">
    <BFormCheckbox
      v-for="option in attribute.options"
      :key="option.id"
      v-model="selected"
      :value="option.slug"
      :name="attribute.code"
      class="filter-column__custom-checkbox"
    >
      {{ option.label }}
    </BFormCheckbox>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    attribute: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selected: []
    }
  },
  computed: {
    ...mapState({
      filters: (state) => state.catalog.filters
    })
  },
  watch: {
    selected: 'onOptionToggle',
    filters: 'onFiltersUpdate'
  },
  created() {
    /* istanbul ignore else */
    if (this.filters.length) {
      const selected = this.$store.getters['catalog/selectedAttributeOptions'](
        this.attribute.code
      )

      /* istanbul ignore else */
      if (selected) {
        this.selected = selected
      }
    }
  },
  methods: {
    onOptionToggle(selectedOptions) {
      this.$emit('toggle-filters-application', selectedOptions.length > 0)
    },
    onFiltersUpdate(nextValue) {
      /* istanbul ignore else */
      if (!nextValue.length) {
        this.selected = []
      }
    }
  }
}
</script>

<style lang="scss">
.filter-column {
  padding-top: 1px;

  &__custom-checkbox {
    padding-right: 1.7rem;
    padding-left: 0;
    border-bottom: 1px solid $light-3;

    .custom-control-label {
      font-size: 12px;
      line-height: 49px;

      &::after,
      &::before {
        top: 50%;
        right: -1.7rem;
        left: unset;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
