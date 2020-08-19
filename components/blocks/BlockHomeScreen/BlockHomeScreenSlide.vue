<template>
  <div class="home-screen__slide swiper-slide">
    <BlockHomeScreenPreviewLeft
      ref="previewLeft"
      :image="content.images.main_image"
      :alt-text="content.title"
    />
    <BlockHomeScreenContent ref="content" :content="content" />
    <BlockHomeScreenPreviewRight
      ref="previewRight"
      :image="content.images.additional_image"
      :alt-text="content.title"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import gsap from 'gsap'

import BlockHomeScreenPreviewLeft from './BlockHomeScreenPreviewLeft'
import BlockHomeScreenContent from './BlockHomeScreenContent'
import BlockHomeScreenPreviewRight from './BlockHomeScreenPreviewRight'

export default {
  components: {
    BlockHomeScreenPreviewLeft,
    BlockHomeScreenContent,
    BlockHomeScreenPreviewRight
  },
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
      isBackgroundRevealed: (state) => state.ui.isBackgroundRevealed
    })
  },
  watch: {
    isBackgroundRevealed: 'animate'
  },
  methods: {
    animate(status) {
      if (status) {
        const previewLeft = this.$refs.previewLeft.$el
        const previewRight = this.$refs.previewRight.$el

        const timeline = gsap.timeline()

        timeline
          .to(previewLeft, {
            y: 0,
            opacity: 1,
            duration: 1.5,
            delay: 0.4,
            ease: 'expo.out(1, 0.3)'
          })
          .to(
            previewRight,
            {
              y: 0,
              opacity: 1,
              duration: 1.5,
              ease: 'expo.out(1, 0.3)'
            },
            '-=1.45'
          )
      }
    }
  }
}
</script>

<style lang="scss">
.home-screen {
  &__slide {
    display: flex;
    align-items: flex-end;
  }

  @include media-breakpoint-only(md) {
    &__slide {
      align-items: center;
    }
  }
}
</style>
