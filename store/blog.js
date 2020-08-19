export const mutationTypes = {
  SET_LOADING_START: 'SET_LOADING_START',
  SET_LOADING_SUCCESS: 'SET_LOADING_SUCCESS',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE'
}

export const actionsTypes = {
  GET_BLOG_POSTS: 'GET_BLOG_POSTS'
}

export const state = () => ({
  posts: [],
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
    { posts, currentPage, totalPages }
  ) {
    state.posts = posts
    state.currentPage = currentPage
    state.totalPages = totalPages

    if (state.isLoading) {
      state.isLoading = false
    }
  }
}

export const actions = {
  async [actionsTypes.GET_BLOG_POSTS]({ commit }, params) {
    commit(mutationTypes.SET_LOADING_START, true)

    let query = Object.keys(params)
      .map((key) => `${key}=${encodeURI(params[key])}`)
      .join('&')

    if (!params.limit) {
      query += '&limit=8'
    }

    const { data, meta } = await this.$axios.$get(`api/posts?${query}`)

    const totalPages = Math.ceil(meta.total / (params.limit || 8))

    commit(mutationTypes.SET_LOADING_SUCCESS, {
      posts: data,
      currentPage: meta.current_page,
      totalPages
    })
  }
}
