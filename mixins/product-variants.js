export default {
  props: {
    page: {
      type: String,
      default: () => null
    }
  },
  data() {
    return {
      activeColorVariants: this.getInitialActiveAttributeVariants('color'),
      activeSizeVariants: this.getInitialActiveAttributeVariants('size')
    }
  },
  computed: {
    sizeOptions() {
      return this.getAttributeOptions('size')
    },
    colorOptions() {
      return this.getAttributeOptions('color')
    },
    initialSelectedSize() {
      return this.getInitialSelectedOption('size')
    },
    initialSelectedColor() {
      return this.getInitialSelectedOption('color')
    }
  },
  methods: {
    getActiveVariant() {
      if (this.page === 'product') {
        const variant = this.item.variants.find(
          (variant) => variant.url_key === this.$route.params.pathMatch
        )

        return variant || null
      }

      return null
    },
    getVariantBySelectedOptions(color, size) {
      const fullMatchVariant = this.item.variants.find((variant) => {
        const isColorIntersection = color.variants.includes(variant.id)
        const isSizeIntersection = size.variants.includes(variant.id)

        return isColorIntersection && isSizeIntersection
      })

      if (!fullMatchVariant) {
        const defaultVariant = this.item.variants.find((variant) =>
          color.variants.includes(variant.id)
        )
        return defaultVariant
      }

      return fullMatchVariant
    },
    getInitialSelectedOption(attrCode) {
      if (this.getActiveVariant()) {
        return this.getInitialVariantAttributeOption(attrCode)
      }

      const options = this.getAttributeOptions(attrCode)

      return {
        attribute: options.attribute,
        ...options.items[0]
      }
    },
    getInitialVariantAttributeOption(attrCode) {
      const options = this.getAttributeOptions(attrCode)
      const activeVariant = this.getActiveVariant()

      const variantAttribute = activeVariant.attributes.find(
        (attribute) => attribute.code === attrCode
      )
      const variantOption = options.items.find(
        (option) => option.id === variantAttribute.value
      )

      return {
        attribute: options.attribute,
        ...variantOption
      }
    },
    getInitialActiveAttributeVariants(attrCode) {
      const attrOptions = this.getAttributeOptions(attrCode)

      let variants

      const isProductPage = this.page === 'product' && this.getActiveVariant()
      const isCheckoutPage = this.page === 'checkout'

      if (isProductPage) {
        const initialSelectedOption = this.getInitialSelectedOption(attrCode)
        variants = initialSelectedOption.variants
      } else if (isCheckoutPage) {
        const pVariant = this.item.product.variants.find(
          (x) => x.id === this.item.variant_id
        )
        const { value: optionId } = pVariant.attributes.find(
          (x) => x.code === attrCode
        )
        const attrVariants = this.item.product.variants
          .filter((variant) => {
            const vAttr = variant.attributes.find((x) => x.code === attrCode)
            return vAttr.value === optionId
          })
          .map((x) => x.id)

        variants = attrVariants
      } else {
        // The first one is default
        variants = attrOptions.items[0].variants
      }

      return variants
    },
    getAttributeOptions(attrCode) {
      const attributes =
        this.page === 'checkout'
          ? this.item.product.attributes
          : this.item.attributes
      const variants =
        this.page === 'checkout'
          ? this.item.product.variants
          : this.item.variants

      const { id, options: baseOptions } = attributes.find(
        (attr) => attr.code === attrCode
      )

      // Map available options from product variants
      const attrOptions = variants
        .reduce((attrOptions, variant) => {
          const currOptionAttr = variant.attributes.find(
            (attr) => attr.code === attrCode
          )

          const addedOption = attrOptions.find(
            (option) => option && option.id === currOptionAttr.value
          )

          if (typeof addedOption === 'undefined') {
            const targetOption = baseOptions.find(
              (option) => option.id === currOptionAttr.value
            )
            attrOptions.push({
              variants: [variant.id],
              ...targetOption
            })
          } else {
            addedOption.variants.push(variant.id)
          }

          return attrOptions
        }, [])
        .sort((x, y) => {
          const byId = (id) => (z) => z.id === id

          const xIndex = baseOptions.findIndex(byId(x.id))
          const yIndex = baseOptions.findIndex(byId(y.id))

          return xIndex - yIndex
        })

      return {
        attribute: id,
        items: attrOptions
      }
    }
  }
}
