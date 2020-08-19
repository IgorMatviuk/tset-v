<template>
  <div class="about-video">
    <ImageLoader>
      <template v-if="content.video">
        <client-only>
          <LazyVideo
            :src="content.video"
            :poster="content.videoPoster"
            :attrs="attrs"
            :pause-on-exit="!$device.isMobile"
          />
        </client-only>
      </template>
      <template v-else>
        <img
          :data-src="content.videoPoster"
          data-object-fit="cover"
          data-object-position="center center"
          :alt="content.title"
          class="about-video__item lazyload"
          width="100"
          height="100"
          loading="lazy"
        />
      </template>
    </ImageLoader>
  </div>
</template>

<script>
import ImageLoader from '@/components/shared/ImageLoader'

export default {
  components: {
    ImageLoader
  },
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      attrs: {
        preload: 'none',
        muted: true,
        loop: true,
        autoplay: !this.$device.isMobile,
        playsinline: this.$device.isMobile,
        controls: this.$device.isMobile,
        class: 'about-video__item',
        'data-object-fit': 'cover',
        'data-object-position': 'center'
      }
    }
  }
}
</script>

<style lang="scss">
.about-video {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 68.1159%;

  &__item {
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
    object-position: center;
    width: 100%;
    min-width: 100%;
    height: 100%;
  }

  @include media-breakpoint-up(md) {
    padding-bottom: 66.9%;
  }

  @include media-breakpoint-up(xxl) {
    padding-bottom: 66.7%;
  }
}
</style>
