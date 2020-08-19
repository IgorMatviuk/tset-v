<template>
  <div class="catalog-header">
    <div class="catalog-header__title">{{ $t('catalogPage.title') }}</div>
    <TheCatalogHeaderOrder class="catalog-header__sorting" />
    <TheCatalogHeaderItemCount class="catalog-header__item-count" />
  </div>
</template>

<script>
import TheCatalogHeaderOrder from './TheCatalogHeaderOrder'
import TheCatalogHeaderItemCount from './TheCatalogHeaderItemCount'

export default {
  components: {
    TheCatalogHeaderOrder,
    TheCatalogHeaderItemCount
  }
}
</script>

<style lang="scss">
.catalog-header {
  display: flex;
  align-items: center;

  &__title {
    margin-right: auto;
    font-size: 16px;
    line-height: 1.25;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__sorting {
    min-width: 180px;
    margin-right: 10px;
    text-align: center;
  }

  &__item-count {
    margin-right: -9px;
  }

  @include media-breakpoint-down(lg) {
    &__item-count {
      margin-right: -5px;
    }
  }

  @include media-breakpoint-down(sm) {
    &__sorting {
      display: none;
    }

    &__item-count {
      margin-right: -2px;
    }
  }

  @include media-breakpoint-up(xl) {
    margin-bottom: 25px;
  }
}
</style>
