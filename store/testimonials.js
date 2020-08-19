export const mutationTypes = {
  SET_LOADING_START: 'SET_LOADING_START',
  SET_LOADING_SUCCESS: 'SET_LOADING_SUCCESS',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE'
}

export const actionTypes = {
  GET_TESTIMONIALS: 'GET_TESTIMONIALS'
}

export const state = () => ({
  items: [],
  isLoading: false,
  currentPage: null,
  totalPages: null
})

export const mutations = {
  [mutationTypes.SET_LOADING_START](state, status) {
    state.isLoading = status
  },
  [mutationTypes.SET_CURRENT_PAGE](state, currentPage) {
    state.currentPage = currentPage
  },
  [mutationTypes.SET_LOADING_SUCCESS](
    state,
    { items, currentPage, totalPages }
  ) {
    state.items = items
    state.currentPage = currentPage
    state.totalPages = totalPages

    if (state.isLoading) {
      state.isLoading = false
    }
  }
}

export const actions = {
  async [actionTypes.GET_TESTIMONIALS]({ commit }, params) {
    commit(mutationTypes.SET_LOADING_START, true)

    let query = Object.keys(params)
      .map((key) => `${key}=${encodeURI(params[key])}`)
      .join('&')

    // TODO: _limit => limit
    if (!params.limit) {
      query += '&_limit=8'
    }

    const { data: testimonials, meta } = await this.$axios.$get(
      `api/testimonials?${query}`
    )

    const totalPages = Math.ceil(meta.total / (params.limit || 8))

    commit(mutationTypes.SET_LOADING_SUCCESS, {
      items: testimonials,
      currentPage: meta.current_page,
      totalPages
    })
  }
}
