<template>
  <div
    :class="{
      'product-preview--out-of-stock': !selectedVariant.in_stock,
      'product-preview--size-visible': isAddToCartEmitted
    }"
    class="product-preview"
  >
    <div class="product-preview__overlay">
      <div
        v-if="selectedVariant.discount_price"
        class="product-preview__badge product-preview__badge--sale"
      >
        Sale
      </div>
      <div
        v-if="item.is_new"
        class="product-preview__badge product-preview__badge--new"
      >
        New
      </div>
      <transition name="slide-fade">
        <template v-if="!isAddToCartEmitted">
          <!-- v-if="selectedVariant.in_stock" -->
          <BButton
            variant="outline-light"
            class="product-preview__btn-buy"
            @click="isAddToCartEmitted = true"
          >
            {{ $t('cart.add') }}
          </BButton>
          <!-- <BButton
            v-else
            variant="outline-light"
            class="product-preview__btn-buy"
            @click="onStockSubscribe"
          >
            сообщить о появлении
          </BButton> -->
        </template>
      </transition>
      <transition name="slide-fade">
        <ProductPreviewSizes
          v-if="isAddToCartEmitted"
          :options="sizeOptionsByColor"
          @selected="onOptionSelect('selectedSize', $event)"
        />
      </transition>
      <ProductPreviewImage
        v-for="(imageItem, index) in previewImageItems"
        :key="index"
        :image="imageItem.image"
        :is-hidden="getIsPreviewImageHidden(imageItem.variants)"
        :is-large="showLarge"
        :alt="selectedVariant.name"
      />
    </div>
    <!-- <div
      ref="btnWishlist"
      class="product-preview__btn-wishlist"
      @click="toggleWishList"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 25 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="heart-shaped product-preview__heart"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M22.7929 2.24312C21.6986 1.10611 20.2712 0.5 18.7584 0.5C17.2454 0.5 15.8178 1.10602 14.723 2.24301L12.5 4.5531L10.2772 2.24316C9.18293 1.10633 7.75484 0.5 6.24209 0.5C4.7293 0.5 3.3012 1.10626 2.20714 2.24308C-0.0691953 4.60838 -0.0688025 8.49268 2.20686 10.8564L12.5 21.5508L22.793 10.8566C25.0687 8.49292 25.0693 4.6084 22.7929 2.24312Z"
          fill="black"
          class="heart-shaped__shape"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.24206 1C4.86798 1 3.56912 1.5489 2.56738 2.58979C0.477328 4.76152 0.477804 8.33955 2.56703 10.5096L12.5 20.8298L22.4327 10.5099C24.522 8.33982 24.5227 4.76154 22.4326 2.58985C21.4306 1.54871 20.1324 1 18.7584 1C17.3841 1 16.0857 1.54864 15.0831 2.58982L12.5 5.2742L9.91693 2.5899C8.91496 1.54898 7.61605 1 6.24206 1ZM1.84685 1.89637C3.03322 0.663626 4.59056 0 6.24206 0C7.89354 0 9.45086 0.663709 10.6374 1.89641L12.5 3.83201L14.3627 1.89631C15.5498 0.663516 17.1066 0 18.7584 0C20.4099 0 21.9665 0.663507 23.1531 1.8964C25.6159 4.45525 25.6153 8.64602 23.1532 11.2033L12.5 22.2718L1.84663 11.2031C-0.615409 8.64582 -0.615752 4.45521 1.84685 1.89637Z"
          fill="white"
          class="heart-shaped__line"
        />
      </svg>
    </div> -->
    <ProductPreviewColors
      :options="colorOptions"
      :active="selectedColor"
      :initial="initialSelectedColor"
      @selected="onOptionSelect('selectedColor', $event)"
    />
    <NuxtLink
      :to="variantUrl"
      :title="selectedVariant.name"
      class="product-preview__name"
    >
      {{ selectedVariant.name }}
    </NuxtLink>
    <div v-if="selectedVariant.in_stock" class="product-preview__price-wrapper">
      <template v-if="selectedVariant.discount_price">
        <div class="product-preview__price product-preview__price--discount">
          {{ selectedVariant.formatted_discount_price }}
        </div>
        <div class="product-preview__price product-preview__price--initial">
          {{ selectedVariant.formatted_price }}
        </div>
      </template>
      <div v-else class="product-preview__price">
        {{ selectedVariant.formatted_price }}
      </div>
    </div>
  </div>
</template>

<script>
// import gsap from 'gsap'
import _isEqual from 'lodash.isequal'

import ProductPreviewImage from './ProductPreviewImage'
import ProductPreviewSizes from './ProductPreviewSizes'
import ProductPreviewColors from './ProductPreviewColors'

