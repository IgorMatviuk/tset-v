import { CATALOG_ITEMS_PER_PAGE } from '@/utils/constants'

function createRootCategories(categories) {
  const withRootList = categories.map((category) => {
    if (category.name_alias) {
      const rootCategory = {
        id: category.id,
        name: category.name_alias,
        slug: category.slug
      }

      category.categories = [
        rootCategory,
        ...createRootCategories(category.categories)
      ]
    }

    return category
  })

  return withRootList
}

export const mutationTypes = {
  SET_CATEGORIES: 'SET_CATEGORIES',
  SET_ACTIVE_CATEGORY: 'SET_ACTIVE_CATEGORY',
  SET_PRODUCTS: 'SET_PRODUCTS',
  SET_ATTRIBUTES: 'SET_ATTRIBUTES',
  SET_FILTERS: 'SET_FILTERS',
  CLEAR_FILTERS: 'CLEAR_FILTERS',
  SET_CATALOG_DATA: 'SET_CATALOG_DATA',
  SET_ORDER: 'SET_ORDER',
  SET_SHOW_ITEMS_COUNT: 'SET_SHOW_ITEMS_COUNT',
  SET_LOADING_TOGGLE: 'SET_LOADING_TOGGLE',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
  SET_TOTAL_PAGES: 'SET_TOTAL_PAGES',
  RESET_META_DATA: 'RESET_META_DATA',
  SET_SEO_TEXT: 'SET_SEO_TEXT'
}

export const actionTypes = {
  GET_CATEGORIES: 'GET_CATEGORIES',
  GET_PRODUCTS: 'GET_PRODUCTS',
  GET_ATTRIBUTES: 'GET_ATTRIBUTES'
}

export const state = () => ({
  categories: [],
  activeCategory: null,
  products: [],
  attributes: [],
  filters: [],
  order: 'popularity',
  showItemsCount: 4,
  isLoading: false,
  currentPage: null,
  totalPages: null,
  seoText: ''
})

export const mutations = {
  [mutationTypes.SET_CATEGORIES](state, categories) {
    state.categories = categories
  },
  [mutationTypes.SET_ACTIVE_CATEGORY](state, activeCategory) {
    state.activeCategory = activeCategory
  },
  [mutationTypes.SET_PRODUCTS](state, products) {
    state.products = products
  },
  [mutationTypes.SET_ATTRIBUTES](state, attributes) {
    state.attributes = attributes
  },
  [mutationTypes.SET_CATALOG_DATA](state, { category, products, attributes }) {
    state.activeCategory = category
    state.products = products
    state.attributes = attributes
  },
  [mutationTypes.SET_ORDER](state, order) {
    state.order = order
  },
  [mutationTypes.SET_SHOW_ITEMS_COUNT](state, showItemsCount) {
    state.showItemsCount = showItemsCount
  },
  [mutationTypes.SET_FILTERS](state, filters) {
    state.filters = filters
  },
  [mutationTypes.CLEAR_FILTERS](state) {
    state.order = 'popularity'
    state.filters = []
  },
  [mutationTypes.SET_LOADING_TOGGLE](state, status) {
    state.isLoading = status
  },
  [mutationTypes.SET_CURRENT_PAGE](state, currentPage) {
    state.currentPage = currentPage
  },
  [mutationTypes.SET_TOTAL_PAGES](state, totalPages) {
    state.totalPages = totalPages
  },
  [mutationTypes.RESET_META_DATA](state) {
    state.filters = []
    state.order = 'popularity'
    state.currentPage = 1
  },
  [mutationTypes.SET_SEO_TEXT](state, seoText) {
    state.seoText = seoText
  }
}

export const actions = {
  async [actionTypes.GET_CATEGORIES]({ commit }) {
    // FIXME: temporary solution
    const STAGE_API_URL = 'https://back.virna.com.ua'
    const { data: categories } = await this.$axios.$get(
      `${STAGE_API_URL}/api/categories`
    )

    // const { data: categories } = await this.$axios.$get('/api/categories')
    const normilizedCategories = createRootCategories(categories)

    commit(mutationTypes.SET_CATEGORIES, normilizedCategories)
  },
  async [actionTypes.GET_PRODUCTS]({ commit }, { url, query }) {
    commit(mutationTypes.SET_LOADING_TOGGLE, true)

    // FIXME: temporary solution
    const STAGE_API_URL = 'https://back.virna.com.ua'
    const {
      data: { products },
      meta
    } = await this.$axios.$get(
      `${STAGE_API_URL}/api/router?url=${url}${query ? `&${query}` : ''}`
    )

    const totalPages = Math.ceil(meta.total / CATALOG_ITEMS_PER_PAGE)

    commit(mutationTypes.SET_PRODUCTS, products)
    commit(mutationTypes.SET_CURRENT_PAGE, meta.current_page)
    commit(mutationTypes.SET_TOTAL_PAGES, totalPages)
    commit(mutationTypes.SET_LOADING_TOGGLE, false)
  }
}

export const getters = {
  defaultCategorySlug(state) {
    // FIXME: temporary solution
    return state.categories[0].slug
  },
  optionLabel(state) {
    const { attributes } = state

    return (code, slug) => {
      const { options } = attributes.find((attr) => attr.code === code)
      const { label } = options.find((option) => option.slug === slug)
      return label
    }
  },
  selectedAttributeOptions(state) {
    const { filters } = state

    return (code) => {
      const filter = filters.find((filter) => filter.code === code)
      return filter ? filter.value : null
    }
  }
}
