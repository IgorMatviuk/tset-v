<template>
  <main class="privacy-policy-page">
    <TheBreadcrumb :is-float="true" :items="breadcrumb" />
    <BlockPrivacyPolicy />
  </main>
</template>

<script>
import TheBreadcrumb from '@/components/layout/breadcrumb/TheBreadcrumb'
import BlockPrivacyPolicy from '@/components/blocks/BlockPrivacyPolicy'

import breadcrumb from '@/mixins/breadrumb'

export default {
  components: {
    TheBreadcrumb,
    BlockPrivacyPolicy
  },
  mixins: [breadcrumb({ isStaticPage: true, pageName: 'privacyPolicy' })]
}
</script>

<style lang="scss"></style>
