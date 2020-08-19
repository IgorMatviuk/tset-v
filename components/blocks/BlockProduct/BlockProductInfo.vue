<template>
  <div class="product-info">
    <div class="product-info__badge-wrapper">
      <div
        v-if="activeVariant.discount_price"
        class="product-info__badge product-info__badge--sale"
      >
        Sale
      </div>
      <div
        v-if="activeVariant.is_new"
        class="product-info__badge product-info__badge--new"
      >
        New
      </div>
    </div>
    <div class="product-info__toggle">
      <NuxtLink :to="$i18n.path(links.prev)" class="product-info__toggle-link">
        <svg-icon
          class="product-info__toggle-icon"
          name="chevron"
          width="10"
          height="10"
        />
        {{ $t('productPage.prev') }}
      </NuxtLink>
      <NuxtLink :to="$i18n.path(links.next)" class="product-info__toggle-link">
        {{ $t('productPage.next') }}
        <svg-icon
          class="product-info__toggle-icon product-info__toggle-icon--reverse"
          name="chevron"
          width="10"
          height="10"
        />
      </NuxtLink>
    </div>
    <div class="product-info__name">
      {{ activeVariant.name }}
    </div>
    <div class="product-info__code">
      {{ $t('productPage.sku') }}: {{ variantByOptions.sku }}
    </div>
    <div class="product-info__price-wrapper">
      <template v-if="variantByOptions.discount_price">
        <div class="product-info__old-price">
          {{ variantByOptions.formatted_price }}
        </div>
        <div class="product-info__price">
          {{ variantByOptions.formatted_discount_price }}
        </div>
      </template>
      <template v-else>
        <div class="product-info__price">
          {{ variantByOptions.formatted_price }}
        </div>
      </template>
    </div>
    <div class="product-info__sizes">
      <button
        v-for="size in sizeOptions.items"
        :key="size.id"
        :class="{
          'product-info__size-item--active': selectedSize
            ? selectedSize.id === size.id
            : initialSelectedSize.id === size.id
        }"
        :disabled="getIsSizeOptionDisabled(size.variants)"
        class="product-info__size-item"
        @click="onSelectSize(size)"
      >
        {{ size.label }}
      </button>
    </div>
    <button class="product-info__size-table" @click="toggleFloatPanel(true)">
      {{ $t('floatPanel.title') }}
    </button>
    <div class="product-info__colors">
      <div class="product-info__active-color">
        {{ activeColorLabel }}
      </div>
      <div
        v-for="color in colorOptions.items"
        :key="color.id"
        class="product-info__colors-item-wrapper"
      >
        <!-- <span
          v-if="getIsColorOptionDisabled(color.variants)"
          :style="`background-color: ${color.swatch_value}`"
          :class="{
            'product-info__colors-item--active': selectedColor
              ? selectedColor.id === color.id
              : initialSelectedColor.id === color.id
          }"
          class="product-info__colors-item product-info__colors-item--disabled"
        ></span> -->
        <NuxtLink
          :to="getVariationUrl(color)"
          :style="`background-color: ${color.swatch_value}`"
          :class="{
            'product-info__colors-item--active': selectedColor
              ? selectedColor.id === color.id
              : initialSelectedColor.id === color.id,
            'product-info__colors-item--disabled': getIsColorOptionDisabled(
              color.variants
            )
          }"
          class="product-info__colors-item"
        />
      </div>
    </div>
    <!-- TODO: dynamics tags -->
    <div class="product-info__tag">
      <svg-icon
        name="free-shipping"
        class="product-info__tag-icon"
        width="12"
        height="12"
      />
      <div
        class="product-info__tag-content"
        v-html="$t('productTags.delivery')"
      ></div>
    </div>
    <div class="product-info__tag">
      <svg-icon
        name="exchange"
        class="product-info__tag-icon"
        width="12"
        height="12"
      />
      <div
        class="product-info__tag-content"
        v-html="$t('productTags.return')"
      ></div>
    </div>
    <!-- TODO: stock modal, add to cart -->
    <!-- v-if="variant.in_stock" -->
    <BButton
      block
      variant="primary"
      class="product-info__add"
      :class="{ 'product-info__add--disabled': !canBuyProduct }"
      @click="onAddToCart"
    >
      {{ $t('cart.add') }}
    </BButton>
    <!-- <BButton
      v-else
      block
      variant="outline-light"
      class="product-info__add product-info__add--no-stock"
      @click="onStockSubscribe"
    >
      сообщить о появлении
    </BButton> -->
    <BlockProductSpecs :items="variantSpecItems" />
    <BlockProductDescription
      :content="item.attribute_family.description.short_description.value"
    />
    <BlockProductAdditionalInfo :items="item.attribute_family.info" />
    <BlockProductReviews v-if="item.reviews.length" :items="item.reviews" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import BlockProductSpecs from './BlockProductSpecs'
