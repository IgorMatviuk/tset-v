import { mapState } from 'vuex'

import { mutationTypes as catalogMutationTypes } from '@/store/catalog'

export default {
  computed: {
    ...mapState({
      currentPage: (state) => state.catalog.currentPage
    })
  },
  methods: {
    onPageChange(currentPage) {
      const query = {
        ...this.$route.query,
        page: currentPage
      }

      this.$store.commit(
        `catalog/${catalogMutationTypes.SET_CURRENT_PAGE}`,
        currentPage
      )

      this.$router.push({ path: this.$route.path, query })
    }
  }
}
