<template>
  <div class="order-item">
    <button class="order-item__remove" type="button" @click="removeItem">
      <svg-icon name="trash" class="order-item__icon" width="15" height="15" />
    </button>
    <div class="order-item__image-wrapper">
      <ImageLoader>
        <picture>
          <source
            :data-srcset="variant.base_image.thumb_xs | webp"
            srcset="/img/stub.png"
            type="image/webp"
          />
          <img
            :data-src="variant.base_image.thumb_xs"
            src="/img/stub.png"
            :alt="variant.name"
            :title="variant.name"
            class="order-item__image lazyload"
            loading="lazy"
            data-object-fit="cover"
          />
        </picture>
      </ImageLoader>
    </div>
    <div class="order-item__body">
      <NuxtLink :to="$i18n.path(variant.url_key)" class="order-item__name">
        {{ variant.name }}
      </NuxtLink>
      <div class="order-item__price-wrapper">
        <template v-if="variant.discount_price">
          <div class="order-item__price">
            {{ variant.formatted_discount_price }}
          </div>
          <div class="order-item__old-price">
            {{ variant.formatted_price }}
          </div>
        </template>
        <template v-else>
          <div class="order-item__price">
            {{ variant.formatted_price }}
          </div>
        </template>
      </div>
      <div class="order-item__code">
        {{ $t('productPage.sku') }}: {{ variant.sku }}
      </div>
      <!-- <OptionSelect
        :id="getOptionsKey('color', item.id)"
        :attribute-id="colorAttribute.id"
        :attribute-code="colorAttribute.code"
        :active-option="colorAttribute.selected_option"
        :options="mappedColorOptionItems"
        class="order-item__colors"
        @change="onOptionsChange"
      /> -->
      <OptionSelect
        :id="getOptionsKey('size', item.id)"
        :attribute-id="sizeAttribute.id"
        :attribute-code="sizeAttribute.code"
        :active-option="getActiveOption('size')"
        :options="mappedSizeOptionItems"
        class="order-item__sizes"
        @change="onOptionsChange"
      />
      <QuantityCounter
        :count="item.quantity"
        class="order-item__counter"
        @change="onQuantityChange"
      />
    </div>
  </div>
</template>

<script>
import OptionSelect from '@/components/shared/OptionSelect'
import QuantityCounter from '@/components/shared/QuantityCounter'
import ImageLoader from '@/components/shared/ImageLoader'

import { actionTypes as cartActionTypes } from '@/store/cart'

import productVariants from '@/mixins/product-variants'
import removeFromCart from '@/mixins/remove-from-cart'

import imageNextGen from '@/mixins/image-next-gen'

