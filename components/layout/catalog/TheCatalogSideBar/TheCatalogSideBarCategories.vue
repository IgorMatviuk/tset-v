<template>
  <div class="catalog-categories">
    <div
      v-for="(category, index) in categories"
      :key="index"
      class="catalog-categories__list"
    >
      <template v-if="category.status">
        <TheCatalogSideBarCategoriesCollapse
          v-if="category && category.categories.length"
          :category="category"
          class="catalog-categories__item"
        />
        <div v-else class="catalog-categories__item">
          <NuxtLink
            :to="$i18n.path(`${category.slug}`)"
            class="catalog-categories__link"
            active-class="catalog-categories__link--active"
          >
            {{ category.name }}
          </NuxtLink>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import TheCatalogSideBarCategoriesCollapse from './TheCatalogSideBarCategoriesCollapse'

export default {
  components: {
    TheCatalogSideBarCategoriesCollapse
  },
  computed: {
    categories() {
      return this.$store.state.catalog.categories
    }
  }
}
</script>

<style lang="scss">
.catalog-categories {
  &__list {
    &:not(:last-of-type) {
      margin-bottom: 8px;
    }
  }

  &__link {
    display: inline-block;
    font-size: 16px;
    line-height: 45px;
    text-transform: uppercase;

    &--active {
      color: $primary;
      cursor: default;
    }
  }
}
</style>
