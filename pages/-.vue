<template>
  <component :is="view" />
</template>

<script>
import { mapState } from 'vuex'

import Catalog from '@/components/views/Catalog'
import Product from '@/components/views/Product'

import pageActions from '@/utils/page-actions'

import { mutationTypes as rootMutationTypes } from '@/store'

import seoMeta from '@/mixins/seo-meta'

import { CATALOG_ITEMS_PER_PAGE } from '@/utils/constants'

export default {
  components: {
    Catalog,
    Product
  },
  mixins: [seoMeta],
  async asyncData({ app, store, route, error }) {
    let url

    if (store.state.locale === store.state.fallbackLocale) {
      url = route.path.slice(1)
    } else {
      url = route.path.replace(`/${store.state.locale}/`, '')
    }

    let query = Object.keys(route.query)
      .reduce((query, key) => {
        let value = route.query[key]

        /* istanbul ignore else */
        if (key === 'limit') {
          value = CATALOG_ITEMS_PER_PAGE
        }

        query.push(`${key}=${encodeURIComponent(value)}`)
        return query
      }, [])
      .join('&')

    /* istanbul ignore else */
    if (!route.query.limit) {
      query += `limit=${CATALOG_ITEMS_PER_PAGE}`
    }

    let page

    try {
      // page = await app.$axios.$get(
      //   `/api/router?url=${url}${query ? `&${query}` : ''}`
      // )

      // FIXME: temporary solution
      const STAGE_API_URL = 'https://back.virna.com.ua'
      page = await app.$axios.$get(
        `${STAGE_API_URL}/api/router?url=${url}${query ? `&${query}` : ''}`
      )
    } catch (err) {
      error({ statusCode: 404, message: 'Page not found' })
      return {}
    }

    /* istanbul ignore else */
    if (pageActions[page.meta.page_type]) {
      pageActions[page.meta.page_type]({
        app,
        store,
        route,
        page
      })
    }

    store.commit(rootMutationTypes.SET_BREADCRUMB, page.data.breadcrumb)
    store.commit(rootMutationTypes.SET_PAGE_TYPE, page.meta.page_type)

    const view =
      page.meta.page_type.charAt(0).toUpperCase() + page.meta.page_type.slice(1)

    return { page, view }
  },
  computed: {
    ...mapState(['locale', 'fallbackLocale'])
  }
}
</script>

<style></style>
