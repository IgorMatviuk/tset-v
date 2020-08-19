<template>
  <main class="post-page">
    <TheBreadcrumb :items="breadcrumb" />
    <BlockPostHero :content="page.data.post" />
    <hr class="post-page__delimiter" />
    <template v-for="(block, index) in page.data.post.blocks">
      <BlockPostTextContent
        v-if="block.type === 'text'"
        :key="index"
        :content="block.content"
      />
      <BlockPostSlider
        v-else-if="block.type === 'slider'"
        :key="index"
        :items="block.content.items"
      />
      <BlockPostVideo
        v-else-if="block.type === 'video'"
        :key="index"
        :content="block.content"
      />
    </template>
    <BlockPostRelatedSlider :posts="page.data.related_posts" />
    <BlockPostNavigation :links="page.links" />
  </main>
</template>

<script>
import TheBreadcrumb from '@/components/layout/breadcrumb/TheBreadcrumb'
import BlockPostHero from '@/components/blocks/BlockPost/BlockPostHero'
import BlockPostTextContent from '@/components/blocks/BlockPost/BlockPostTextContent'
import BlockPostSlider from '@/components/blocks/BlockPost/BlockPostSlider'
import BlockPostVideo from '@/components/blocks/BlockPost/BlockPostVideo'
import BlockPostRelatedSlider from '@/components/blocks/BlockPost/BlockPostRelatedSlider'
import BlockPostNavigation from '@/components/blocks/BlockPost/BlockPostNavigation'

import { mutationTypes as rootMutationTypes } from '@/store'

import seoMeta from '@/mixins/seo-meta'
import breadrumb from '@/mixins/breadrumb'

export default {
  components: {
    TheBreadcrumb,
    BlockPostHero,
    BlockPostTextContent,
    BlockPostSlider,
    BlockPostVideo,
    BlockPostRelatedSlider,
    BlockPostNavigation
  },
  mixins: [seoMeta, breadrumb()],
  async asyncData({ app, store, route, error }) {
    store.commit(rootMutationTypes.SET_PAGE_TYPE, 'post')

    const slug = route.params.slug

    let page

    try {
      page = await app.$axios.$get(`/api/posts/${slug}`)
    } catch (err) {
      error({ statusCode: 404, message: 'Page not found' })
      return {}
    }

    const breacrumb = [
      {
        text: app.i18n.t('pages.blog'),
        href: app.i18n.path('blog')
      },
      {
        text: page.data.post.title,
        href: app.i18n.path(`blog/${page.data.post.slug}`)
      }
    ]

    store.commit(rootMutationTypes.SET_BREADCRUMB, breacrumb)

    return { page }
  }
}
</script>

<style lang="scss">
.post-page {
  padding-bottom: 59px;

  &__delimiter {
    max-width: 510px;
    margin-top: 25px;
    margin-right: 15px;
    margin-bottom: 18px;
    margin-left: 15px;
    border-top: 2px solid $primary-light-2;

    @media only screen and (min-width: 540px) {
      margin-right: auto;
      margin-left: auto;
    }
  }

  @include media-breakpoint-up(md) {
    padding-bottom: 26px;

    &__delimiter {
      max-width: 450px;
      margin-top: 69px;
      margin-bottom: 20px;
    }
  }

  @include media-breakpoint-up(lg) {
    padding-bottom: 47px;

    &__delimiter {
      max-width: 610px;
      margin-top: 56px;
    }
  }

  @include media-breakpoint-up(xl) {
    padding-bottom: 61px;

    &__delimiter {
      max-width: 770px;
      margin-top: 40px;
    }
  }

  @include media-breakpoint-up(xxl) {
    padding-bottom: 93px;

    &__delimiter {
      max-width: 930px;
      margin-top: 51px;
    }
  }
}
</style>
