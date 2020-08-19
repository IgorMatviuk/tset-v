<template>
  <div class="cart-preview__item">
    <div class="cart-preview__img-wrapper">
      <ImageLoader>
        <picture>
          <source
            :srcset="variant.base_image.thumb_xs | webp"
            type="image/webp"
          />
          <img
            :src="variant.base_image.thumb_xs"
            :alt="variant.name"
            class="cart-preview__img"
          />
        </picture>
      </ImageLoader>
    </div>
    <div class="cart-preview__content-wrapper">
      <div class="cart-preview__content">
        <NuxtLink
          :to="$i18n.path(variant.url_key)"
          :title="variant.name"
          class="cart-preview__name"
        >
          {{ variant.name }}
        </NuxtLink>
        <div class="cart-preview__options">
          <div
            v-for="attribute in attributes"
            :key="attribute.id"
            class="cart-preview__option"
          >
            {{ attribute.name }}:
            {{ attribute.value }}
          </div>
          <div>Количество: {{ item.quantity }}</div>
        </div>
      </div>
      <div class="cart-preview__price-wrapper">
        <template v-if="variant.discount_price">
          <div class="cart-preview__price">
            {{ variant.formatted_discount_price }}
          </div>
          <div class="cart-preview__price cart-preview__price--discount">
            {{ variant.formatted_price }}
          </div>
        </template>
        <div v-else class="cart-preview__price">
          {{ variant.formatted_price }}
        </div>
      </div>
    </div>
    <button class="cart-preview__remove" type="button" @click="removeItem">
      <svg-icon
        name="trash"
        class="cart-preview__icon"
        width="11"
        height="11"
      />
    </button>
  </div>
</template>

<script>
import ImageLoader from '@/components/shared/ImageLoader'

import removeFromCart from '@/mixins/remove-from-cart'
import imageNextGen from '@/mixins/image-next-gen'

export default {
  components: {
    ImageLoader
  },
  mixins: [removeFromCart, imageNextGen],
  props: {
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
    attributes() {
      return this.variant.attributes.map((attr) => {
        const tAttr = this.item.product.attributes.find(
          (x) => x.code === attr.code
        )
        const tOpt = tAttr.options.find((x) => x.id === attr.value)

        return {
          name: tAttr.name,
          value: tOpt.label
        }
      })
    }
  }
}
</script>

<style lang="scss">
.cart-preview {
  &__item {
    position: relative;
    display: flex;
    width: 100%;
    padding-bottom: 15px;
    border-bottom: 1px solid #dedcdc;

    &:not(:last-child) {
      margin-bottom: 15px;
    }
  }

  &__content-wrapper {
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
  }

  &__content {
    max-width: 135px;
    padding-right: 8px;
  }

  &__img-wrapper {
    position: relative;
    flex-shrink: 0;
    width: 70px;
    height: 90px;
    margin-right: 15px;
  }

  &__img {
    width: 100%;
    height: auto;
  }

  &__name {
    display: block;
    margin-bottom: 10px;
    overflow: hidden;
    font-size: 12px;
    font-weight: 300;
    text-overflow: ellipsis;
    text-transform: uppercase;
    white-space: nowrap;
  }

  &__options {
    font-size: 10px;
    color: #a8a8a8;
  }

  &__price-wrapper {
    flex-shrink: 0;
    text-align: right;
  }

  &__price {
    font-weight: 500;
    color: $primary;

    &--discount {
      font-size: 11px;
      font-weight: normal;
      color: $text-color;
      text-decoration: line-through;
    }
  }

  &__remove {
    @include reset-button-styles();

    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 35px;
    height: 35px;
    color: $gray-dark-1;
    transition: color 0.3s;

    @include hover-focus-active() {
      color: $primary;
    }
  }

  &__icon {
    width: 11px;
    height: 11px;
  }
}
</style>
