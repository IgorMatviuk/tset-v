<template>
  <div class="preview-video">
    <client-only>
      <LazyVideo
        :src="video.video_url"
        :poster="video[posterUrlKey]"
        :attrs="attrs"
      />
    </client-only>
  </div>
</template>

<script>
export default {
  props: {
    video: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      attrs: null,
      mqlLg: null
    }
  },
  computed: {
    posterUrlKey() {
      return this.mqlLg && this.mqlLg.matches ? 'preview_lg' : 'preview_xl'
    }
  },
  mounted() {
    this.mqlLg = matchMedia('(max-width: 1439px)')

    this.attrs = {
      preload: 'none',
      muted: true,
      loop: true,
      autoplay: this.getAutoplay(),
      playsinline: true,
      controls: true,
      onplaying: 'this.controls=false',
      class: 'preview-video__item',
      'data-object-fit': 'cover'
    }
  },
  methods: {
    getAutoplay() {
      const mqlLg = matchMedia('(min-width: 768px)')
      return mqlLg.matches
    }
  }
}
</script>

<style lang="scss">
.preview-video {
  position: absolute;
  width: 100%;
  height: 0;
  padding-bottom: $preview-aspect-ratio;

  &__item {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    object-fit: cover;
    width: 100%;
    min-width: 100%;
    height: 100%;
  }

  /* @include media-breakpoint-down(xl) {
    padding-bottom: 126.74%;
  }

  @include media-breakpoint-down(lg) {
    padding-bottom: 126.54%;
  }

  @include media-breakpoint-down(md) {
    padding-bottom: 126.69%;
  }

  @include media-breakpoint-down(sm) {
    min-height: 76.5vh;
    padding-bottom: 135%;
  }

  @media only screen and (max-width: 767.98px) and (orientation: landscape) {
    padding-bottom: 126.68%;
  } */
}
</style>
