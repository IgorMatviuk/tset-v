<template>
  <div class="post-image">
    <ImageLoader>
      <picture>
        <source
          :data-srcset="item.image.post_slide_xl | webp"
          srcset="/img/stub.png"
          media="(min-width: 1500px)"
          type="image/webp"
        />
        <source
          :data-srcset="item.image.post_slide_xl"
          srcset="/img/stub.png"
          media="(min-width: 1500px)"
        />
        <source
          :data-srcset="item.image.post_slide_lg | webp"
          srcset="/img/stub.png"
          media="(min-width: 1200px)"
          type="image/webp"
        />
        <source
          :data-srcset="item.image.post_slide_lg"
          srcset="/img/stub.png"
          media="(min-width: 1200px)"
        />
        <source
          :data-srcset="item.image.post_slide_sm | webp"
          srcset="/img/stub.png"
          media="(min-width: 992px)"
          type="image/webp"
        />
        <source
          :data-srcset="item.image.post_slide_sm"
          srcset="/img/stub.png"
          media="(min-width: 992px)"
        />
        <source
          :data-srcset="item.image.post_slide_xs | webp"
          srcset="/img/stub.png"
          media="(min-width: 768px)"
          type="image/webp"
        />
        <source
          :data-srcset="item.image.post_slide_xs"
          srcset="/img/stub.png"
          media="(min-width: 768px)"
        />
        <source
          :data-srcset="item.image.post_slide_md | webp"
          srcset="/img/stub.png"
          type="image/webp"
        />

        <img
          :data-src="item.image.post_slide_md"
          src="/img/stub.png"
          :title="item.title"
          :alt="item.title"
          class="post-image__picture lazyload"
          loading="lazy"
          data-object-fit="cover"
          data-object-position="center"
        />
      </picture>
    </ImageLoader>
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
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
.post-image {
  position: relative;
  height: 1px;
  padding-bottom: $preview-aspect-ratio;

  &__picture {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}
</style>
