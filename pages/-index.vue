<template>
  <main class="home-page">
    <BlockHomeScreen :offers="page.current_offers" />
    <BlockOurFeatures :features="page.features" />
    <BlockCollections
      :collections="staticCollections"
      :static-collections="true"
    />
    <BlockProductsList
      :products="page.featured_products"
      :heading="$t('productList.bestsellers')"
      parent-class="home-page__products-list"
      class="home-page__products-list"
    />
    <BlockCollections :collections="collections" :static-collections="false" />
    <!-- <BlockTestimonials :testimonials="page.testimonials" /> -->
    <!-- <BlockFeaturedPosts :posts="page.recent_posts" /> -->
    <BlockSiteDescription :content="page.meta.seo_text" />
  </main>
</template>

<script>
import { mapState } from 'vuex'

import BlockHomeScreen from '@/components/blocks/BlockHomeScreen'
import BlockOurFeatures from '@/components/blocks/BlockOurFeatures'
import BlockCollections from '@/components/blocks/BlockCollections'
import BlockProductsList from '@/components/blocks/BlockProductsList'
// import BlockTestimonials from '@/components/blocks/BlockTestimonials'
// import BlockFeaturedPosts from '@/components/blocks/BlockFeaturedPosts'
import BlockSiteDescription from '@/components/blocks/BlockSiteDescription'

import { mutationTypes as rootMutationTypes } from '@/store'
import { mutationTypes as cartMutationTypes } from '@/store/cart'

import seoMeta from '@/mixins/seo-meta'

export default {
  components: {
    BlockHomeScreen,
    BlockOurFeatures,
    BlockCollections,
    BlockProductsList,
    // BlockTestimonials,
    // BlockFeaturedPosts,
    BlockSiteDescription
  },
  mixins: [seoMeta],
  async asyncData({ app, store }) {
    // FIXME: temporary solution
    const STAGE_API_URL = 'https://back.virna.com.ua'
    const { data: page } = await app.$axios.$get(`${STAGE_API_URL}/api/main`)

    store.commit(rootMutationTypes.SET_PAGE_TYPE, 'main')

    return { page }
  },
  data() {
    return {
      // FIXME: static collections
      staticCollections: [
        {
          id: '324',
          name: this.$t('collections.newItems'),
          images: {
            collection_lg: '/img/collections/collection-new_lg.jpg',
            collection_md: '/img/collections/collection-new_md.jpg',
            collection_sm: '/img/collections/collection-new_sm.jpg',
            collection_xl: '/img/collections/collection-new_xl.jpg',
            collection_xs: '/img/collections/collection-new_xs.jpg'
          },
          slug: 'new'
        },
        {
          id: '509',
          name: this.$t('collections.sale'),
          images: {
            collection_lg: '/img/collections/collection-sale_lg.jpg',
            collection_md: '/img/collections/collection-sale_md.jpg',
            collection_sm: '/img/collections/collection-sale_sm.jpg',
            collection_xl: '/img/collections/collection-sale_xl.jpg',
            collection_xs: '/img/collections/collection-sale_xs.jpg'
          },
          name_alias: null,
          slug: 'sale'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      allCollections: (state) => state.catalog.categories
    }),
    collections() {
      const categoriesCollections = this.allCollections.filter((item) => {
        const isCategories =
          item.slug !== 'sale' && item.slug !== 'new' && item.slug !== 'promo'

        return isCategories
      })

      return categoriesCollections
    }
  },
  mounted() {
    const isOrderSaved = this.$store.state.cart.isOrderSaved

    /* istanbul ignore else */
    if (isOrderSaved) {
      this.$store.commit(`cart/${cartMutationTypes.CLEAR_CART}`)
    }
  }
}
</script>

<style></style>