export default {
  components: {
    OptionSelect,
    QuantityCounter,
    ImageLoader
  },
  mixins: [productVariants, removeFromCart, imageNextGen],
  props: {
    index: {
      type: Number,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    variant() {
      return this.item.product.variants.find(
        (variant) => variant.id === this.item.variant_id
      )
    },
    // colorAttribute() {
    //   return this.item.product.attributes.find((attr) => attr.code === 'color')
    // },
    sizeAttribute() {
      return this.item.product.attributes.find((attr) => attr.code === 'size')
    },
    // mappedColorOptionItems() {
    //   return this.mapOptionsWithStatus('color')
    // },
    mappedSizeOptionItems() {
      return this.mapOptionsWithStatus('size')
    }
  },
  methods: {
    mapOptionsWithStatus(attrCode) {
      let options
      let activeOppositeVariants

      /* istanbul ignore else */
      // if (attrCode === 'color') {
      //   options = this.colorOptions
      //   activeOppositeVariants = this.activeSizeVariants
      // }

      /* istanbul ignore else */
      if (attrCode === 'size') {
        options = this.sizeOptions
        activeOppositeVariants = this.activeColorVariants
      }

      return options.items.map((item) => {
        const intersection = item.variants.filter((variant) =>
          activeOppositeVariants.includes(variant)
        )

        return {
          disabled: !intersection.length,
          ...item
        }
      })
    },
    getOptionsKey(scope, id) {
      const capitalized = scope.charAt(0).toUpperCase() + scope.slice(1)
      return `order${capitalized}_${id}_${this.index}`
    },
    getActiveOption(attrCode) {
      const pAttrs = this.item.product.attributes
      const pVariants = this.item.product.variants

      const variant = pVariants.find((x) => x.id === this.item.variant_id)
      const vAttrs = variant.attributes

      const sourceAttr = pAttrs.find((x) => x.code === attrCode)
      const { value: optionId } = vAttrs.find((x) => x.code === attrCode)

      return sourceAttr.options.find((x) => x.id === optionId)
    },
    getIntersectedVariantId() {
      return this.activeColorVariants.find((cVariant) => {
        const sVariant = this.activeSizeVariants.includes(cVariant)
        return !!sVariant
      })
    },
    onOptionsChange({ attributeCode, attributeId, option }) {
      /* istanbul ignore else */
      // if (attributeCode === 'color') {
      //   this.activeColorVariants = option.variants
      // }

      /* istanbul ignore else */
      if (attributeCode === 'size') {
        this.activeSizeVariants = option.variants
      }

      const variantId = this.getIntersectedVariantId()

      this.updateItem(variantId, this.item.quantity)
    },
    onQuantityChange(value) {
      this.updateItem(null, value)
    },
    updateItem(variant, quantity) {
      const payload = {
        cartId: this.$store.state.localStorage.cartId,
        itemId: this.item.id,
        body: { quantity }
      }

      /* istanbul ignore else */
      if (variant) {
        payload.body.variant = variant
      }

      this.$store.dispatch(`cart/${cartActionTypes.UPDATE_ITEM}`, payload)
    }
  }
}
</script>

<style lang="scss">
.order-item {
  display: flex;
  align-items: flex-start;

  &__remove {
    @include reset-button-styles();

    display: flex;
    flex: 0 0 30px;
    width: 30px;
    height: 30px;
    margin-top: -8px;
    transition: color 0.3s;
  }

  &__remove:hover &__icon,
  &__remove:focus &__icon,
  &__remove:active &__icon {
    color: $primary;
  }

  &__icon {
    flex: 0 0 15px;
    width: 15px;
    height: 15px;
    color: $text-color;
  }

  &__image-wrapper {
    position: relative;
    flex: 0 0 70px;
    height: 90px;
    margin-right: 14px;
  }

  &__image {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }

  &__body {
    display: flex;
    flex-grow: 1;
    flex-wrap: wrap;
  }

  &__name {
    flex: 0 0 275px;
    max-width: 275px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 12px;
    line-height: 15px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__price-wrapper {
    margin-left: auto;
    text-align: right;
  }

  &__old-price {
    font-size: 11px;
    line-height: 14px;
    text-decoration-line: line-through;
    color: $text-color;
  }

  &__price {
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    color: $primary;
  }

  &__code {
    width: 100%;
    margin-bottom: 17px;
    font-size: 12px;
    line-height: 15px;
    color: $gray-dark-1;
  }

  &__colors,
  &__sizes {
    align-self: center;
    margin-bottom: 2px;
  }

  &__colors {
    margin-right: 23px;
  }

  &__counter {
    margin-left: auto;
  }

  @include media-breakpoint-down(xl) {
    &__colors,
    &__sizes {
      margin-bottom: 4px;
    }
  }

  @include media-breakpoint-down(lg) {
    &__remove {
      justify-content: center;
      padding-right: 5px;
      margin-top: -9px;
    }

    &__icon {
      width: 13px;
      height: 13px;
    }

    &__image-wrapper {
      margin-right: 10px;
    }

    &__body {
      margin-top: -3px;
    }

    &__name {
      display: -webkit-box;
      flex: 0 0 170px;
      max-width: 170px;
    }

    &__code {
      margin-bottom: 19px;
      font-size: 11px;
      line-height: 17px;
    }

    &__colors,
    &__sizes {
      margin-bottom: 0;
    }

    &__colors {
      margin-right: 15px;
    }
  }

  @include media-breakpoint-down(md) {
    &__remove {
      justify-content: flex-start;
    }

    &__image-wrapper {
      margin-right: 15px;
    }

    &__body {
      margin-top: 0;
    }

    &__name {
      flex: 0 0 275px;
      max-width: 275px;
    }

    &__code {
      margin-bottom: 15px;
    }

    &__colors,
    &__sizes {
      margin-bottom: 4px;
    }

    &__colors {
      margin-right: 25px;
    }
  }

  @include media-breakpoint-down(sm) {
    &__remove {
      flex: 0 0 23px;
      width: 23px;
      padding-right: 0;
    }

    &__image-wrapper {
      margin-right: 12px;
    }

    &__body {
      margin-top: -3px;
    }

    &__name {
      flex: 0 0 125px;
      max-width: 125px;
    }

    &__code {
      margin-bottom: 23px;
    }

    &__colors,
    &__sizes {
      margin-bottom: 1px;
    }

    &__colors {
      margin-right: 10px;
    }
  }
}
</style>
