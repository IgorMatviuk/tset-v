<template>
  <div class="error-page-wrapper" :class="{ 'has-banner': !!banner }">
    <TheBanner v-if="banner" :banner="banner" />
    <TheHeader />
    <Nuxt />
    <TheStickySearch />
    <BaseModal type="form" />
    <BaseModal type="message" />
    <TheTermsOfUse />
  </div>
</template>

<script>
import TheHeader from '@/components/layout/header/TheHeader'
import TheStickySearch from '@/components/layout/sticky-search/TheStickySearch'
import TheBanner from '@/components/layout/banner/TheBanner'
import BaseModal from '@/components/base/BaseModal'
import TheTermsOfUse from '@/components/layout/terms-of-use/TheTermsOfUse'

import layout from '@/mixins/layout'

export default {
  components: {
    TheHeader,
    TheStickySearch,
    TheBanner,
    BaseModal,
    TheTermsOfUse
  },
  mixins: [layout]
}
</script>

<style lang="scss">
.error-page-wrapper {
  position: relative;
}
</style>
