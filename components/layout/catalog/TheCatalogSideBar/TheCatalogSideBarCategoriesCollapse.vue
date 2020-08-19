<template>
  <div class="category-collapse">
    <button
      :class="[
        { 'category-collapse__title--active': isVisible },
        'category-collapse__title'
      ]"
      type="button"
      @click="onCollapseToggle"
    >
      {{ category.name }}
      <svg-icon
        class="category-collapse__icon"
        name="chevron"
        width="10"
        height="10"
      />
    </button>
    <BCollapse v-model="isVisible">
      <ul class="category-collapse__list">
        <li
          v-for="(subcategory, index) in category.categories"
          :key="index"
          class="category-collapse__list-item"
        >
          <NuxtLink
            :to="getCategoryPath(subcategory)"
            :class="{
              'category-collapse__link--active': getLinkIsActive(subcategory)
            }"
            class="category-collapse__link"
          >
            {{ subcategory.name }}
          </NuxtLink>
        </li>
      </ul>
    </BCollapse>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isVisible: false
    }
  },
  computed: {
    ...mapState({
      activeCategory: (state) => state.catalog.activeCategory
    })
  },
  created() {
    if (this.category && this.$route.fullPath.includes(this.category.slug)) {
      this.isVisible = true
    }
  },
  methods: {
    onCollapseToggle() {
      this.isVisible = !this.isVisible
    },
    getCategoryPath(childCategory) {
      if (this.category.slug === childCategory.slug) {
        return this.$i18n.path(this.category.slug)
      }

      return this.$i18n.path(`${this.category.slug}/${childCategory.slug}`)
    },
    getLinkIsActive(category) {
      return this.activeCategory && category.slug === this.activeCategory.slug
    }
  }
}
</script>

<style lang="scss">
.category-collapse {
  &__title {
    @include reset-button-styles();

    font-size: 16px;
    line-height: 45px;
    text-transform: uppercase;
  }

  &__title--active &__icon {
    transform: rotate(180deg);
  }

  &__icon {
    width: 10px;
    height: 10px;
    margin-bottom: 2px;
    transition: transform 0.3s;
  }

  &__list {
    @include list-unstyled();

    padding-top: 3px;
    margin-bottom: 0;
  }

  &__link {
    position: relative;
    display: inline-block;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 15px;
    line-height: 1;
    color: $text-color;

    &--active {
      padding-left: 12px;
      color: $black;
      cursor: default;

      @include hover-focus-active {
        color: $black;
      }

      &::before {
        position: absolute;
        top: calc(50% - 2px);
        left: 2px;
        display: block;
        width: 3px;
        height: 3px;
        content: '';
        background-color: $primary;
      }
    }
  }
}
</style>
