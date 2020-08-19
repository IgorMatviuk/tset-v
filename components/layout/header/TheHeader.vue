<template>
  <header class="header">
    <TheMasthead
      :is-site-nav-active="isSiteNavActive"
      :is-catalog-menu-active="isCatalogMenuActive"
      @toggle-site-nav="toggleSiteNav"
      @toggle-catalog-menu="toggleCatalogMenu"
    />
    <transition name="fade">
      <TheCatalogMenu v-if="isCatalogMenuActive" />
    </transition>
    <transition name="fade">
      <TheSiteNav v-if="isSiteNavActive" />
    </transition>
    <transition name="slide-left">
      <TheFloatPanel v-if="isFloatPanelVisible && pageType === 'product'" />
    </transition>
  </header>
</template>

<script>
import TheMasthead from './TheMasthead'
import TheCatalogMenu from '@/components/layout/catalog/TheCatalogMenu'
import TheSiteNav from '@/components/layout/site-nav/TheSiteNav'
import TheFloatPanel from '@/components/layout/float-panel/TheFloatPanel'

import { mutationTypes as uiMutationTypes } from '@/store/ui'

export default {
  components: {
    TheMasthead,
    TheCatalogMenu,
    TheSiteNav,
    TheFloatPanel
  },
  data() {
    return {
      isSiteNavActive: false,
      isCatalogMenuActive: false
    }
  },
  computed: {
    isFloatPanelVisible() {
      return this.$store.state.ui.isFloatPanelActive
    },
    pageType() {
      return this.$store.state.pageType
    }
  },
  watch: {
    $route: 'onRouteChange',
    isSiteNavActive: 'notifySiteNavToggle'
  },
  mounted() {
    this.$bus.$on('float-panel:toggle', this.toggleFloatPanel)
  },
  beforeDestroy() {
    this.$bus.$off('float-panel:toggle', this.toggleFloatPanel)
  },
  methods: {
    notifySiteNavToggle(status) {
      this.$bus.$emit('site-nav:toggle', status)

      /* istanbul ignore else */
      if (this.$device.isMobile) {
        this.$store.commit(
          `ui/${uiMutationTypes.SET_MOBILE_MENU_VISIBILITY_TOGGLE}`,
          status
        )
      }
    },
    toggleSiteNav(status) {
      this.isSiteNavActive = status
    },
    toggleCatalogMenu(status) {
      this.isCatalogMenuActive = status
    },
    toggleFloatPanel(status) {
      this.$store.commit(
        `ui/${uiMutationTypes.SET_FLOAT_PANEL_VISIBILITY_TOGGLE}`,
        status
      )
    },
    onRouteChange() {
      if (this.isCatalogMenuActive) {
        this.isCatalogMenuActive = false
      }

      if (this.isSiteNavActive) {
        this.isSiteNavActive = false
      }
    }
  }
}
</script>

<style lang="scss">
.header {
  position: sticky;
  top: 0;
  z-index: 12;
  height: 50px;

  @include media-breakpoint-up(md) {
    height: 60px;
  }
}
</style>
