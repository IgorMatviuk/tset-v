<template>
  <main>
    <TheBreadcrumb :is-float="true" :items="breadcrumb" />
    <BlockPaymentDelivery class="block-payment" />
  </main>
</template>

<script>
import TheBreadcrumb from '@/components/layout/breadcrumb/TheBreadcrumb'
import BlockPaymentDelivery from '@/components/blocks/BlockPayment/BlockPaymentDelivery'

import breadcrumb from '@/mixins/breadrumb'

export default {
  components: {
    TheBreadcrumb,
    BlockPaymentDelivery
  },
  mixins: [breadcrumb({ isStaticPage: true, pageName: 'contacts' })]
}
</script>
<style lang="scss">
@include media-breakpoint-up(xs) {
  .block-payment {
    padding: 10px 20px 1px 20px;
  }
}

@include media-breakpoint-up(sm) {
  .block-payment {
    padding: 10px 100px 1px 100px;
  }
}

/*

@include media-breakpoint-up(md) {
  .block-payment {
    padding: 10px 100px 1px 100px;
  }
}

@include media-breakpoint-up(lg) {
  .block-payment {
    padding: 10px 100px 1px 100px;
  }
}

@include media-breakpoint-up(xl) {
  .block-payment {
    padding: 10px 100px 1px 100px;
  }
}

@include media-breakpoint-up(xxl) {
  .block-payment {
    padding: 10px 100px 1px 100px;
  }
}

*/
</style>
