import { CATALOG_ITEMS_PER_PAGE } from '@/utils/constants'

import { mutationTypes as catalogMutationTypes } from '@/store/catalog'
import { mutationTypes as productMutationTypes } from '@/store/product'
import { actionTypes as searchActionTypes } from '@/store/search'
import { actionTypes as testimonialsActionTypes } from '@/store/testimonials'
import { actionTypes as cartActionTypes } from '@/store/cart'
import { actionsTypes as blogActionsTypes } from '@/store/blog'

function catalog({ app, store, route, page }) {
  const { category, products, attributes } = page.data
  const { meta } = page

  store.commit(`catalog/${catalogMutationTypes.SET_CATALOG_DATA}`, {
    category,
    products,
    attributes
  })

  const filters = store.state.catalog.filters

  if (!filters.length) {
    const localeRegExp = new RegExp(`^/${store.state.locale}/`)
    let filtersPath

    if (category) {
      const categoryIndex = route.path.lastIndexOf(category.slug)
      filtersPath = route.path.slice(categoryIndex + category.slug.length + 1)
    } else {
      const path = route.path.replace(localeRegExp, '/')
      filtersPath = path.replace(/^\/([^/]+)\/?/, '')
    }

    let initialFilters = []

    if (filtersPath) {
      const segments = filtersPath.split('/')

      initialFilters = segments.map((segment) => {
        const [code, ...value] = segment.split('_')
        const label = app.i18n.t(`attributes.${code}.one`)

        return { code, label, value }
      })
    }

    store.commit(`catalog/${catalogMutationTypes.SET_FILTERS}`, initialFilters)

    const totalPages = Math.ceil(meta.total / CATALOG_ITEMS_PER_PAGE)

    store.commit(`catalog/${catalogMutationTypes.SET_TOTAL_PAGES}`, totalPages)

    store.commit(
      `catalog/${catalogMutationTypes.SET_CURRENT_PAGE}`,
      meta.current_page
    )

    store.commit(
      `catalog/${catalogMutationTypes.SET_SEO_TEXT}`,
      meta.tags.seo_text
    )

    const queryOrder = route.query.order

    if (queryOrder) {
      store.commit(`catalog/${catalogMutationTypes.SET_ORDER}`, queryOrder)
    }
  }
}

function product({ store, route, page }) {
  /* eslint-disable camelcase */
  const {
    product,
    links,
    similar_products,
    featured_products,
    viewed_products
  } = page.data

  const sections = {
    similar_products,
    featured_products,
    viewed_products
  }

  const variant = product.variants.find(
    (variant) => variant.url_key === route.params.pathMatch
  )

  store.commit(`product/${productMutationTypes.SET_SELECTED_SIZE}`, null)
  store.commit(`product/${productMutationTypes.SET_PRODUCT_DATA}`, product)
  store.commit(`product/${productMutationTypes.SET_ACTIVE_VARIANT}`, variant)
  store.commit(`product/${productMutationTypes.SET_SECTIONS_DATA}`, sections)
  store.commit(`product/${productMutationTypes.SET_NAV_LINKS}`, links)
}

async function search({ store, route }) {
  await store.dispatch(`search/${searchActionTypes.GET_PRODUCTS}`, {
    query: route.query.q,
    page: route.query.page
  })
}

async function testimonials({ store, route }) {
  const query = {}

  // TODO: remove underscores (mock solution)
  Object.keys(route.query).forEach((key) => {
    if (key !== 'q') {
      query[`_${key}`] = route.query[key]
    } else {
      query[key] = route.query[key]
    }
  })

  await store.dispatch(
    `testimonials/${testimonialsActionTypes.GET_TESTIMONIALS}`,
    query
  )
}

async function blog({ store, route }) {
  const query = {}

  Object.keys(route.query).forEach((key) => {
    query[key] = route.query[key]
  })

  await store.dispatch(`blog/${blogActionsTypes.GET_BLOG_POSTS}`, query)
}

async function checkout({ store }) {
  await store.dispatch(`cart/${cartActionTypes.GET_CHECKOUT_DATA}`)
}

export default { catalog, product, search, checkout, testimonials, blog }
