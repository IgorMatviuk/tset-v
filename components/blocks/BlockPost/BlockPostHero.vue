<template>
  <div class="post-hero">
    <BContainer class="post-hero__container">
      <h1 class="post-hero__title">
        {{ content.title }}
      </h1>
      <div class="post-hero__date">
        {{ content.published_at }}
      </div>
      <div class="post-hero__preview">
        <div class="post-hero__image-wrapper">
          <ImageLoader>
            <picture>
              <source
                :data-srcset="content.base_image.post_main_xl | webp"
                srcset="/img/stub.png"
                media="(min-width: 1500px)"
                type="image/webp"
              />
              <source
                :data-srcset="content.base_image.post_main_xl"
                srcset="/img/stub.png"
                media="(min-width: 1500px)"
              />
              <source
                :data-srcset="content.base_image.post_main_lg | webp"
                srcset="/img/stub.png"
                media="(min-width: 1200px)"
                type="image/webp"
              />
              <source
                :data-srcset="content.base_image.post_main_lg"
                srcset="/img/stub.png"
                media="(min-width: 1200px)"
              />
              <source
                :data-srcset="content.base_image.post_main_md | webp"
                srcset="/img/stub.png"
                media="(min-width: 992px)"
                type="image/webp"
              />
              <source
                :data-srcset="content.base_image.post_main_md"
                srcset="/img/stub.png"
                media="(min-width: 992px)"
              />
              <source
                :data-srcset="content.base_image.post_main_sm | webp"
                srcset="/img/stub.png"
                media="(min-width: 768px)"
                type="image/webp"
              />
              <source
                :data-srcset="content.base_image.post_main_sm"
                srcset="/img/stub.png"
                media="(min-width: 768px)"
              />
              <source
                :data-srcset="content.base_image.post_main_xs | webp"
                srcset="/img/stub.png"
                type="image/webp"
              />
              <img
                :data-src="content.base_image.post_main_xs"
                :title="content.title"
                :alt="content.title"
                src="/img/stub.png"
                class="post-hero__image lazyload"
                loading="lazy"
                data-object-fit="cover"
                data-object-position="center"
              />
            </picture>
          </ImageLoader>
        </div>
      </div>
    </BContainer>
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
    content: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
.post-hero {
  .lazyload,
  .lazyloading {
    opacity: 0;
  }

  .lazyloaded {
    opacity: 1;
    transition: opacity 0.3s;
  }

  &__title {
    margin-bottom: 31px;
    font-size: 20px;
    font-weight: 400;
    line-height: 25px;
    text-align: center;
    text-transform: uppercase;
  }

  &__date {
    position: relative;
    margin-bottom: 18px;
    font-size: 14px;
    line-height: 18px;
    color: $gray-dark-2;
    text-align: center;

    &::after {
      position: absolute;
      top: -16px;
      left: 50%;
      width: 70px;
      height: 4px;
      content: '';
      background-color: $primary-light-1;
      transform: translateX(-50%);
    }
  }

  &__preview {
    margin-right: -15px;
    margin-left: -15px;

    @media only screen and (min-width: 540px) {
      margin-right: 0;
      margin-left: 0;
    }
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

  @include media-breakpoint-up(md) {
    position: relative;

    &__container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-height: 405px;
      padding-top: 28px;
      padding-bottom: 25px;
    }

    &__title,
    &__date {
      @include make-col-offset(7);
    }

    &__title {
      font-size: 19px;
      line-height: 24px;
    }

    &__date {
      margin-bottom: 0;
    }

    &__preview {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 55.9895833333%;
      height: 100%;
    }

    &__image-wrapper {
      height: 100%;
      padding-bottom: unset;
    }
  }

  @include media-breakpoint-up(lg) {
    &__container {
      min-height: 516px;
      padding-bottom: 35px;
    }

    &__title {
      font-size: 26px;
      line-height: 33px;
    }

    &__preview {
      width: 56.55%;
    }
  }

  @include media-breakpoint-up(xl) {
    &__container {
      position: relative;
      min-height: 635px;
      padding-top: 32px;
    }

    &__title {
      margin-bottom: 44px;
      font-size: 34px;
      line-height: 43px;
    }

    &__preview {
      left: 15px;
      width: 55.75%;
    }
  }

  @include media-breakpoint-up(xxl) {
    &__container {
      min-height: 768px;
      padding-bottom: 55px;
    }

    &__title {
      font-size: 35px;
      line-height: 44px;
    }

    &__date {
      &::after {
        top: -19px;
      }
    }

    &__preview {
      width: 56.25%;
    }
  }
}
</style>