import BlockProductDescription from './BlockProductDescription'
import BlockProductAdditionalInfo from './BlockProductAdditionalInfo'
import BlockProductReviews from './BlockProductReviews'

import productVariants from '@/mixins/product-variants'
import addToCart from '@/mixins/add-to-cart'

import { mutationTypes as productMutationTypes } from '@/store/product'

export default {
  components: {
    BlockProductSpecs,
    BlockProductDescription,
    BlockProductAdditionalInfo,
    BlockProductReviews
  },
  mixins: [productVariants, addToCart],
  props: {
    item: {
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
      isFloatPanelVisible: false
    }
  },
  computed: {
    ...mapState({
      selectedSize: (state) => state.product.selectedSize,
      selectedColor: (state) => state.product.selectedColor,
      activeVariant: (state) => state.product.activeVariant
    }),
    variantByOptions() {
      const color = this.selectedColor || this.initialSelectedColor
      const size = this.selectedSize || this.initialSelectedSize

      return this.getVariantBySelectedOptions(color, size)
    },
    variantSpecItems() {
      const color = this.selectedColor || this.initialSelectedColor
      const size = this.selectedSize || this.initialSelectedSize

      const byId = (id) => (x) => x.value === id

      const variant = this.item.variants.find((variant) => {
        const vColor = variant.attributes.find(byId(color.id))
        const vSize = variant.attributes.find(byId(size.id))

        return (Boolean(vColor) && Boolean(vSize)) || Boolean(vColor)
      })

      const spec = Object.keys(variant.attribute_family.spec).reduce(
        (acc, key) => {
          const spec = variant.attribute_family.spec[key].value
            ? variant.attribute_family.spec[key]
            : this.item.attribute_family.spec[key]

          acc[key] = spec

          return acc
        },
        {}
      )

      return spec
    },
    canBuyProduct() {
      const color = this.selectedColor || this.initialSelectedColor
      const isColorDisabled = this.getIsColorOptionDisabled(color.variants)

      return !isColorDisabled
    },
    activeColorLabel() {
      const color = this.selectedColor || this.initialSelectedColor
      return color.label
    }
  },
  methods: {
    getVariationUrl(color) {
      const size = this.selectedSize || this.initialSelectedSize

      const variant = this.getVariantBySelectedOptions(color, size)

      return this.$i18n.path(variant.url_key)
    },
    getIsSizeOptionDisabled(variants) {
      const intersection = variants.filter((variant) =>
        this.activeColorVariants.includes(variant)
      )

      return !intersection.length
    },
    getIsColorOptionDisabled(variants) {
      const intersection = variants.filter((variant) =>
        this.activeSizeVariants.includes(variant)
      )

      return !intersection.length
    },
    onSelectSize(size) {
      this.activeSizeVariants = size.variants

      this.$store.commit(
        `product/${productMutationTypes.SET_SELECTED_SIZE}`,
        size
      )
    },
    onAddToCart() {
      const color = this.selectedColor || this.initialSelectedColor
      const size = this.selectedSize || this.initialSelectedSize

      const variant = this.getVariantBySelectedOptions(color, size)

      this.addToCart(variant.id)
    },
    onStockSubscribe() {
      this.$bus.$emit('stock-subscribe')
    },
    toggleFloatPanel(status) {
      this.$bus.$emit('float-panel:toggle', status)
    }
  }
}
</script>

