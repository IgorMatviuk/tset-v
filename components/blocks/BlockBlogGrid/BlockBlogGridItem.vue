<template>
  <div class="blog-item">
    <div class="blog-item__preview">
      <BButton
        class="blog-item__link"
        :to="$i18n.path(`blog/${post.slug}`)"
        variant="outline-light"
      >
        {{ $t('buttons.readPost') }}
      </BButton>
      <div class="blog-item__overlay"></div>
      <div class="blog-item__image-wrapper">
        <ImageLoader>
          <picture>
            <source
              :data-srcset="post.base_image.post_xl | webp"
              srcset="/img/stub.png"
              media="(min-width: 1500px)"
              type="image/webp"
            />
            <source
              :data-srcset="post.base_image.post_xl"
              srcset="/img/stub.png"
              media="(min-width: 1500px)"
            />
            <source
              :data-srcset="post.base_image.post_lg | webp"
              srcset="/img/stub.png"
              media="(min-width: 1200px)"
              type="image/webp"
            />
            <source
              :data-srcset="post.base_image.post_lg"
              srcset="/img/stub.png"
              media="(min-width: 1200px)"
            />
            <source
              :data-srcset="post.base_image.post_md | webp"
              srcset="/img/stub.png"
              media="(min-width: 992px)"
              type="image/webp"
            />
            <source
              :data-srcset="post.base_image.post_md"
              srcset="/img/stub.png"
              media="(min-width: 992px)"
            />
            <source
              :data-srcset="post.base_image.post_sm | webp"
              srcset="/img/stub.png"
              media="(min-width: 768px)"
              type="image/webp"
            />
            <source
              :data-srcset="post.base_image.post_sm"
              srcset="/img/stub.png"
              media="(min-width: 768px)"
            />
            <source
              :data-srcset="post.base_image.post_xs | webp"
              srcset="/img/stub.png"
              type="image/webp"
            />
            <img
              :data-src="post.base_image.post_xs"
              :title="post.title"
              :alt="post.title"
              src="/img/stub.png"
              class="blog-item__image lazyload"
              loading="lazy"
              data-object-fit="cover"
              data-object-position="center"
            />
          </picture>
        </ImageLoader>
      </div>
    </div>
    <div class="blog-item__body">
      <div class="blog-item__title">{{ post.title }}</div>
      <div class="blog-item__date">{{ post.published_at }}</div>
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
    isFeatured: {
      type: Boolean,
      default: () => false
    },
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
.blog-item {
  position: relative;
  display: flex;
  margin-bottom: 20px;

  &__preview {
    position: relative;
    flex-basis: 150px;
    flex-shrink: 0;
  }

  &__link {
    position: absolute;
    bottom: 10px;
    left: 50%;
    z-index: 3;
    min-width: 130px;
    height: 35px;
    font-size: 13px;
    font-weight: 500;
    line-height: 33px;
    transform: translateX(-50%);
  }

  &__overlay {
    display: none;
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

  &__body {
    flex-grow: 1;
    padding-left: 15px;
  }

  &__title {
    display: -webkit-box;
    height: 80px;
    margin-bottom: 35px;
    overflow: hidden;
    font-size: 13px;
    font-weight: 300;
    line-height: 20px;
    text-transform: uppercase;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }

  &__date {
    position: relative;
    font-size: 14px;
    font-weight: 300;
    line-height: 18px;
    color: $gray-dark-2;

    &::after {
      position: absolute;
      top: -21px;
      left: 0;
      width: 37px;
      height: 4px;
      content: '';
      background-color: $primary-light-1;
    }
  }

  @include media-breakpoint-up(md) {
    display: block;
    grid-row-end: span 2;
    margin-bottom: 0;

    &:first-of-type {
      grid-row-end: span 1;
    }

    &:first-of-type &__image-wrapper {
      height: 410px;
      padding-bottom: 0;
    }

    &__link {
      top: 50%;
      bottom: unset;
      min-width: 180px;
      height: 40px;
      font-size: 14px;
      line-height: 38px;
      transform: translateX(-50%) translateY(-50%);
    }

    &__body {
      padding-top: 16px;
      padding-left: 0;
    }

    &__title {
      height: 60px;
      margin-bottom: 32px;
      font-size: 16px;
      line-height: 20px;
      text-align: center;
      -webkit-line-clamp: 3;
    }

    &__date {
      text-align: center;

      &::after {
        top: -18px;
        left: 50%;
        width: 70px;
        height: 4px;
        transform: translateX(-50%);
      }
    }
  }

  @include media-breakpoint-up(lg) {
    &:first-of-type &__image-wrapper {
      height: 555px;
    }

    &__title {
      height: 40px;
      -webkit-line-clamp: 2;
    }
  }

  @include media-breakpoint-up(xl) {
    &:first-of-type &__image-wrapper {
      height: 706px;
    }

    &__overlay {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 2;
      display: block;
      background-color: $black-light-1;
      opacity: 0;
      transition: opacity 0.5s, t;
    }

    &:hover &__overlay {
      opacity: 1;
    }

    &__link {
      top: calc(50% - 20px);
      left: calc(50% - 90px);
      opacity: 0;
      transition: opacity 0.5s, transform 0.5s;
      transform: translateY(25px);
    }

    &:hover &__link {
      opacity: 1;
      transform: translateY(0);
    }

    &__body {
      padding-top: 21px;
    }

    &__title {
      height: 50px;
      margin-bottom: 34px;
      font-size: 20px;
      line-height: 25px;
    }
  }

  @include media-breakpoint-up(xxl) {
    &:first-of-type &__image-wrapper {
      height: 855px;
    }

    &__body {
      padding-top: 32px;
      padding-right: 50px;
      padding-left: 50px;
    }
  }
}
</style>
