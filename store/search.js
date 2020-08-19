export const mutationTypes = {
  SET_LOADING_START: 'SET_LOADING_START',
  SET_LOADING_SUCCESS: 'SET_LOADING_SUCCESS',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
  SET_TOTAL_PAGES: 'SET_TOTAL_PAGES'
}

export const actionTypes = {
  GET_PRODUCTS: 'GET_PRODUCTS'
}

export const state = () => ({
  products: [],
  query: '',
  isLoading: false,
  currentPage: null,
  totalPages: null
})

export const mutations = {
  [mutationTypes.SET_LOADING_START](state) {
    state.isLoading = true
  },
  [mutationTypes.SET_LOADING_SUCCESS](state, products) {
    state.products = products
    state.isLoading = false
  },
  [mutationTypes.SET_SEARCH_QUERY](state, query) {
    state.query = query
  },
  [mutationTypes.SET_CURRENT_PAGE](state, currentPage) {
    state.currentPage = currentPage
  },
  [mutationTypes.SET_TOTAL_PAGES](state, totalPages) {
    state.totalPages = totalPages
  }
}

export const actions = {
  async [actionTypes.GET_PRODUCTS]({ commit }, { query, page }) {
    commit(mutationTypes.SET_LOADING_START, true)

    const encodedQuery = !/^(%[0-9a-f]{2})+$/.test(query)
      ? encodeURIComponent(query)
      : query

    let queryStr = `q=${encodedQuery}`

    if (page) {
      queryStr += `&page=${page}`
    }

    // FIXME: temporary solution
    const STAGE_API_URL = 'https://back.virna.com.ua'
    const { data: products, meta } = await this.$axios.$get(
      `${STAGE_API_URL}/api/search?${queryStr}`
    )

    commit(mutationTypes.SET_LOADING_SUCCESS, products)
    commit(mutationTypes.SET_SEARCH_QUERY, query)
    commit(mutationTypes.SET_CURRENT_PAGE, meta.current_page)
    commit(mutationTypes.SET_TOTAL_PAGES, meta.total)
  }
}
