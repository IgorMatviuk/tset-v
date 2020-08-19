export const mutationTypes = {
  SET_MODAL_META: 'SET_MODAL_META',
  SET_MODAL_VISIBILITY_TOGGLE: 'SET_MODAL_VISIBILITY_TOGGLE',
  SET_MODAL_DATA: 'SET_MODAL_DATA',
  RESET_MODAL_STATE: 'RESET_MODAL_STATE'
}

function createInitialState() {
  return {
    form: {
      visible: false,
      meta: {
        name: '',
        title: '',
        fields: [],
        actionText: '',
        submitText: '',
        links: [],
        action: {}
      },
      data: {}
    },
    message: {
      visible: false,
      meta: {
        title: '',
        content: ''
      }
    },
    testimonials: {
      visible: false,
      data: {}
    }
  }
}

export const state = () => createInitialState()

export const mutations = {
  [mutationTypes.SET_MODAL_META](state, payload) {
    const { type, ...meta } = payload

    if (type === 'form' && meta.success) {
      state.message.meta = meta.success
    }

    state[type].meta = meta
  },
  [mutationTypes.SET_MODAL_VISIBILITY_TOGGLE](state, { type, status }) {
    state[type].visible = status
  },
  [mutationTypes.SET_MODAL_DATA](state, { type, data }) {
    state[type].data = data
  },
  [mutationTypes.RESET_MODAL_STATE](state) {
    const { form, message, testimonials } = createInitialState()

    state.form = form
    state.message = message
    state.testimonials = testimonials
  }
}
