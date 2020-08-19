<template>
  <main class="testimonial-page">
    <TheBreadcrumb />
    <BlockTestimonials
      class="testimonial-page__featured"
      :testimonials="page.data.featured_testimonials"
      :is-testimonials-page="true"
    />
    <BlockTestimonialsList
      :testimonials="testimonialItems"
      :is-loading="isLoading"
      class="testimonial-page__list"
    />
  </main>
</template>

<script>
import TheBreadcrumb from '@/components/layout/breadcrumb/TheBreadcrumb'
import BlockTestimonials from '@/components/blocks/BlockTestimonials'
import BlockTestimonialsList from '@/components/blocks/BlockTestimonials/BlockTestimonialsList'

import { mutationTypes as rootMutationTypes } from '@/store'
import { mutationTypes as testimonialsMutationTypes } from '@/store/testimonials'

import seoMeta from '@/mixins/seo-meta'
import pageActions from '@/utils/page-actions'
import createBreadcrumb from '@/utils/breadcrumb'

export default {
  components: {
    TheBreadcrumb,
    BlockTestimonials,
    BlockTestimonialsList
  },
  mixins: [seoMeta],
  async asyncData({ app, store, route }) {
    const items = [{ text: app.i18n.t('pages.testimonials'), active: true }]

    const breadcrumb = createBreadcrumb(
      app.i18n.t.bind(app.i18n),
      app.i18n,
      items
    )

    store.commit(rootMutationTypes.SET_BREADCRUMB, breadcrumb)

    const queryPage = route.query.page || 1
    const queryLimit = route.query.limit || 8

    const page = await app.$axios.$get(
      `/api/pages/testimonials?page=${queryPage}&limit=${queryLimit}`
    )

    const totalPages = Math.ceil(page.meta.total / queryLimit)

    store.commit(
      `testimonials/${testimonialsMutationTypes.SET_LOADING_SUCCESS}`,
      {
        items: page.data.testimonials,
        currentPage: page.meta.current_page,
        totalPages
      }
    )

    return { page }
  },
  computed: {
    isLoading() {
      return this.$store.state.testimonials.isLoading
    },
    testimonialItems() {
      return this.$store.state.testimonials.items
    }
  },
  watch: {
    isLoading: 'scrollToTop',
    $route: 'fetchTestimonials'
  },
  methods: {
    async fetchTestimonials() {
      await pageActions.testimonials({ store: this.$store, route: this.$route })
    },
    scrollToTop(nextStatus, prevStatus) {
      if (!nextStatus && prevStatus) {
        this.$scrollTo(document.body, 800, { force: true })
      }
    }
  }
}
</script>

<style lang="scss">
.testimonial-page {
  padding-bottom: 60px;

  &__list {
    margin-top: 9px;
  }

  @include media-breakpoint-up(md) {
    padding-bottom: 46px;

    &__list {
      margin-top: 0;
    }
  }

  @include media-breakpoint-up(xl) {
    padding-bottom: 76px;
  }

  @include media-breakpoint-up(xxl) {
    padding-bottom: 100px;

    &__list {
      margin-top: 10px;
    }
  }
}
</style>
