<template>
  <div class="product">
    <div class="product__container">
      <transition name="fade-slider">
        <BlockProductSlider
          v-if="isMobile"
          :previews="previews"
          class="product__slider"
        />
        <BlockProductGrid v-else :previews="previews" class="product__slider" />
      </transition>
      <BlockProductInfo
        :item="product"
        :links="links"
        :page="'product'"
        class="product__info"
      />
    </div>
  </div>
</template>

<script>
import BlockProductSlider from './BlockProductSlider'
import BlockProductGrid from './BlockProductGrid'
import BlockProductInfo from './BlockProductInfo'

export default {
  components: {
    BlockProductSlider,
    BlockProductGrid,
    BlockProductInfo
  },
  props: {
    product: {
      type: Object,
      required: true
    },
    links: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isMobile: false,
      mqlMd: null
    }
  },
  computed: {
    previews() {
      // if active variant
      // else product
      const variant = this.product.variants.find(
        (variant) => variant.url_key === this.$route.params.pathMatch
      )

      if (variant) {
        return variant.previews
      } else if (this.product.variants.length) {
        return this.product.variants[0].previews
      } else {
        return this.product.previews
      }
    }
  },
  created() {
    if (this.$device.isMobile) {
      this.isMobile = true
    }
  },
  mounted() {
    this.mqlMd = window.matchMedia('(min-width: 768px)')

    this.mqlMd.addListener(this.checkDevice)
  },
  beforeDestroy() {
    this.mqlMd.removeListener(this.checkDevice)
  },
  methods: {
    checkDevice() {
      if (this.mqlMd.matches) {
        this.isMobile = false
      } else {
        this.isMobile = true
      }
    }
  }
}
</script>

<style lang="scss">
.product {
  position: relative;
  z-index: 11;

  &__container {
    display: flex;
    align-items: flex-start;
  }

  &__slider {
    position: sticky;
    top: 80px;
    width: 64.5%;
    margin-right: 95px;
  }

  &__info {
    position: sticky;
    top: 80px;
    width: 330px;
  }

  @include media-breakpoint-down(xl) {
    &__slider {
      width: 63.55%;
      margin-right: 68px;
    }
  }

  @include media-breakpoint-down(lg) {
    &__slider {
      width: 63.05%;
      margin-right: 31px;
    }

    &__info {
      width: 290px;
    }
  }

  @include media-breakpoint-down(md) {
    &__slider {
      width: 55.9%;
    }

    &__info {
      width: 270px;
    }
  }

  @include media-breakpoint-down(sm) {
    &__container {
      position: relative;
      display: block;
      padding-top: 24px;
    }

    &__slider {
      position: static;
      width: 100%;
      margin-right: 0;
    }

    &__info {
      position: static;
      width: 100%;
      max-width: 540px;
      padding-right: 15px;
      padding-left: 15px;
      margin-right: auto;
      margin-left: auto;
    }
  }
}
</style>
