<template>
  <div class="related-post">
    <div class="related-post__preview">
      <div class="related-post__image-wrapper">
        <ImageLoader>
          <picture>
            <source
              :data-srcset="post.base_image.post_xs | webp"
              srcset="/img/stub.png"
              type="image/webp"
            />
            <img
              :data-src="post.base_image.post_xs"
              src="/img/stub.png"
              :title="post.title"
              :alt="post.title"
              class="related-post__image lazyload"
              loading="lazy"
              data-object-fit="cover"
              data-object-position="center"
            />
          </picture>
        </ImageLoader>
      </div>
    </div>
    <NuxtLink
      :to="$i18n.path(`blog/${post.slug}`)"
      class="related-post__title"
      >{{ post.title }}</NuxtLink
    >
    <div class="related-post__date">
      {{ post.published_at }}
    </div>
  </div>
</template>

<script>
import ImageLoader from '@/components/shared/ImageLoader'

import imageNextGen from '@/mixins/image-next-gen'

export default {
  components: {
    ImageLoader
  },
  mixins: [imageNextGen],
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
.related-post {
  position: relative;

  &__preview {
    width: 100%;
    margin-bottom: 14px;
  }

  &__image-wrapper {
    position: relative;
    height: 1px;
    padding-bottom: $preview-aspect-ratio;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  &__title {
    display: -webkit-box;
    height: 36px;
    padding-right: 15px;
    padding-left: 15px;
    margin-bottom: 26px;
    overflow: hidden;
    font-size: 14px;
    font-weight: 300;
    line-height: 18px;
    text-align: center;
    text-transform: uppercase;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    @include hover-focus-active {
      color: $black;
    }

    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      content: '';
    }
  }

  &__date {
    position: relative;
    font-size: 14px;
    font-weight: 300;
    line-height: 18px;
    color: $gray-dark-2;
    text-align: center;

    &::after {
      position: absolute;
      top: -15px;
      left: 50%;
      width: 70px;
      height: 4px;
      content: '';
      background-color: $primary-light-1;
      transform: translateX(-50%);
    }
  }

  @include media-breakpoint-up(md) {
    &__preview {
      margin-bottom: 9px;
    }

    &__title {
      height: 45px;
      padding: 0;
      margin-bottom: 27px;
      font-size: 12px;
      line-height: 15px;
      -webkit-line-clamp: 3;
    }

    &__date {
      &::after {
        top: -14px;
      }
    }
  }

  @include media-breakpoint-up(xl) {
    &__preview {
      margin-bottom: 16px;
    }

    &__title {
      height: 32px;
      margin-bottom: 29px;
      font-size: 13px;
      line-height: 16px;
      -webkit-line-clamp: 2;
    }
  }

  @include media-breakpoint-up(xxl) {
    &__title {
      font-size: 14px;
      line-height: 18px;
    }
  }
}
</style>
