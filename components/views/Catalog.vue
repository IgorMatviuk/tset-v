<template>
  <main class="catalog-page">
    <TheBreadcrumb :items="breadcrumb" />
    <BContainer class="catalog-page__container">
      <div v-if="isLoading" class="catalog-page__preloader"></div>
      <div class="catalog-page__grid">
        <TheCatalogSideBar class="catalog-page__sidebar" />
        <div class="catalog-page__content">
          <TheCatalogHeader class="catalog-page__header" />
          <!-- TODO: uncomment in the future release -->
          <!-- <BlockCatalogFilter /> -->
          <BlockCatalogResults />
        </div>
      </div>
      <transition name="fade">
        <DrawerCatalogCategories
          v-if="catalogDrawersVisibility && isCategoriesDrawerVisible"
        />
      </transition>
      <!-- TODO: uncomment in the future release -->
      <!-- <transition name="fade">
        <DrawerCatalogFilter
          v-if="catalogDrawersVisibility && isFiltersDrawerVisible"
        />
      </transition> -->
    </BContainer>
    <BlockSiteDescription
      :content="seoText"
      class="catalog-page__description"
    />
  </main>
</template>

<script>
import { mapState } from 'vuex'

import TheBreadcrumb from '@/components/layout/breadcrumb/TheBreadcrumb'
import TheCatalogHeader from '@/components/layout/catalog/TheCatalogHeader'
import TheCatalogSideBar from '@/components/layout/catalog/TheCatalogSideBar'
// import BlockCatalogFilter from '@/components/blocks/BlockCatalogFilter'
import BlockCatalogResults from '@/components/blocks/BlockCatalogResults'
import DrawerCatalogCategories from '@/components/drawers/DrawerCatalogCategories'
// import DrawerCatalogFilter from '@/components/drawers/DrawerCatalogFilter'
import BlockSiteDescription from '@/components/blocks/BlockSiteDescription'

import breadrumb from '@/mixins/breadrumb'

import { actionTypes as catalogActionTypes } from '@/store/catalog'

import { CATALOG_ITEMS_PER_PAGE } from '@/utils/constants'

export default {
  components: {
    TheBreadcrumb,
    TheCatalogHeader,
    TheCatalogSideBar,
    // BlockCatalogFilter,
    BlockCatalogResults,
    DrawerCatalogCategories,
    // DrawerCatalogFilter,
    BlockSiteDescription
  },
  mixins: [breadrumb()],
  data() {
    return {
      catalogDrawersVisibility: false,
      mqlSm: null
    }
  },
  computed: {
    ...mapState({
      currentPage: (state) => state.catalog.currentPage,
      isLoading: (state) => state.catalog.isLoading,
      seoText: (state) => state.catalog.seoText,
      isCategoriesDrawerVisible: (state) => state.ui.isCategoriesDrawerVisible,
      isFiltersDrawerVisible: (state) => state.ui.isFiltersDrawerVisible
    })
  },
  watch: {
    isLoading: 'scrollToTop',
    $route: 'fetchProducts'
  },
  created() {
    if (this.$device.isMobile) {
      this.catalogDrawersVisibility = true
    }
  },
  mounted() {
    this.mqlSm = matchMedia('(max-width: 767.98px)')

    /* istanbul ignore next */
    this.mqlSm.addListener(this.checkDevice)
  },
  beforeDestroy() {
    this.mqlSm.removeListener(this.checkDevice)
  },
  methods: {
    fetchProducts() {
      let url

      if (this.$store.state.locale === this.$store.state.fallbackLocale) {
        url = this.$route.path.slice(1)
      } else {
        url = this.$route.path.replace(`/${this.$store.state.locale}/`, '')
      }

      let query = Object.keys(this.$route.query)
        .reduce((query, key) => {
          let value = this.$route.query[key]

          /* istanbul ignore else */
          if (key === 'limit') {
            value = CATALOG_ITEMS_PER_PAGE
          }

          query.push(`${key}=${encodeURIComponent(value)}`)

          return query
        }, [])
        .join('&')

      /* istanbul ignore else */
      if (!this.$route.query.limit) {
        query += `&limit=${CATALOG_ITEMS_PER_PAGE}`
      }

      const payload = { url, query }

      this.$store.dispatch(
        `catalog/${catalogActionTypes.GET_PRODUCTS}`,
        payload
      )
    },
    scrollToTop(nextStatus, prevStatus) {
      if (!nextStatus && prevStatus) {
        this.$scrollTo(document.body, 800, { force: true })
      }
    },
    checkDevice(event) {
      if (event.matches) {
        this.catalogDrawersVisibility = true
      } else {
        this.catalogDrawersVisibility = false
      }
    }
  }
}
</script>

<style lang="scss">
.catalog-page {
  overflow-x: hidden;

  &__preloader {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    background-color: rgba(255, 255, 255, 0.5);
  }

  &__container {
    position: relative;
  }

  &__sidebar {
    display: none;
  }

  &__header {
    margin-bottom: 14px;
  }

  &__description {
    margin-top: 43px;
  }

  @include media-breakpoint-up(md) {
    &__header {
      margin-bottom: 26px;
    }

    &__description {
      margin-top: 61px;
    }
  }

  @include media-breakpoint-up(lg) {
    &__description {
      margin-top: 83px;
    }
  }

  @include media-breakpoint-up(xl) {
    &__header {
      margin-bottom: 22px;
    }

    &__grid {
      @include make-row();
    }

    &__sidebar {
      @include make-col(2);
      @include make-col-ready();

      display: block;
    }

    &__content {
      @include make-col(10);
      @include make-col-ready();
    }

    &__description {
      margin-top: 45px;
    }
  }

  @include media-breakpoint-up(xxl) {
    &__description {
      margin-top: 4px;
    }
  }
}
</style>
