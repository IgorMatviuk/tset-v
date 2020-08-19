export const mutationTypes = {
  SET_PRODUCT_DATA: 'SET_PRODUCT_DATA',
  SET_ACTIVE_VARIANT: 'SET_ACTIVE_VARIANT',
  SET_SECTIONS_DATA: 'SET_SECTIONS_DATA',
  SET_NAV_LINKS: 'SET_NAV_LINKS',
  SET_SELECTED_SIZE: 'SET_SELECTED_SIZE',
  SET_SELECTED_COLOR: 'SET_SELECTED_COLOR',
  SET_IMAGE_VIEWER_VISIBILITY_TOGGLE: 'SET_IMAGE_VIEWER_VISIBILITY_TOGGLE',
  SET_ACTIVE_PREVIEW: 'SET_ACTIVE_PREVIEW'
}

export const state = () => ({
  productData: {},
  sectionsData: {},
  activeVariant: {},
  links: {},
  selectedSize: null,
  selectedColor: null,
  imageViewerVisibility: false,
  activePreview: {}
})

export const mutations = {
  [mutationTypes.SET_PRODUCT_DATA](state, productData) {
    state.productData = productData
  },
  [mutationTypes.SET_ACTIVE_VARIANT](state, activeVariant) {
    state.activeVariant = activeVariant
  },
  [mutationTypes.SET_SECTIONS_DATA](state, sectionsData) {
    state.sectionsData = sectionsData
  },
  [mutationTypes.SET_NAV_LINKS](state, links) {
    state.links = links
  },
  [mutationTypes.SET_SELECTED_SIZE](state, size) {
    state.selectedSize = size
  },
  [mutationTypes.SET_SELECTED_COLOR](state, color) {
    state.selectedColor = color
  },
  [mutationTypes.SET_IMAGE_VIEWER_VISIBILITY_TOGGLE](state, status) {
    state.imageViewerVisibility = status
  },
  [mutationTypes.SET_ACTIVE_PREVIEW](state, preview) {
    state.activePreview = preview
  }
}

export const getters = {
  seoText(state) {
    return state.productData.attribute_family.description.description.value
  }
}
