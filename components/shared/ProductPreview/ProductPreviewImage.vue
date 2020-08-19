<template>
  <ImageLoader :negative="true">
    <picture v-if="isLarge">
      <source
        :data-srcset="image.thumb_lg | webp"
        srcset="/img/stub.png"
        type="image/webp"
      />
      <img
        :data-src="image.thumb_lg"
        :alt="alt"
        :class="{ 'product-preview__img--hidden': isHidden }"
        src="/img/stub.png"
        class="product-preview__img lazyload img-fade"
        loading="lazy"
        data-object-fit="cover"
      />
    </picture>
    <picture v-else>
      <source
        :data-srcset="image.thumb_sm | webp"
        srcset="/img/stub.png"
        media="(max-width: 767px)"
        type="image/webp"
      />
      <source
        :data-srcset="image.thumb_sm"
        srcset="/img/stub.png"
        media="(max-width: 767px)"
        type="image/jpeg"
      />
      <source
        :data-srcset="image.thumb_md | webp"
        srcset="/img/stub.png"
        media="(max-width: 1199px)"
        type="image/webp"
      />
      <source
        :data-srcset="image.thumb_md"
        srcset="/img/stub.png"
        media="(max-width: 1199px)"
        type="image/jpeg"
      />
      <source
        :data-srcset="image.thumb_lg | webp"
        srcset="/img/stub.png"
        type="image/webp"
      />
      <img
        :data-src="image.thumb_lg"
        :alt="alt"
        :class="{ 'product-preview__img--hidden': isHidden }"
        src="/img/stub.png"
        class="product-preview__img lazyload img-fade"
        loading="lazy"
        data-object-fit="cover"
      />
    </picture>
  </ImageLoader>
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
    image: {
      type: Object,
      required: true
    },
    alt: {
      type: String,
      required: true
    },
    isHidden: {
      type: Boolean,
      required: true
    },
    isLarge: {
      type: Boolean,
      required: true
    }
  }
}
</script>
