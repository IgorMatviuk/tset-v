<template>
  <div
    :class="{ 'catalog-filter__column--grow': attribute.options.length > 8 }"
    class="catalog-filter__column"
  >
    <div class="catalog-filter__name">{{ attribute.name }}</div>
    <div class="catalog-filter__checkbox-group">
      <BFormCheckbox
        v-for="option in attribute.options"
        :key="option.id"
        v-model="selected"
        :value="option.slug"
        :name="attribute.code"
        class="catalog-filter__custom-checkbox"
      >
        {{ option.label }}
      </BFormCheckbox>
    </div>
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
.catalog-filter {
  flex-shrink: 0;

  &__name {
    margin-bottom: 15px;
    font-size: 13px;
    font-weight: 500;
    color: $text-color;
    text-transform: uppercase;
  }

  &__custom-checkbox {
    display: inline-block;
    min-width: 148px;

    &:not(:last-child) {
      margin-bottom: 7.8px;
    }
  }

  @include media-breakpoint-down(lg) {
    &__name {
      margin-bottom: 13px;
    }

    &__custom-checkbox {
      &:not(:last-of-type) {
        margin-bottom: 8px;
      }
    }
  }

  @include media-breakpoint-down(md) {
    &__column {
      flex-basis: 25%;
      margin-bottom: 30px;

      &--grow {
        flex-basis: 75%;
      }
    }

    &__custom-checkbox {
      min-width: 172px;
    }
  }

  @include media-breakpoint-up(xxl) {
    &__column {
      &:first-child {
        flex-basis: 165px;
        max-width: 165px;
      }

      &:nth-child(2) {
        flex-basis: 300px;
        max-width: 300px;
      }

      &:nth-child(n + 3) {
        flex-basis: 205px;
        max-width: 205px;
      }
    }
  }
}
</style>
