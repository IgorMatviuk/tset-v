import { mapState } from 'vuex'

import { mutationTypes as blogMutationTypes } from '~/store/blog'

export default {
  computed: {
    ...mapState({
      currentPage: (state) => state.blog.currentPage
    })
  },
  methods: {
    onPageChange(currentPage) {
      const query = {
        ...this.$route.query,
        page: currentPage
      }

      this.$store.commit(
        `blog/${blogMutationTypes.SET_CURRENT_PAGE}`,
        currentPage
      )

      this.$router.push({ path: this.$route.path, query })
    }
  }
}
