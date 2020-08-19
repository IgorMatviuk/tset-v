<template>
  <div ref="zoomWrapper" class="zoomed"></div>
</template>

<script>
import ImageZoom from 'js-image-zoom'

export default {
  props: {
    imageUrl: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      hoverZoom: null
    }
  },
  mounted() {
    /* istanbul ignore else */
    if (this.$refs.zoomWrapper) {
      this.setupHoverZoom()
    }
  },
  beforeDestroy() {
    this.hoverZoom.kill()
    this.hoverZoom = null
  },
  methods: {
    setupHoverZoom() {
      const element = this.$refs.zoomWrapper
      const mqlXl = window.matchMedia('(min-width: 1200px)')

      /* istanbul ignore else */
      if (element && mqlXl.matches) {
        this.hoverZoom = new ImageZoom(element, {
          width: element.offsetWidth,
          height: element.offsetHeight,
          zoomWidth: element.offsetWidth,
          img: this.imageUrl,
          zoomPosition: 'original'
        })
      }
    }
  }
}
</script>

<style lang="scss">
.zoomed {
  position: absolute !important;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;

  img {
    pointer-events: none;
    opacity: 0;
  }
}
</style>
