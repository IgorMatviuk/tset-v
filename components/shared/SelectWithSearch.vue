<template>
  <!-- TODO: select validation -->
  <div class="search-select">
    <BFormInput
      :id="fieldId"
      v-model="selectedOutput"
      :class="{ 'search-select__input--active': isVisible }"
      class="checkout-info__input search-select__input"
      type="text"
      :trim="true"
      :readonly="true"
      :placeholder="placeholder"
      @click="activateDropdown"
    />
    <svg-icon
      name="chevron"
      :class="{ 'search-select__chevron--active': isVisible }"
      class="search-select__chevron"
      widht="10"
      height="10"
    />
    <div
      :class="{ 'search-select__dropdown--active': isVisible }"
      class="search-select__dropdown"
    >
      <div class="search-select__group">
        <svg-icon
          class="search-select__icon"
          name="search"
          width="15"
          height="15"
        />
        <BFormInput
          ref="searchInput"
          v-model="search"
          class="search-select__input search-select__input--search"
          type="text"
          :trim="true"
          @blur="blurSearchField"
        />
      </div>
      <client-only>
        <PerfectScrollbar ref="scrollContainer" class="search-select__options">
          <div
            v-for="(option, index) in filteredOptions"
            :key="index"
            :class="{
              'search-select__option--active':
                value.$model === option[assignField]
            }"
            class="search-select__option"
            @mousedown="setActiveOption(option)"
          >
            {{ option[optionField] }}
          </div>
        </PerfectScrollbar>
      </client-only>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fieldId: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    optionField: {
      type: String,
      required: true
    },
    assignField: {
      type: String,
      required: true
    },
    value: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isVisible: false,
      search: '',
      selectedOutput: ''
    }
  },
  computed: {
    filteredOptions() {
      const term = this.search.trim()

      /* istanbul ignore else */
      if (term) {
        return this.options.filter((option) => {
          const value = option[this.optionField]
          return value.toLowerCase().includes(this.search.toLowerCase())
        })
      }

      return this.options
    }
  },
  updated() {
    /* istanbul ignore else */
    if (!this.value.$model && this.selectedOutput) {
      this.selectedOutput = ''
    }
  },
  methods: {
    setActiveOption(option) {
      /* istanbul ignore else */
      if (this.value.$model !== option[this.assignField]) {
        this.selectedOutput = option[this.optionField]
        this.value.$model = option[this.assignField]
        this.isVisible = false
        this.$emit('selected', option)
      }
    },
    activateDropdown() {
      /* istanbul ignore else */
      if (!this.isVisible) {
        this.isVisible = true

        this.$nextTick(() => {
          this.$refs.searchInput.focus()

          if (!this.value.$model) {
            this.$refs.scrollContainer.$el.scrollTop = 0
          }
        })

        document.addEventListener('click', this.deactivateDropdown)
      }
    },
    deactivateDropdown(event) {
      const isOutsideClick = !this.$el.contains(event.target)

      /* istanbul ignore else */
      if (isOutsideClick) {
        this.isVisible = false
        document.removeEventListener('click', this.deactivateDropdown)
      }
    },
    blurSearchField() {
      // FIXME: fix timeOut
      setTimeout(() => (this.isVisible = false), 200)
    }
  }
}
</script>

<style lang="scss">
.search-select {
  position: relative;

  &__chevron {
    position: absolute;
    top: calc(50% - 5px);
    right: 0;
    width: 10px;
    height: 10px;
    transition: transform 0.3s;

    &--active {
      transform: rotate(180deg);
    }
  }

  &__dropdown {
    position: absolute;
    top: 135%;
    right: 0;
    left: 0;
    z-index: 1;
    display: none;
    padding: 15px 25px;
    background: $white;
    border-radius: 2px;
    box-shadow: 10px 10px 30px rgba($color: $black, $alpha: 0.12);
    opacity: 0;

    &--active {
      display: block;
      opacity: 1;
    }
  }

  &__group {
    position: relative;
    margin-bottom: 19px;
  }

  &__icon {
    position: absolute;
    top: calc(50% - 7.5px);
    width: 15px;
    height: 15px;
  }

  &__input {
    padding-right: 15px;
    cursor: pointer;

    &--active {
      border-color: $primary;
    }

    &--search {
      padding-left: 25px;
      cursor: unset;
    }
  }

  &__options {
    max-height: 350px;
    padding-right: 22px;
    overflow: auto;
  }

  &__option {
    padding-bottom: 10px;
    margin-bottom: 19px;
    font-size: 13px;
    font-weight: 500;
    line-height: 16px;
    color: $input-color;
    letter-spacing: 0.05em;
    cursor: pointer;
    border-bottom: 1px solid $gray;
    transition: color 0.3s;

    @include hover-focus-active() {
      color: $primary;
    }

    &--active {
      color: $primary;
      cursor: default;
    }
  }
}
</style>
