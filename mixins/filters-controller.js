import { mapState } from 'vuex'

import { mutationTypes as catalogMutationTypes } from '@/store/catalog'

export default {
  computed: {
    ...mapState({
      currLocale: (state) => state.locale,
      activeCategory: (state) => state.catalog.activeCategory,
      attributes: (state) => state.catalog.attributes
    })
  },
  methods: {
    getFilterSelections() {
      const filters = this.$refs.filterGroup.reduce(
        (selectedFilters, filterGroup) => {
          if (filterGroup.selected.length) {
            const { options: attributeOptions } = this.attributes.find(
              (attr) => attr.code === filterGroup.attribute.code
            )

            const optionsValue = [...filterGroup.selected].sort((a, b) => {
              const sourceAIndex = attributeOptions.findIndex(
                (x) => x.slug === a
              )
              const sourceBIndex = attributeOptions.findIndex(
                (x) => x.slug === b
              )

              if (sourceAIndex < sourceBIndex) return -1
              if (sourceAIndex > sourceBIndex) return 1

              return 0
            })

            const code = filterGroup.attribute.code
            const label = filterGroup.attribute.name
            const value = optionsValue

            selectedFilters.push({ code, label, value })
          }

          return selectedFilters
        },
        []
      )

      return filters
    },
    getFilterPath(filters) {
      const path = filters
        .map((filter) => {
          const values = filter.value.join('_')
          return `${filter.code}_${values}`
        })
        .join('/')

      return path
    },
    getQueryParams() {
      const query = {}

      if (this.$route.query.order && this.$route.query.order !== 'popularity') {
        query.order = this.$route.query.order
      }

      return query
    },
    getInitialRoutePath() {
      const localeRegExp = new RegExp(`^/${this.currLocale}/`)
      const path = this.$route.path.replace(localeRegExp, '/')

      if (this.activeCategory) {
        const { slug } = this.activeCategory
        const { length } = slug
        const index = path.lastIndexOf(slug)
        const categoryPath = path.slice(1, index + length)

        return this.$i18n.path(categoryPath)
      }

      const [, initialPath] = path.match(/^\/([^/]+)\/?/)

      return this.$i18n.path(initialPath)
    },
    applyFilters() {
      const seletedFilters = this.getFilterSelections()
      const filterPath = this.getFilterPath(seletedFilters)
      const query = this.getQueryParams()

      this.$store.commit(
        `catalog/${catalogMutationTypes.SET_FILTERS}`,
        seletedFilters
      )

      const routePath = filterPath
        ? `${this.getInitialRoutePath()}/${filterPath}`
        : this.getInitialRoutePath()

      this.$router.push({ path: routePath, query })
    },
    clearFilters() {
      this.$store.commit(`catalog/${catalogMutationTypes.CLEAR_FILTERS}`)

      const routePath = this.getInitialRoutePath()
      this.$router.push({ path: routePath })
    }
  }
}
