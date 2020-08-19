<template>
  <CatalogDrawer>
    <template v-slot:heading>{{ $t('catalogPage.filter.title') }}</template>
    <template v-slot:content>
      <DrawerCatalogFilterOrder />
      <DrawerCatalogFilterBox
        v-for="(attribute, index) in attributes"
        :key="index"
        :label="attribute.name"
      >
        <template v-slot:filter-column>
          <DrawerCatalogFilterColumn
            ref="filterGroup"
            :attribute="attribute"
            @toggle-filters-application="onToggleFiltersApplication"
          />
        </template>
      </DrawerCatalogFilterBox>
    </template>
    <template v-slot:controls>
      <ButtonClearFilters @clear-filters="onClearFiltersEmit" />
      <BButton
        :disabled="!allowFiltersApplication"
        variant="primary"
        class="drawer-apply-button"
        @click="onApplyFiltersEmit"
      >
        применить
      </BButton>
    </template>
  </CatalogDrawer>
</template>

<script>
import { mapState } from 'vuex'

import DrawerCatalogFilterOrder from './DrawerCatalogFilterOrder'
import DrawerCatalogFilterBox from './DrawerCatalogFilterBox'
import DrawerCatalogFilterColumn from './DrawerCatalogFilterColumn'
import CatalogDrawer from '@/components/shared/CatalogDrawer'
import ButtonClearFilters from '@/components/shared/ButtonClearFilters'

import filtersController from '@/mixins/filters-controller'

import { mutationTypes } from '@/store/ui'

export default {
  components: {
    DrawerCatalogFilterOrder,
    DrawerCatalogFilterBox,
    DrawerCatalogFilterColumn,
    CatalogDrawer,
    ButtonClearFilters
  },
  mixins: [filtersController],
  data() {
    return {
      allowFiltersApplication: false
    }
  },
  computed: {
    ...mapState({
      attributes: (state) => state.catalog.attributes,
      filters: (state) => state.catalog.filters
    })
  },
  watch: {
    filters(nextValue) {
      if (nextValue && !nextValue.length) {
        this.allowFiltersApplication = false
      }
    }
  },
  methods: {
    onToggleFiltersApplication(status) {
      this.allowFiltersApplication = status
    },
    onApplyFiltersEmit() {
      this.$store.commit(
        `ui/${mutationTypes.SET_FILTERS_DRAWER_VISIBILITY_TOGGLE}`,
        false
      )

      this.applyFilters()
    },
    onClearFiltersEmit() {
      this.$store.commit(
        `ui/${mutationTypes.SET_FILTERS_DRAWER_VISIBILITY_TOGGLE}`,
        false
      )

      this.clearFilters()
    }
  }
}
</script>

<style lang="scss">
.drawer-apply-button {
  min-width: 120px;
  height: 30px;
  font-size: 13px;
  line-height: 28px;
  border-radius: 0;
}
</style>
