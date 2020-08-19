<template>
  <main class="contacts-page">
    <TheBreadcrumb :is-float="true" :items="breadcrumb" />
    <BlockContacts class="contacts-page__block" />
  </main>
</template>

<script>
import TheBreadcrumb from '@/components/layout/breadcrumb/TheBreadcrumb'
import BlockContacts from '@/components/blocks/BlockContacts'

import breadcrumb from '@/mixins/breadrumb'

export default {
  components: {
    TheBreadcrumb,
    BlockContacts
  },
  mixins: [breadcrumb({ isStaticPage: true, pageName: 'contacts' })]
}
</script>
