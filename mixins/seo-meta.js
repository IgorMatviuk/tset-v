export default {
  head() {
    if (this.error) {
      return {
        title: this.$t('errorPage.title')
      }
    }

    const locale = this.$store.state.locale
    const tags = this.page.meta.tags || this.page.meta

    return {
      htmlAttrs: {
        lang: locale
      },
      title: tags.title,
      meta: [
        { hid: 'description', name: 'description', content: tags.description },
        { hid: 'keywords', name: 'keywords', content: tags.keywords },
        // prettier-ignore
        { hid: 'og:url', property: 'og:url', content: `${process.env.BASE_URL}${this.$route.path}` },
        { hid: 'og:title', property: 'og:title', content: tags.og_title },
        // prettier-ignore
        { hid: 'og:description', property: 'og:description', content: tags.og_description },
        { hid: 'og:image', property: 'og:image', content: tags.og_image }
      ]
    }
  }
}