import productVariants from '@/mixins/product-variants'
import addToCart from '@/mixins/add-to-cart'

export default {
  components: {
    ProductPreviewImage,
    ProductPreviewSizes,
    ProductPreviewColors
  },
  mixins: [productVariants, addToCart],
  props: {
    item: {
      type: Object,
      required: true
    },
    showLarge: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      selectedColor: null,
      selectedSize: null,
      isAddToCartEmitted: false,
      isInWishlist: false,
      heartAnimationTimeline: null
    }
  },
  computed: {
    sizeOptionsByColor() {
      const { attribute, items } = this.sizeOptions

      const sizeOptionsByVariant = items.filter(({ variants }) => {
        const intersection = this.activeColorVariants.filter((id) =>
          variants.includes(id)
        )
        return intersection.length > 0
      })

      return {
        attribute,
        items: sizeOptionsByVariant
      }
    },
    previewImageItems() {
      const imageItems = this.item.variants.reduce((imageItems, variant) => {
        const exitedImageItem = imageItems.find((item) =>
          _isEqual(item.image, variant.base_image)
        )

        if (exitedImageItem) {
          exitedImageItem.variants.push(variant.id)
        } else {
          imageItems.push({ variants: [variant.id], image: variant.base_image })
        }

        return imageItems
      }, [])

      return imageItems
    },
    selectedVariant() {
      const color = this.selectedColor || this.initialSelectedColor
      const size = this.selectedSize || this.initialSelectedSize

      const variant = this.item.variants.find((variant) => {
        const isColorIntersection = color.variants.includes(variant.id)
        const isSizeIntersection = size.variants.includes(variant.id)
        const fullMatch = isColorIntersection && isSizeIntersection

        return fullMatch || isColorIntersection
      })

      return variant
    },
    variantUrl() {
      return this.$i18n.path(this.selectedVariant.url_key)
    }
  },
  watch: {
    selectedColor: 'onColorSelect',
    selectedSize: 'onSizeSelect'
  },
  methods: {
    getIsPreviewImageHidden(variants) {
      const intersection = variants.filter((variant) =>
        this.activeColorVariants.includes(variant)
      )

      return !intersection.length
    },
    // onStockSubscribe() {
    //   this.$bus.$emit('stock-suscribe')
    // },
    onOptionSelect(name, { option, attributeId }) {
      this[name] = {
        attribute: attributeId,
        ...option
      }
    },
    onColorSelect(newSelectedColor) {
      this.activeColorVariants = newSelectedColor.variants
    },
    onSizeSelect(newSelectedSize) {
      if (newSelectedSize) {
        const color = this.selectedColor || this.initialSelectedColor
        const size = this.selectedSize || this.initialSelectedSize

        const variant = this.getVariantBySelectedOptions(color, size)

        this.addToCart(variant.id)

        this.isAddToCartEmitted = false
        this.selectedSize = null
      }
    }
    // toggleWishList() {
    //   if (this.heartAnimationTimeline) {
    //     const isReversed = this.heartAnimationTimeline.reversed()
    //     this.heartAnimationTimeline.reversed(!isReversed)
    //   } else {
    //     const heartShape = this.$refs.btnWishlist.querySelector(
    //       '.heart-shaped__shape'
    //     )
    //     const heartLine = this.$refs.btnWishlist.querySelector(
    //       '.heart-shaped__line'
    //     )

    //     this.heartAnimationTimeline = gsap
    //       .timeline({
    //         defaults: {
    //           duration: 0.2,
    //           ease: 'expo.out(1, 0.3)'
    //         },
    //         onComplete: () => (this.isInWishlist = !this.isInWishlist)
    //       })
    //       .to(this.$refs.btnWishlist, {
    //         scaleX: 1.2,
    //         scaleY: 1.2
    //       })
    //       .to(this.$refs.btnWishlist, {
    //         scaleX: 1,
    //         scaleY: 1
    //       })
    //       .to(heartShape, { fill: '#9a0034', opacity: 1 }, '-=0.4')
    //       .to(heartLine, { opacity: 0 }, '-=0.4')
    //   }
    // }
  }
}
</script>

