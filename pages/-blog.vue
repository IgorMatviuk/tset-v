<template>
  <main class="blog-page">
    <TheBreadcrumb :is-float="true" :items="breadcrumb" />
    <BlockJumbotron
      ref="heroSection"
      class="blog-page__jumbotron"
      :content="heroContent"
    >
      <div>{{ $t('blogPage.title') }}</div>
      <div>{{ $t('blogPage.subtitle') }}</div>
    </BlockJumbotron>
    <BlockBlogGrid :posts="posts" :is-loading="isLoading" />
  </main>
</template>

<script>
import TheBreadcrumb from '@/components/layout/breadcrumb/TheBreadcrumb'
import BlockJumbotron from '@/components/shared/BlockJumbotron'
import BlockBlogGrid from '@/components/blocks/BlockBlogGrid'

import { mutationTypes as rootMutationTypes } from '@/store'
import { mutationTypes as blogMutationsTypes } from '@/store/blog'

import seoMeta from '@/mixins/seo-meta'
import breadcrumb from '@/mixins/breadrumb'
import pageActions from '@/utils/page-actions'

export default {
  components: {
    TheBreadcrumb,
    BlockJumbotron,
    BlockBlogGrid
  },
  mixins: [seoMeta, breadcrumb({ isStaticPage: true, pageName: 'blog' })],
  async asyncData({ app, store, route, error }) {
    store.commit(rootMutationTypes.SET_PAGE_TYPE, 'blog')

    const queryPage = route.query.page || 1
    const queryLimit = route.query.limit || 8

    let page

    try {
      page = await app.$axios.$get(
        `/api/pages/blog?page=${queryPage}&limit=${queryLimit}`
      )
    } catch (err) {
      error({ statusCode: 404, message: 'Page not found' })
      return {}
    }

    const totalPages = Math.ceil(page.meta.total / queryLimit)

    store.commit(`blog/${blogMutationsTypes.SET_LOADING_SUCCESS}`, {
      posts: page.data,
      currentPage: page.meta.current_page,
      totalPages
    })

    return { page }
  },
  data() {
    return {
      heroContent: {
        images: {
          background_xl: '/img/blog/background_xl.jpg',
          background_lg: '/img/blog/background_lg.jpg',
          background_md: '/img/blog/background_md.jpg',
          background_sm: '/img/blog/background_sm.jpg',
          background_xs: '/img/blog/background_xs.jpg'
        }
      }
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.blog.isLoading
    },
    posts() {
      return this.$store.state.blog.posts
    }
  },
  watch: {
    isLoading: 'scrollToTop',
    $route: 'fetchPosts'
  },
  methods: {
    async fetchPosts() {
      await pageActions.blog({ store: this.$store, route: this.$route })
    },
    scrollToTop(nextStatus, prevStatus) {
      const offset = this.$refs.heroSection.$el.offsetHeight

      if (!nextStatus && prevStatus) {
        this.$scrollTo(document.body, 800, { force: true, offset })
      }
    }
  }
}
</script>

<style lang="scss">
.blog-page {
  padding-bottom: 65px;

  &__jumbotron {
    margin-bottom: 23px;
  }

  @include media-breakpoint-up(md) {
    padding-bottom: 47px;

    &__jumbotron {
      margin-bottom: 31px;
    }
  }

  @include media-breakpoint-up(lg) {
    padding-bottom: 64px;
  }

  @include media-breakpoint-up(xl) {
    padding-bottom: 80px;

    &__jumbotron {
      margin-bottom: 20px;
    }
  }

  @include media-breakpoint-up(xxl) {
    padding-bottom: 100px;
  }
}
</style>
