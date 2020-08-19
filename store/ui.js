export const mutationTypes = {
  SET_PRELOADER_VISIBILITY_TOGGLE: 'SET_PRELOADER_VISIBILITY_TOGGLE',
  SET_BACKGROUND_REVEALED_TOGGLE: 'SET_BACKGROUND_REVEALED_TOGGLE',
  SET_CATEGORIES_DRAWER_VISIBILITY_TOGGLE:
    'SET_CATEGORIES_DRAWER_VISIBILITY_TOGGLE',
  SET_FILTERS_DRAWER_VISIBILITY_TOGGLE: 'SET_FILTERS_DRAWER_VISIBILITY_TOGGLE',
  SET_FLOAT_PANEL_VISIBILITY_TOGGLE: 'SET_FLOAT_PANEL_VISIBILITY_TOGGLE',
  SET_TERMS_OF_USE_VISIBILITY_TOGGLE: 'SET_TERMS_OF_USE_VISIBILITY_TOGGLE',
  SET_MOBILE_MENU_VISIBILITY_TOGGLE: 'SET_MOBILE_MENU_VISIBILITY_TOGGLE'
}

export const state = () => {
  return {
    isPreloaderVisible: true,
    isBackgroundRevealed: false,
    isCategoriesDrawerVisible: false,
    isFiltersDrawerVisible: false,
    isFloatPanelActive: false,
    isTermsOfUseVisible: false,
    isMobileMenuVisible: false
  }
}

export const mutations = {
  [mutationTypes.SET_PRELOADER_VISIBILITY_TOGGLE](state, status) {
    state.isPreloaderVisible = status
  },
  [mutationTypes.SET_BACKGROUND_REVEALED_TOGGLE](state, status) {
    state.isBackgroundRevealed = status
  },
  [mutationTypes.SET_CATEGORIES_DRAWER_VISIBILITY_TOGGLE](state, status) {
    state.isCategoriesDrawerVisible = status
  },
  [mutationTypes.SET_FILTERS_DRAWER_VISIBILITY_TOGGLE](state, status) {
    state.isFiltersDrawerVisible = status
  },
  [mutationTypes.SET_FLOAT_PANEL_VISIBILITY_TOGGLE](state, status) {
    state.isFloatPanelActive = status
  },
  [mutationTypes.SET_TERMS_OF_USE_VISIBILITY_TOGGLE](state, status) {
    state.isTermsOfUseVisible = status
  },
  [mutationTypes.SET_MOBILE_MENU_VISIBILITY_TOGGLE](state, status) {
    state.isMobileMenuVisible = status
  }
}
