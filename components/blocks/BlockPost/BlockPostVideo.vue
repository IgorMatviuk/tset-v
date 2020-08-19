<template>
  <div class="post-video">
    <BContainer>
      <div class="post-video__container">
        <div class="post-video__wrapper" @click="togglePlayingVideo">
          <transition name="fade">
            <div v-if="!isPlaying" class="post-video__overlay">
              <svg-icon
                name="play"
                class="post-video__icon"
                width="50"
                height="50"
              />
            </div>
          </transition>
          <client-only>
            <LazyVideo
              ref="postVideo"
              :src="content.video_url"
              :poster="content[posterUrlKey]"
              :attrs="attrs"
            />
          </client-only>
        </div>
      </div>
    </BContainer>
  </div>
</template>

<script>
export default {
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
        playsinline: true,
        controls: false,
        class: 'post-video__item',
        'data-object-fit': 'cover'
      },
      isPlaying: false,
      mqlLg: null
    }
  },
  computed: {
    posterUrlKey() {
      return this.mqlLg && this.mqlLg.matches
        ? 'poster_url_lg'
        : 'poster_url_xl'
    }
  },
  mounted() {
    this.mqlLg = matchMedia('(max-width: 1199.98px)')
  },
  methods: {
    togglePlayingVideo() {
      const video = this.$refs.postVideo

      /* istanbul ignore else */
      if (this.isPlaying && video) {
        this.isPlaying = false
        video.$el.pause()
      } else if (!this.isPlaying && video) {
        this.isPlaying = true
        video.$el.play()
      }
    }
  }
}
</script>

<style lang="scss">
.post-video {
  margin-bottom: 23px;

  &__container {
    width: calc(100% + 30px);
    margin-right: -15px;
    margin-left: -15px;

    @media only screen and (min-width: 540px) {
      width: 100%;
      margin-right: 0;
      margin-left: 0;
    }
  }

  &__wrapper {
    position: relative;
    height: 1px;
    padding-bottom: 51.65%;
    overflow: hidden;
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.5);
  }

  &__overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: $black-light-2;
  }

  &__icon {
    width: 50px;
    height: 50px;
    color: $white;
  }

  &__item {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @include media-breakpoint-up(md) {
    margin-bottom: 28px;

    &__container {
      width: 450px;
      margin-right: auto;
      margin-left: auto;
    }

    &__icon {
      width: 58px;
      height: 58px;
    }
  }

  @include media-breakpoint-up(lg) {
    padding-top: 12px;
    margin-bottom: 26px;

    &__container {
      width: 610px;
    }

    &__icon {
      width: 80px;
      height: 80px;
    }
  }

  @include media-breakpoint-up(xl) {
    padding-top: 0;

    &__container {
      width: 770px;
    }

    &__icon {
      width: 100px;
      height: 100px;
    }
  }

  @include media-breakpoint-up(xxl) {
    &__container {
      width: 930px;
    }
  }
}
</style>