<style lang="scss">
.product-info {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;

  &__badge-wrapper {
    display: flex;
    align-items: flex-start;
  }

  &__badge {
    width: 60px;
    height: 25px;
    font-size: 12px;
    font-weight: 500;
    line-height: 23px;
    color: $white;
    text-align: center;
    text-transform: uppercase;
    border: 1px solid rgba($color: $black, $alpha: 0.15);

    &:not(:last-of-type) {
      margin-right: 10px;
    }

    &--new {
      color: $black;
      background-color: $white;
    }

    &--sale {
      background-color: $primary;
    }
  }

  &__toggle {
    position: absolute;
    top: 0;
    right: 0;
    line-height: 0.4;
  }

  &__toggle-link {
    display: inline-block;
    font-size: 9px;
    font-weight: 300;
    line-height: 11px;

    &:not(:last-of-type)::after {
      margin-left: 4px;
      content: '/';
    }
  }

  &__toggle-icon {
    display: none;
  }

  &__name {
    width: 100%;
    padding-right: 15px;
    margin-top: 24px;
    font-size: 13px;
    font-weight: 300;
    line-height: 16px;
    text-transform: uppercase;
    letter-spacing: 0.07em;
  }

  &__code {
    width: 100%;
    margin-top: 5px;
    font-size: 12px;
    font-weight: normal;
    line-height: 15px;
    color: $gray-dark-1;
  }

  &__price-wrapper {
    display: flex;
    align-items: baseline;
    width: 100%;
    margin-top: 12px;
  }

  &__old-price {
    margin-right: 13px;
    font-size: 14px;
    font-weight: 300;
    line-height: 30px;
    color: $text-color;
    text-decoration-line: line-through;
  }

  &__price {
    font-size: 16px;
    line-height: 30px;
    color: $primary;
  }

  &__sizes {
    display: flex;
    width: 100%;
    margin-top: 16px;
  }

  &__size-item {
    @include reset-button-styles();

    width: 45px;
    height: 25px;
    font-size: 13px;
    font-weight: 300;
    line-height: 23px;
    text-align: center;
    border: 1px solid $light-1;
    transition: color 0.3s, background-color 0.3s, border-color 0.3s;

    &:not(:last-of-type) {
      margin-right: 10px;
    }

    &--active {
      color: $white;
      cursor: default;
      background-color: $primary;
      border-color: $primary;
    }

    &:disabled {
      cursor: default;
    }

    &:not(:disabled) {
      @include hover-focus-active {
        color: $white;
        background-color: $primary;
        border-color: $primary;
      }
    }
  }

  &__size-table {
    @include reset-button-styles();

    @include hover-focus-active() {
      color: $primary;
    }

    margin-top: 15px;
    font-size: 12px;
    font-weight: 300;
    line-height: 15px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-decoration-line: underline;
    transition: color 0.3s;
  }

  &__colors {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    width: 100%;
    margin-top: 28px;
    margin-bottom: 31px;
  }

  &__colors-item-wrapper {
    &:not(:last-of-type) {
      margin-right: 13px;
    }
  }

  &__colors-item {
    position: relative;
    display: block;
    width: 25px;
    height: 16px;
    border: 1px solid rgba($color: $black, $alpha: 0.1);

    &--active {
      pointer-events: none;
      box-shadow: 0 0 0 2px $white, 0 0 0 3px $gray-dark-1;
    }

    &--disabled {
      opacity: 0.5;
      transition: opacity 0.3s;

      &:hover {
        opacity: 1;
      }

      &::after {
        position: absolute;
        top: 50%;
        right: 0;
        left: 0;
        height: 1px;
        content: '';
        background-color: $white;
        transform: rotate(-45deg);
      }
    }
  }

  &__active-color {
    order: 1;
    width: 100%;
    margin-top: 10px;
    font-size: 12px;
    font-weight: 300;
    line-height: 15px;
    color: $text-color;
    letter-spacing: 0.07em;
  }

  &__add {
    margin-top: 22px;
    font-size: 14px;

    &--no-stock {
      border-color: #ccc;

      @include hover-focus-active() {
        border-color: #ccc !important;
      }

      &:focus {
        box-shadow: 0 0 0 0.2rem rgba($color: #ccc, $alpha: 0.5);
      }
    }

    &--disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  }

  &__collapse {
    width: 100%;
  }

  &__review {
    &:not(:last-of-type) {
      margin-bottom: 22px;
    }
  }

  &__tag {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 9px;
  }

  &__tag-icon {
    width: 12px;
    height: 12px;
    margin-right: 9px;
    color: $primary-light-1;
  }

  &__tag-content {
    font-size: 12px;
    font-weight: 300;
    line-height: 15px;
    color: $black;

    b {
      font-weight: 500;
    }

    a {
      font-weight: 500;
      text-decoration-line: underline;
      transition: color 0.3s;
    }
  }

  @include media-breakpoint-down(xl) {
    &__colors {
      margin-bottom: 26px;
    }

    &__add {
      margin-top: 16px;
    }

    &__tag-icon {
      margin-right: 13px;
    }
  }

  @include media-breakpoint-down(lg) {
    &__name {
      margin-top: 23px;
      font-size: 12px;
    }

    &__code {
      margin-top: 8px;
    }

    &__price-wrapper {
      margin-top: 10px;
    }

    &__old-price {
      margin-right: 7px;
      font-size: 12px;
    }

    &__price {
      font-size: 14px;
    }

    &__sizes {
      margin-top: 9px;
    }

    &__colors {
      margin-top: 21px;
      margin-bottom: 20px;
    }

    &__tag {
      margin-bottom: 10px;
    }

    &__tag-icon {
      margin-right: 9px;
    }

    &__tag-content {
      font-size: 11px;
      line-height: 14px;
    }

    &__add {
      margin-top: 12px;
    }
  }

  @include media-breakpoint-down(sm) {
    &__badge-wrapper {
      position: absolute;
      top: 39px;
      left: 15px;
      z-index: 1;
    }

    &__badge {
      width: 48px;
      height: 20px;
      font-size: 10px;
      line-height: 20px;
    }

    &__toggle {
      top: 0;
      right: 13px;
      left: 13px;
      display: flex;
      justify-content: space-between;
    }

    &__toggle-link {
      color: $text-color;
      letter-spacing: 0.07em;

      &:not(:last-of-type)::after {
        display: none;
      }
    }

    &__toggle-icon {
      display: inline-block;
      margin-bottom: 1px;
      color: $gray-dark-2;
      transform: rotate(90deg);

      &--reverse {
        transform: rotate(-90deg);
      }
    }

    &__colors {
      justify-content: center;
      order: -1;
      margin-top: 10px;
    }

    &__active-color {
      order: -1;
      margin-top: 0;
      margin-bottom: 10px;
      font-size: 9px;
      line-height: 11px;
      text-align: center;
    }

    &__name {
      max-width: 85%;
      padding-right: 0;
      margin-top: 3px;
      margin-right: auto;
      margin-left: auto;
      line-height: 15px;
      text-align: center;
    }

    &__code {
      margin-top: 4px;
      font-size: 11px;
      line-height: 14px;
      text-align: center;
    }

    &__price-wrapper {
      justify-content: center;
      padding-left: 7px;
      margin-top: 14px;
    }

    &__old-price {
      margin-right: 10px;
    }

    &__sizes {
      justify-content: center;
    }

    &__size-table {
      margin-top: 7px;
      margin-right: auto;
      margin-bottom: 25px;
      margin-left: auto;
      font-size: 9px;
      line-height: 30px;
      letter-spacing: 0.1em;
    }

    &__add {
      margin-top: 17px;
      margin-right: 15px;
      margin-left: 15px;
    }

    &__tag {
      justify-content: center;
      padding-right: 25px;
      margin-bottom: 14px;
    }

    &__tag-icon {
      margin-right: 14px;
    }
  }
}
</style>
