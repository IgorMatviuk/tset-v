<template>
  <div class="block-jumbotron">
    <BContainer class="block-jumbotron__container">
      <picture>
        <source
          :data-srcset="content.images.background_xl | webp"
          srcset="/img/stub.png"
          type="image/webp"
          media="(min-width: 1500px)"
        />
        <source
          :data-srcset="content.images.background_xl"
          srcset="/img/stub.png"
          type="image/jpeg"
          media="(min-width: 1500px)"
        />
        <source
          :data-srcset="content.images.background_lg | webp"
          srcset="/img/stub.png"
          type="image/webp"
          media="(min-width: 1200px)"
        />
        <source
          :data-srcset="content.images.background_lg"
          srcset="/img/stub.png"
          type="image/jpeg"
          media="(min-width: 1200px)"
        />
        <source
          :data-srcset="content.images.background_md | webp"
          srcset="/img/stub.png"
          type="image/webp"
          media="(min-width: 992px)"
        />
        <source
          :data-srcset="content.images.background_md"
          srcset="/img/stub.png"
          type="image/jpeg"
          media="(min-width: 992px)"
        />
        <source
          :data-srcset="content.images.background_sm | webp"
          srcset="/img/stub.png"
          type="image/webp"
          media="(min-width: 768px)"
        />
        <source
          :data-srcset="content.images.background_sm"
          srcset="/img/stub.png"
          type="image/jpeg"
          media="(min-width: 768px)"
        />
        <source
          :data-srcset="content.images.background_xs | webp"
          srcset="/img/stub.png"
          type="image/webp"
        />
        <img
          :data-srcset="content.images.background_xs"
          src="/img/stub.png"
          :alt="content.title"
          class="block-jumbotron__image lazyload"
          loading="lazy"
          width="100"
          height="100"
          data-object-fit="cover"
          data-object-position="center bottom"
        />
      </picture>
      <h1 class="block-jumbotron__title">
        <slot></slot>
      </h1>
    </BContainer>
  </div>
</template>

<script>
import imageNextGen from '@/mixins/image-next-gen'

export default {
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
.block-jumbotron {
  position: relative;
  height: 340px;

  .lazyload,
  .lazyloading {
    opacity: 0;
  }

  .lazyloaded {
    opacity: 1;
    transition: opacity 0.3s;
  }

  &__container {
    display: flex;
    align-items: center;
    height: 100%;
  }

  &__image {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  &__title {
    margin-bottom: 47px;
    font-size: 30px;
    font-weight: 700;
    line-height: 35px;
    text-transform: uppercase;
  }

  @include media-breakpoint-up(md) {
    height: 396px;

    &__title {
      margin-bottom: 0;
      line-height: 40px;
    }
  }

  @include media-breakpoint-up(lg) {
    height: 455px;

    &__title {
      margin-left: 79px;
    }
  }

  @include media-breakpoint-up(xl) {
    height: 540px;

    &__title {
      margin-bottom: 32px;
      margin-left: 0;
      font-size: 40px;
      line-height: 50px;
    }
  }

  @include media-breakpoint-up(xxl) {
    &__title {
      margin-bottom: 61px;
      font-size: 50px;
      line-height: 60px;
    }
  }
}
</style>
