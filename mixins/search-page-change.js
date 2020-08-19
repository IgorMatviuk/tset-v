import { mapState } from 'vuex'

import { mutationTypes as searchMutationTypes } from '@/store/search'

export default {
  computed: {
    ...mapState({
      currentPage: (state) => state.search.currentPage
    })
  },
  methods: {
    onPageChange(currentPage) {
      const query = {
        ...this.$route.query,
        page: currentPage
      }

      this.$store.commit(
        `search/${searchMutationTypes.SET_CURRENT_PAGE}`,
        currentPage
      )

      this.$router.push({ path: this.$route.path, query })
    }
  }
}
