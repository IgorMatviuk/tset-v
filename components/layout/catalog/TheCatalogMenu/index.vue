<template>
  <nav class="catalog-menu">
    <BContainer class="catalog-menu__container">
      <div class="catalog-menu__additional-links">
        <ul class="catalog-menu__list">
          <li class="catalog-menu__item">
            <span class="catalog-menu__link catalog-menu__link--active">
              {{ $t('catalogPage.categories') }}
            </span>
          </li>
          <li
            v-for="item in promoMenu.columns"
            :key="item.id"
            class="catalog-menu__item"
          >
            <NuxtLink
              :to="$i18n.path(item.slug)"
              exact-active-class="catalog-menu__link--danger"
              exact
              class="catalog-menu__link"
            >
              {{ item.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="catalog-menu__categories">
        <div
          v-for="category in catalogMenu.columns"
          :key="category.id"
          class="catalog-menu__list-wrapper"
        >
          <TheCatalogMenuList :category="category" />
        </div>
      </div>
    </BContainer>
  </nav>
</template>

<script>
import TheCatalogMenuList from './TheCatalogMenuList'

export default {
  components: {
    TheCatalogMenuList
  },
  computed: {
    promoMenu() {
      return this.$store.getters.promoMenu
    },
    catalogMenu() {
      return this.$store.getters.catalogMenu
    }
  }
}
</script>

<style lang="scss">
.catalog-menu {
  position: absolute;
  top: 100%;
  right: 0;
  left: 0;
  display: none;
  padding-top: 30px;
  padding-bottom: 30px;
  background-color: $white;
  box-shadow: 2px 2px 12px rgba(41, 54, 136, 0.1);

  &__container {
    display: flex;
  }

  &__additional-links {
    flex-basis: 350px;
    max-width: 350px;
  }

  &__additional-links &__item {
    &:not(:last-child) {
      margin-bottom: 22px;
    }
  }

  &__additional-links &__link {
    display: flex;
    align-items: center;
    font-size: 14px;

    &:not(:hover) {
      color: $body-color;
    }

    &--active {
      &::before {
        width: 3px;
        height: 3px;
        margin-right: 5px;
        content: '';
        background-color: $primary;
      }
    }
  }

  &__additional-links &__link--danger:not(:hover) {
    color: $primary;
  }

  &__categories {
    display: flex;
    width: 100%;
  }

  &__list-wrapper {
    display: flex;
    flex-direction: column;

    &:nth-child(1) {
      flex-basis: 220px;
      max-width: 220px;
    }

    &:nth-child(2) {
      flex-basis: 255px;
      max-width: 255px;
    }

    &:nth-child(3) {
      flex-basis: 300px;
      max-width: 300px;
    }
  }

  @include media-breakpoint-down(lg) {
    &__additional-links {
      flex: 140px;
      min-width: 140px;
    }

    &__list-wrapper {
      &:nth-child(1) {
        flex-basis: 210px;
        max-width: 210px;
      }

      &:nth-child(2) {
        flex-basis: 210px;
        max-width: 210px;
      }

      &:nth-child(3) {
        flex-basis: 210px;
        max-width: 210px;
      }

      &:nth-child(4) {
        flex-basis: 150px;
        max-width: 150px;
      }
    }
  }

  @include media-breakpoint-up(lg) {
    display: block;
  }
}
</style>
