<template>
  <div :class="{ 'has-banner': !!banner }" class="page-wrapper">
    <TheBanner v-if="banner" :banner="banner" />
    <TheHeader />
    <Nuxt />
    <TheStickySearch />
    <TheFooter />
    <BaseModal type="form" />
    <BaseModal type="message" />
    <BaseModal type="testimonials" />
    <TheTermsOfUse />
  </div>
</template>

<script>
import TheFooter from '@/components/layout/footer/TheFooter'
import TheHeader from '@/components/layout/header/TheHeader'
import TheBanner from '@/components/layout/banner/TheBanner'
import TheStickySearch from '@/components/layout/sticky-search/TheStickySearch'
import BaseModal from '@/components/base/BaseModal'
import TheTermsOfUse from '@/components/layout/terms-of-use/TheTermsOfUse'

import layout from '@/mixins/layout'

// import { actionTypes as rootActionTypes } from '@/store'

export default {
  components: {
    TheFooter,
    TheHeader,
    TheBanner,
    TheStickySearch,
    BaseModal,
    TheTermsOfUse
  },
  mixins: [layout]
  // created() {
  //   this.$store.dispatch(rootActionTypes.GET_CLIENT_LOCATION)
  // },
}
</script>

<style>
.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
