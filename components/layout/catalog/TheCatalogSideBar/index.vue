<template>
  <div class="catalog-sidebar">
    <div class="catalog-sidebar__title">{{ $t('catalogPage.catalog') }}</div>
    <ul class="catalog-sidebar__list">
      <li
        v-for="item in promoMenu.columns"
        :key="item.id"
        class="catalog-sidebar__list-item"
      >
        <NuxtLink
          :to="$i18n.path(item.slug)"
          class="catalog-sidebar__link"
          exact-active-class="catalog-sidebar__link--active"
          exact
        >
          {{ item.name }}
        </NuxtLink>
      </li>
    </ul>
    <TheCatalogSideBarCategories class="catalog-sidebar__categories" />
  </div>
</template>

<script>
import TheCatalogSideBarCategories from './TheCatalogSideBarCategories'

export default {
  components: {
    TheCatalogSideBarCategories
  },
  computed: {
    promoMenu() {
      return this.$store.getters.promoMenu
    }
  }
}
</script>

<style lang="scss">
.catalog-sidebar {
  &__title {
    margin-bottom: 21px;
    font-size: 16px;
    line-height: 35px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__list {
    @include list-unstyled();
  }

  &__list-item {
    &:not(:last-of-type) {
      margin-bottom: 7px;
    }
  }

  &__link {
    display: inline-block;
    font-size: 16px;
    font-weight: 500;
    line-height: 30px;

    &--active {
      color: $primary;
    }

    &--sale {
      color: $primary;
      text-transform: uppercase;
    }
  }

  &__categories {
    margin-top: 25px;
  }
}
</style>
