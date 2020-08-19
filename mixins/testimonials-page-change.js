import { mapState } from 'vuex'

import { mutationTypes as testimonialMutationTypes } from '~/store/testimonials'

export default {
  computed: {
    ...mapState({
      currentPage: (state) => state.testimonials.currentPage
    })
  },
  methods: {
    onPageChange(currentPage) {
      const query = {
        ...this.$route.query,
        page: currentPage
      }

      this.$store.commit(
        `testimonials/${testimonialMutationTypes.SET_CURRENT_PAGE}`,
        currentPage
      )

      this.$router.push({ path: this.$route.path, query })
    }
  }
}
