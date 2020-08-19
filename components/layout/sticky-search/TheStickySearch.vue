<template>
  <div class="sticky-search" :class="{ 'sticky-search--visible': isVisible }">
    <div class="sticky-search__controls">
      <div class="sticky-search__lang-toggler">
        <div
          v-for="(item, index) in localesASC"
          :key="index"
          class="sticky-search__lang-item"
        >
          <a
            v-if="item !== locale"
            :href="getLocalizedPath(item)"
            class="sticky-search__lang-link"
          >
            {{ item }}
          </a>
          <div
            v-else
            class="sticky-search__lang-link sticky-search__lang-link--active"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="sticky-search__phone">0 800 <b>332 512</b></div>
    </div>
    <SearchBox class="sticky-search__search-box" />
    <SocialNetworks class="sticky-search__social-networks" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import SearchBox from '@/components/functional/SearchBox'
import SocialNetworks from '@/components/shared/SocialNetworks'

export default {
  components: {
    SearchBox,
    SocialNetworks
  },
  data() {
    return {
      isVisible: false
    }
  },
  computed: {
    ...mapState(['locale', 'locales', 'fallbackLocale']),
    localesASC() {
      const clone = [...this.locales]
      return clone.sort()
    }
  },
  mounted() {
    this.$bus.$on('site-nav:toggle', this.onSiteNavToggle)
  },
  beforeDestroy() {
    this.$bus.$off('site-nav:toggle', this.onSiteNavToggle)
  },
  methods: {
    onSiteNavToggle(status) {
      this.isVisible = status
    },
    getLocalizedPath(locale) {
      if (locale === this.fallbackLocale) {
        return this.$route.fullPath.replace(`/${this.locale}/`, '/')
      }

      return `/${locale}${this.$route.fullPath}`
    }
  }
}
</script>

<style lang="scss">
.sticky-search {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 12;
  padding: 14px 25px 0 25px;
  padding-bottom: calc(14px + env(safe-area-inset-bottom));
  background-color: #fbf8f8;
  transition: opacity 0.3s;

  &:not(&--visible) {
    pointer-events: none;
    opacity: 0;
  }

  &__controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  &__lang-toggler {
    display: flex;
  }

  &__lang-item {
    &:not(:first-child) {
      margin-left: 14px;
    }
  }

  &__lang-link:not(:hover) {
    color: #c4c4c4;
  }

  &__lang-link--active:not(:hover) {
    color: $body-color;
  }

  &__search-box {
    margin-bottom: 12px;
  }

  &__social-networks {
    display: flex;
    justify-content: center;
  }

  @include media-breakpoint-up(lg) {
    display: none;
  }
}
</style>
