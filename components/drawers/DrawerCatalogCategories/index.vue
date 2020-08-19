<template>
  <CatalogDrawer>
    <template v-slot:heading>{{ $t('catalogPage.categories') }}</template>
    <template v-slot:content>
      <DrawerCatalogCategoriesList />
    </template>
  </CatalogDrawer>
</template>

<script>
import DrawerCatalogCategoriesList from './DrawerCatalogCategoriesList'
import CatalogDrawer from '@/components/shared/CatalogDrawer'

export default {
  components: {
    DrawerCatalogCategoriesList,
    CatalogDrawer
  }
}
</script>
