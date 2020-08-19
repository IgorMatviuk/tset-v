import createBreadcrumb from '@/utils/breadcrumb'

/**
 * Create breadcrumb list
 * @param {object} config
 * @param {boolean} config.isStaticPage
 * @param {string} config.pageName
 */
export default (config = { isStaticPage: false }) => {
  return {
    computed: {
      breadcrumb() {
        const items = config.isStaticPage
          ? [{ text: this.$t(`pages.${config.pageName}`), active: true }]
          : this.$store.state.breadcrumb
        return createBreadcrumb(this.$t.bind(this), this.$i18n, items)
      }
    }
  }
}
