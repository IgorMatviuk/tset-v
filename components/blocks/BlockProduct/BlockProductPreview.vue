<template>
  <div
    class="product-preview-card"
    @mouseover="activateHoverZoom"
    @click="showImageViewer"
  >
    <template v-if="isImagePreview">
      <ImageLoader ref="imageWrapper" class="product-preview-card__img-wrapper">
        <picture>
          <source
            :data-srcset="item.preview_lg | webp"
            srcset="/img/stub.png"
            media="(max-width: 1439px)"
            type="image/webp"
          />
          <source
            :data-srcset="item.preview_lg"
            srcset="/img/stub.png"
            media="(max-width: 1439px)"
            type="image/jpeg"
          />
          <source
            :data-srcset="item.preview_xl | webp"
            srcset="/img/stub.png"
            type="image/webp"
          />
          <img
            :data-src="item.preview_xl"
            :title="item.title"
            :alt="item.alt"
            src="/img/stub.png"
            class="product-preview-card__img lazyload"
            loading="lazy"
            data-object-fit="cover"
          />
        </picture>
        <ZoomedImage v-if="hoverZoomIsActive" :image-url="item.preview_xl" />
      </ImageLoader>
    </template>
    <template v-else>
      <BlockProductPreviewVideo :video="item" />
    </template>
  </div>
</template>

<script>
import PinchZoom from 'pinch-zoom-js'

import BlockProductPreviewVideo from './BlockProductPreviewVideo'

import ImageLoader from '@/components/shared/ImageLoader'
import ZoomedImage from '@/components/shared/ZoomedImage'

import { mutationTypes as productMutationsTypes } from '@/store/product'

import imageNextGen from '@/mixins/image-next-gen'

export default {
  components: {
    ImageLoader,
    ZoomedImage,
    BlockProductPreviewVideo
  },
  mixins: [imageNextGen],
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      hoverZoomIsActive: false,
      pinchZoom: null
    }
  },
  computed: {
    isImagePreview() {
      return this.item.preview_type === 'image'
    }
  },
  mounted() {
    if (this.$refs.imageWrapper) {
      this.setupPinchZoom()
    }

    window.addEventListener('resize', this.destroyHoverZoom)
  },
  beforeDestroy() {
    if (this.pinchZoom) {
      this.pinchZoom.disable()
      this.pinchZoom = null
    }

    window.removeEventListener('resize', this.destroyHoverZoom)
  },
  methods: {
    setupPinchZoom() {
      const element = this.$refs.imageWrapper.$el
      const mqlLg = window.matchMedia('(max-width: 1199.98px)')

      /* istanbul ignore else */
      if (element && mqlLg.matches) {
        this.pinchZoom = new PinchZoom(element, { draggableUnzoomed: false })
      }
    },
    destroyHoverZoom() {
      this.hoverZoomIsActive = false
    },
    activateHoverZoom() {
      const mqlXl = window.matchMedia('(min-width: 1200px)')

      /* istanbul ignore else */
      if (mqlXl.matches) {
        this.hoverZoomIsActive = true
      }
    },
    showImageViewer() {
      /* istanbul ignore else */
      if (this.isImagePreview) {
        this.$store.commit(
          `product/${productMutationsTypes.SET_ACTIVE_PREVIEW}`,
          this.item
        )
        this.$store.commit(
          `product/${productMutationsTypes.SET_IMAGE_VIEWER_VISIBILITY_TOGGLE}`,
          true
        )
      }
    }
  }
}
</script>

<style lang="scss">
.product-preview-card {
  position: relative;
  height: 1px;
  padding-bottom: $preview-aspect-ratio;
  overflow: hidden;
  transform: translateZ(0);
  backface-visibility: hidden;

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .pinch-zoom-container {
    position: absolute !important;
    width: 100%;
  }

  .zoomed {
    opacity: 0;
    transition: opacity 0.5s;
  }

  &:hover .zoomed {
    opacity: 1;
  }

  @include media-breakpoint-down(sm) {
    position: relative;
    width: 100%;
    height: 0;

    &__img-wrapper {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
