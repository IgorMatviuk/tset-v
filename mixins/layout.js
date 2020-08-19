import { mapState } from 'vuex'

import { mutationTypes as uiMutationTypes } from '@/store/ui'
import { mutationTypes as modalMutationTypes } from '@/store/modal'
import { actionTypes as cartActionTypes } from '@/store/cart'

export default {
  head() {
    return {
      bodyAttrs: {
        class: (this.bodyIsHidden && 'is-overflowed') || ''
      }
    }
  },
  computed: {
    ...mapState({
      banner: (state) => state.globals.banner,
      isCategoriesDrawerVisible: (state) => state.ui.isCategoriesDrawerVisible,
      isFiltersDrawerVisible: (state) => state.ui.isFiltersDrawerVisible,
      isMobileMenuVisible: (state) => state.ui.isMobileMenuVisible,
      localStorage: (state) => state.localStorage
    }),
    bodyIsHidden() {
      return (
        this.isCategoriesDrawerVisible ||
        this.isFiltersDrawerVisible ||
        this.isMobileMenuVisible
      )
    }
  },
  mounted() {
    /* -------- DO NOT REMOVE THIS (WOKRS ONLY IN BROWSER) -------- */
    const cartId = this.localStorage.cartId
    cartId && this.$store.dispatch(`cart/${cartActionTypes.GET_CART}`, cartId)

    const isTermsWereShown = localStorage.getItem('termsOfUseStatus')

    window.addEventListener('load', () => {
      const appLoadedEvent = window.createEvent('app:loaded')

      document.documentElement.dispatchEvent(appLoadedEvent)
      document.documentElement.addEventListener('preloader:done', () => {
        this.$store.commit(
          `ui/${uiMutationTypes.SET_PRELOADER_VISIBILITY_TOGGLE}`,
          false
        )

        /* istanbul ignore else */
        if (!isTermsWereShown) {
          localStorage.setItem('termsOfUseStatus', true)

          setTimeout(this.showTermsOfUse, 3000)
        }
      })
    })

    this.$root.$on('bv::modal::hide', (bvEvent, modalId) => {
      const modalType = modalId.replace('modal', '').toLowerCase()

      this.$store.commit(
        `modal/${modalMutationTypes.SET_MODAL_VISIBILITY_TOGGLE}`,
        { type: modalType, status: false }
      )

      if (modalType === 'message') {
        // Wait for animation complete
        setTimeout(
          () =>
            this.$store.commit(`modal/${modalMutationTypes.RESET_MODAL_STATE}`),
          300
        )
      }
    })
  },
  methods: {
    showTermsOfUse() {
      this.$store.commit(
        `ui/${uiMutationTypes.SET_TERMS_OF_USE_VISIBILITY_TOGGLE}`,
        true
      )
    }
  }
}