<style lang="scss">
.product-preview {
  position: relative;

  &__overlay {
    position: relative;
    height: 1px;
    padding-bottom: $preview-aspect-ratio;
    margin-bottom: 8px;

    &::before {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 50px;
      content: '';
      background-color: rgba(0, 0, 0, 0.2);
      transition: transform 0.5s, background-color 0.5s, height 0.1s;
    }
  }

  &--size-visible &__overlay::before {
    height: 75px;
  }

  &__badge {
    position: absolute;
    top: 8px;
    left: 8px;
    width: 48px;
    height: 20px;
    font-size: 10px;
    font-weight: 500;
    line-height: 20px;
    text-align: center;
    text-transform: uppercase;

    &--sale {
      color: $white;
      background-color: $primary;
    }

    &--new {
      color: $black;
      background-color: $white;
    }
  }

  &__btn-wishlist {
    position: absolute;
    top: -2px;
    right: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    cursor: pointer;
  }

  &__heart {
    width: 24px;
    height: 24px;
  }

  &__btn-buy {
    position: absolute;
    bottom: 35px;
    left: 50%;
    z-index: 1;
    min-width: 150px;
    max-width: 150px;
    height: 30px;
    font-size: 12px;
    line-height: 28px;
    transition: transform 0.5s, opacity 0.5s;
    transform: translate(-50%, 25px);
  }

  &__img {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.3s;

    &--hidden {
      opacity: 0;
    }
  }

  &__name {
    display: -webkit-box;
    max-height: 28px;
    margin-bottom: 14px;
    overflow: hidden;
    font-size: 11px;
    font-weight: 300;
    line-height: 14px;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      content: '';
    }

    @include hover-focus-active() {
      color: $black;
    }
  }

  &__price-wrapper {
    display: flex;
    align-items: baseline;
    justify-content: center;
  }

  &__price {
    font-size: 14px;
    line-height: 18px;

    &--discount {
      margin-right: 13px;
      font-size: 14px;
      line-height: 18px;
      color: $primary;
    }

    &--initial {
      font-size: 12px;
      line-height: 15px;
      color: $text-color;
      text-decoration: line-through;
    }
  }

  @include media-breakpoint-down(sm) {
    &__btn-buy {
      min-width: 85%;
    }
  }

  @include media-breakpoint-up(md) {
    &__badge {
      top: 10px;
      left: 10px;
      width: 60px;
      height: 25px;
      font-size: 12px;
      line-height: 25px;
    }

    &__overlay {
      margin-bottom: 13px;
    }

    &__btn-wishlist {
      top: 2px;
      right: 2px;
    }

    &__btn-buy {
      min-width: 190px;
    }

    &__name {
      max-height: 54px;
      margin-bottom: 13px;
      font-size: 14px;
      line-height: 18px;
      -webkit-line-clamp: 3;
    }

    &__price {
      font-size: 16px;
      line-height: 20px;

      &--discount {
        font-size: 16px;
        line-height: 20px;
      }

      &--initial {
        font-size: 14px;
        line-height: 18px;
      }
    }
  }

  @include media-breakpoint-up(lg) {
    &__overlay {
      margin-bottom: 15px;
    }

    &__btn-wishlist {
      top: 3px;
      right: 3px;
    }

    &__name {
      margin-bottom: 16px;
    }
  }

  @include media-breakpoint-up(xl) {
    &:hover &__overlay {
      &::before {
        background-color: rgba(0, 0, 0, 0.2);
      }
    }

    &:hover &__btn-buy {
      opacity: 1;
      transform: translate(-50%, 0);
    }

    &__overlay {
      margin-bottom: 6px;

      &::before {
        height: 80px;
        background-color: rgba($color: $black, $alpha: 0);
      }
    }

    &--size-visible &__overlay::before {
      height: 100px;
    }

    &__badge {
      top: 20px;
      left: 20px;
    }

    &__btn-wishlist {
      top: 12px;
      right: 8px;
    }

    &__btn-buy {
      bottom: 20px;
      min-width: 210px;
      height: 40px;
      font-size: 14px;
      line-height: 38px;
      opacity: 0;
    }

    &__name {
      max-height: 36px;
      margin-bottom: 7px;
      -webkit-line-clamp: 2;
    }
  }

  @include media-breakpoint-up(xxl) {
    &__overlay {
      margin-bottom: 10px;
    }

    &__badge {
      top: 5px;
      left: 5px;
    }

    &__btn-wishlist {
      top: -2px;
      right: 0;
    }

    &__price {
      font-size: 18px;
      line-height: 23px;

      &--discount {
        font-size: 18px;
        line-height: 23px;
      }

      &--initial {
        font-size: 16px;
        line-height: 20px;
      }
    }
  }
}

.slide-fade-enter-active {
  transition: all 0.5s;
}

.slide-fade-leave-active {
  transition: all 0.5s;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0 !important;
  transform: translateX(-50%, 0) !important;
}

.heart-shaped {
  &__shape {
    opacity: 0.2;
  }
}
</style>
