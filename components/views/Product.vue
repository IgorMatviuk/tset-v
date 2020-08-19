<template>
  <main class="product-page">
    <TheBreadcrumb :items="breadcrumb" />
    <BlockProduct :product="product" :links="links" />
    <BlockProductsList
      v-if="sections.similar_products.length"
      :products="sections.similar_products"
      :heading="$t('productPage.similarProducts')"
      parent-class="product-page__similar-products"
      class="product-page__similar-products"
    />
    <BlockProductsList
      :products="sections.featured_products"
      :heading="$t('productPage.featuredProducts')"
      parent-class="product-page__bestsellers"
      class="product-page__bestsellers"
    />
    <client-only>
      <BlockProductsList
        v-if="viewedProducts.length"
        :products="viewedProducts"
        :heading="$t('productPage.viewedProducts')"
        parent-class="product-page__viewed-products"
        class="product-page__viewed-products"
      />
    </client-only>
    <BlockSiteDescription :content="seoText" />
    <TheImageViewer
      v-if="isImageViewerVisible"
      :active-index="galleryActiveIndex"
    />
  </main>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

import TheBreadcrumb from '@/components/layout/breadcrumb/TheBreadcrumb'
import BlockProduct from '@/components/blocks/BlockProduct'
import BlockProductsList from '@/components/blocks/BlockProductsList'
import BlockSiteDescription from '@/components/blocks/BlockSiteDescription'
import TheImageViewer from '@/components/layout/image-viewer/TheImageViewer'

import breadrumb from '@/mixins/breadrumb'

const { mapState } = createNamespacedHelpers('product')

export default {
  components: {
    TheBreadcrumb,
    BlockProduct,
    BlockProductsList,
    BlockSiteDescription,
    TheImageViewer
  },
  mixins: [breadrumb()],
  data() {
    return {
      viewedProducts: []
    }
  },
  computed: {
    ...mapState({
      product: (state) => state.productData,
      links: (state) => state.links,
      sections: (state) => state.sectionsData,
      isImageViewerVisible: (state) => state.imageViewerVisibility
    }),
    seoText() {
      return this.$store.getters['product/seoText']
    },
    galleryActiveIndex() {
      const formattedPreviews = this.$store.state.product.activeVariant.previews.filter(
        (preview) => preview.preview_type !== 'video'
      )
      const index = formattedPreviews.findIndex(
        (item) => item === this.$store.state.product.activePreview
      )

      return index >= 0 ? index : 0
    }
  },
  async mounted() {
    // TODO: temporary solution since there is no any auth token logic built
    // The auth tokens will be implemented in the future release
    await this.$viewedProducts.connectToDatabase()
    await this.$viewedProducts.incrementing(this.product)

    this.viewedProducts = await this.$viewedProducts.getAll()
  }
}
</script>

<style lang="scss"></style>
