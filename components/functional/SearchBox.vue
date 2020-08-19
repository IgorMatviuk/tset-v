<template>
  <BForm class="search-box" @submit.prevent="onSubmit">
    <label v-if="withLabel" for="search" class="search-box__label">
      {{ $t('searchPage.lookingForSomething') }}
    </label>
    <div class="search-box__field-wrapper">
      <BFormInput
        id="search"
        v-model="query"
        class="search-box__field"
        type="text"
        autocomplete="off"
        :placeholder="$t('searchPage.placeholder')"
      />
      <button
        type="submit"
        :class="{ 'search-box__btn-search--active': allowSubmission }"
        class="search-box__btn-search"
      >
        <svg-icon name="search" class="search-box__icon" />
      </button>
    </div>
  </BForm>
</template>

<script>
export default {
  props: {
    initialValue: {
      type: String,
      default: () => ''
    },
    withLabel: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      query: this.initialValue
    }
  },
  computed: {
    allowSubmission() {
      return this.query.length >= 3
    }
  },
  methods: {
    onSubmit() {
      if (this.allowSubmission) {
        const searchRoutePath = this.$i18n.path(`search?q=${this.query}`)
        this.$router.push(searchRoutePath)
      }
    }
  }
}
</script>

<style lang="scss">
.search-box {
  &__label {
    font-size: 14px;
    font-weight: 300;
    text-transform: uppercase;
  }

  &__field-wrapper {
    position: relative;
  }

  &__field {
    width: 100%;
  }

  &__btn-search {
    position: absolute;
    top: 50%;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    margin-top: -22px;
    background: none;
    border: 1px solid transparent;
    border-radius: 50%;
    transition: border-color 0.3s;

    &--active {
      cursor: pointer;
    }
  }

  &__btn-search--active &__icon {
    color: $primary;
  }

  &__icon {
    width: 14px;
    height: 14px;
    transition: color 0.3s;
  }
}
</style>
