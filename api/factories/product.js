const shortid = require('shortid')

function getImageMap(i) {
  const imgIndex = (i % 4) + 1

  const imgTmpl = {
    thumb_lg: `/img/previews/preview-${imgIndex}-large.jpg`,
    original_image_url: `/img/previews/preview-${imgIndex}-large.jpg`,
    thumb_md: `/img/previews/preview-${imgIndex}-medium.jpg`,
    thumb_sm: `/img/previews/preview-${imgIndex}-small.jpg`,
    thumb_xs: `/img/previews/preview-${imgIndex}-small.jpg`
  }

  return imgTmpl
}

function getPreviews() {
  return [
    {
      preview_type: 'image',
      title: 'some title',
      preview_xl: '/img/product/product__large-1.jpg',
      preview_lg: '/img/product/product__medium-1.jpg',
      original: '/img/product/product__medium-1.jpg'
    },
    {
      preview_type: 'image',
      title: 'some title',
      preview_xl: '/img/product/product__large-2.jpg',
      preview_lg: '/img/product/product__medium-2.jpg',
      original: '/img/product/product__medium-2.jpg'
    },
    {
      preview_type: 'image',
      title: 'some title',
      preview_xl: '/img/product/product__large-3.jpg',
      preview_lg: '/img/product/product__medium-3.jpg',
      original: '/img/product/product__medium-3.jpg'
    },
    {
      preview_type: 'image',
      title: 'some title',
      preview_xl: '/img/product/product__large-4.jpg',
      preview_lg: '/img/product/product__medium-4.jpg',
      original: '/img/product/product__medium-4.jpg'
    },
    {
      preview_type: 'image',
      title: 'some title',
      preview_xl: '/img/product/product__large-1.jpg',
      preview_lg: '/img/product/product__medium-1.jpg',
      original: '/img/product/product__medium-1.jpg'
    },
    {
      preview_type: 'video',
      video_url: '/video/product/video.mp4',
      poster_url: '/img/product/product__large-1.jpg'
    }
  ]
}

function getColorOptions(i) {
  const colors = [
    [
      { id: 111, label: 'Чёрный', slug: 'chyornyj', swatch_value: '#000000' },
      {
        id: 222,
        label: 'Оранжевый',
        slug: 'oranzhevy',
        swatch_value: '#E77D00'
      },
      {
        id: 333,
        label: 'Коричневый',
        slug: 'korichnevy',
        swatch_value: '#A26767'
      }
    ],
    [
      { id: 111, label: 'Чёрный', slug: 'chyornyj', swatch_value: '#000000' },
      { id: 222, label: 'Синий', slug: 'sinij', swatch_value: '#000F95' }
    ],
    [
      {
        id: 111,
        label: 'Бежевый',
        slug: 'bezhevyj',
        swatch_value: '#EEDBD5'
      },
      {
        id: 222,
        label: 'Бирюзовый',
        slug: 'biryuzovy',
        swatch_value: '#82BDCF'
      },
      { id: 333, label: 'Бардовый', slug: 'bardovy', swatch_value: '#9C1744' }
    ],
    [
      {
        id: 111,
        label: 'Бежевый',
        slug: 'bezhevyj',
        swatch_value: '#EEDBD5'
      },
      {
        id: 222,
        label: 'Бирюзовый',
        slug: 'biryuzovy',
        swatch_value: '#82BDCF'
      },
      { id: 333, label: 'Серый', slug: 'sery', swatch_value: '#C4C4C4' }
    ]
  ]
  return colors[i % colors.length]
}

function getSizeOptions() {
  return [
    { id: 444, label: 'XS', slug: 'xs', swatch_value: null },
    { id: 555, label: 'S', slug: 's', swatch_value: null },
    { id: 666, label: 'M', slug: 'm', swatch_value: null },
    { id: 777, label: 'L', slug: 'l', swatch_value: null }
  ]
}

function getProductName(i) {
  const names = [
    'Брюки кожаные с карманами',
    'Хлопковое платье',
    'Струящееся платье с цветочным принтом',
    'Трикотажное платье с поясом'
  ]

  return names[i % names.length]
}

function getStockStatus(i, context) {
  const isSale = context.discount_price(i) !== null
  const isNew = context.is_new(i)

  return isSale || isNew
}

function getDiscountPrice(i, type) {
  if (type === 'formatted') {
    return i % 2 === 0 ? '750 грн' : null
  } else {
    return i % 2 === 0 ? '750.0000' : null
  }
}

function getAttributeFamily() {
  return {
    description: {
      short_description: {
        value: 'Some description'
      }
    },
    spec: {
      composition: {
        code: 'composition',
        name: 'Ткань и состав',
        type: 'text',
        value: null
      },
      measurements: {
        code: 'measurements',
        name: 'Обмеры',
        type: 'text',
        value: null
      }
    },
    info: {
      care: {
        code: 'care',
        name: 'Уход за изделием',
        type: 'textarea',
        value: null
      }
    }
  }
}

function getVariantId() {
  return shortid.generate()
}

function getVariants(i, context) {
  return [
    {
      id: getVariantId(),
      type: 'simple',
      sku: 'dress-base-variant-1-7',
      name: getProductName(i),
      url_key: `strujashheesja-platje-s-cvetochnym-printom-base-variant-1-7-${i}`,
      price: '100.0000',
      formatted_price: '1500 грн',
      discount_price: getDiscountPrice(i, 'default'),
      formatted_discount_price: getDiscountPrice(i, 'formatted'),
      attributes: [
        {
          id: 7,
          code: 'color',
          locale: null,
          channel: null,
          value: 111,
          product_id: 2,
          attribute_id: 23,
          attribute: {
            id: 23,
            code: 'color',
            admin_name: 'Color',
            type: 'select',
            validation: '',
            position: 23,
            is_required: 1,
            is_unique: 0,
            value_per_locale: 0,
            value_per_channel: 0,
            is_filterable: 1,
            is_configurable: 1,
            is_user_defined: 1,
            is_visible_on_front: 1,
            created_at: '2020-02-25 19:52:47',
            updated_at: '2020-02-27 15:45:15',
            swatch_type: 'color',
            use_in_flat: 1,
            name: 'Color',
            translations: [
              {
                id: 23,
                locale: 'en',
                name: 'Color',
                attribute_id: 23
              }
            ]
          }
        },
        {
          id: 8,
          code: 'size',
          locale: null,
          channel: null,
          value: 444,
          product_id: 2,
          attribute_id: 24,
          attribute: {
            id: 24,
            code: 'size',
            admin_name: 'Size',
            type: 'select',
            validation: null,
            position: 24,
            is_required: 0,
            is_unique: 0,
            value_per_locale: 0,
            value_per_channel: 0,
            is_filterable: 1,
            is_configurable: 1,
            is_user_defined: 1,
            is_visible_on_front: 0,
            created_at: '2020-02-25 19:52:47',
            updated_at: '2020-02-25 19:52:47',
            swatch_type: null,
            use_in_flat: 1,
            name: 'Size',
            translations: [
              {
                id: 24,
                locale: 'en',
                name: 'Size',
                attribute_id: 24
              }
            ]
          }
        }
      ],
      attribute_family: getAttributeFamily(),
      images: [],
      base_image: getImageMap(i),
      previews: getPreviews(),
      is_new: null,
      is_featured: null,
      in_stock: getStockStatus(i, context),
      variants: [],
      short_description: null,
      description: null,
      is_saved: false,
      created_at: '2020-02-27 15:23:05',
      updated_at: '2020-02-27 15:23:05'
    },
    {
      id: getVariantId(),
      type: 'simple',
      sku: 'dress-base-variant-2-7',
      name: getProductName(i + 1),
      url_key: `strujashheesja-platje-s-cvetochnym-printom-base-variant-2-7-${i}`,
      price: '100.0000',
      formatted_price: '1500 грн',
      discount_price: getDiscountPrice(i, 'default'),
      formatted_discount_price: getDiscountPrice(i, 'formatted'),
      attributes: [
        {
          id: 14,
          code: 'color',
          locale: null,
          channel: null,
          value: 222,
          product_id: 3,
          attribute_id: 23,
          attribute: {
            id: 23,
            code: 'color',
            admin_name: 'Color',
            type: 'select',
            validation: '',
            position: 23,
            is_required: 1,
            is_unique: 0,
            value_per_locale: 0,
            value_per_channel: 0,
            is_filterable: 1,
            is_configurable: 1,
            is_user_defined: 1,
            is_visible_on_front: 1,
            created_at: '2020-02-25 19:52:47',
            updated_at: '2020-02-27 15:45:15',
            swatch_type: 'color',
            use_in_flat: 1,
            name: 'Color',
            translations: [
              {
                id: 23,
                locale: 'en',
                name: 'Color',
                attribute_id: 23
              }
            ]
          }
        },
        {
          id: 15,
          code: 'size',
          locale: null,
          channel: null,
          value: 444,
          product_id: 3,
          attribute_id: 24,
          attribute: {
            id: 24,
            code: 'size',
            admin_name: 'Size',
            type: 'select',
            validation: null,
            position: 24,
            is_required: 0,
            is_unique: 0,
            value_per_locale: 0,
            value_per_channel: 0,
            is_filterable: 1,
            is_configurable: 1,
            is_user_defined: 1,
            is_visible_on_front: 0,
            created_at: '2020-02-25 19:52:47',
            updated_at: '2020-02-25 19:52:47',
            swatch_type: null,
            use_in_flat: 1,
            name: 'Size',
            translations: [
              {
                id: 24,
                locale: 'en',
                name: 'Size',
                attribute_id: 24
              }
            ]
          }
        }
      ],
      attribute_family: getAttributeFamily(),
      images: [],
      base_image: getImageMap(i + 1),
      previews: getPreviews(),
      is_new: null,
      is_featured: null,
      in_stock: getStockStatus(i, context),
      variants: [],
      short_description: null,
      description: null,
      is_saved: false,
      created_at: '2020-02-27 15:23:05',
      updated_at: '2020-02-27 15:23:05'
    },
    {
      id: getVariantId(),
      type: 'simple',
      sku: 'dress-base-variant-1-8',
      name: getProductName(i),
      url_key: `strujashheesja-platje-s-cvetochnym-printom-base-variant-1-8-${i}`,
      price: '100.0000',
      formatted_price: '1500 грн',
      discount_price: getDiscountPrice(i, 'default'),
      formatted_discount_price: getDiscountPrice(i, 'formatted'),
      attributes: [
        {
          id: 21,
          code: 'color',
          locale: null,
          channel: null,
          value: 111,
          product_id: 4,
          attribute_id: 23,
          attribute: {
            id: 23,
            code: 'color',
            admin_name: 'Color',
            type: 'select',
            validation: '',
            position: 23,
            is_required: 1,
            is_unique: 0,
            value_per_locale: 0,
            value_per_channel: 0,
            is_filterable: 1,
            is_configurable: 1,
            is_user_defined: 1,
            is_visible_on_front: 1,
            created_at: '2020-02-25 19:52:47',
            updated_at: '2020-02-27 15:45:15',
            swatch_type: 'color',
            use_in_flat: 1,
            name: 'Color',
            translations: [
              {
                id: 23,
                locale: 'en',
                name: 'Color',
                attribute_id: 23
              }
            ]
          }
        },
        {
          id: 22,
          code: 'size',
          locale: null,
          channel: null,
          value: 555,
          product_id: 4,
          attribute_id: 24,
          attribute: {
            id: 24,
            code: 'size',
            admin_name: 'Size',
            type: 'select',
            validation: null,
            position: 24,
            is_required: 0,
            is_unique: 0,
            value_per_locale: 0,
            value_per_channel: 0,
            is_filterable: 1,
            is_configurable: 1,
            is_user_defined: 1,
            is_visible_on_front: 0,
            created_at: '2020-02-25 19:52:47',
            updated_at: '2020-02-25 19:52:47',
            swatch_type: null,
            use_in_flat: 1,
            name: 'Size',
            translations: [
              {
                id: 24,
                locale: 'en',
                name: 'Size',
                attribute_id: 24
              }
            ]
          }
        }
      ],
      attribute_family: getAttributeFamily(),
      images: [],
      base_image: getImageMap(i),
      previews: getPreviews(),
      is_new: null,
      is_featured: null,
      in_stock: getStockStatus(i, context),
      variants: [],
      short_description: null,
      description: null,
      is_saved: false,
      created_at: '2020-02-27 15:23:06',
      updated_at: '2020-02-27 15:23:06'
    },
    {
      id: getVariantId(),
      type: 'simple',
      sku: 'dress-base-variant-2-8',
      name: getProductName(i + 1),
      url_key: `strujashheesja-platje-s-cvetochnym-printom-base-variant-2-8-${i}`,
      price: '100.0000',
      formatted_price: '1500 грн',
      discount_price: getDiscountPrice(i, 'default'),
      formatted_discount_price: getDiscountPrice(i, 'formatted'),
      attributes: [
        {
          id: 28,
          code: 'color',
          locale: null,
          channel: null,
          value: 222,
          product_id: 5,
          attribute_id: 23,
          attribute: {
            id: 23,
            code: 'color',
            admin_name: 'Color',
            type: 'select',
            validation: '',
            position: 23,
            is_required: 1,
            is_unique: 0,
            value_per_locale: 0,
            value_per_channel: 0,
            is_filterable: 1,
            is_configurable: 1,
            is_user_defined: 1,
            is_visible_on_front: 1,
            created_at: '2020-02-25 19:52:47',
            updated_at: '2020-02-27 15:45:15',
            swatch_type: 'color',
            use_in_flat: 1,
            name: 'Color',
            translations: [
              {
                id: 23,
                locale: 'en',
                name: 'Color',
                attribute_id: 23
              }
            ]
          }
        },
        {
          id: 29,
          code: 'size',
          locale: null,
          channel: null,
          value: 555,
          product_id: 5,
          attribute_id: 24,
          attribute: {
            id: 24,
            code: 'size',
            admin_name: 'Size',
            type: 'select',
            validation: null,
            position: 24,
            is_required: 0,
            is_unique: 0,
            value_per_locale: 0,
            value_per_channel: 0,
            is_filterable: 1,
            is_configurable: 1,
            is_user_defined: 1,
            is_visible_on_front: 0,
            created_at: '2020-02-25 19:52:47',
            updated_at: '2020-02-25 19:52:47',
            swatch_type: null,
            use_in_flat: 1,
            name: 'Size',
            translations: [
              {
                id: 24,
                locale: 'en',
                name: 'Size',
                attribute_id: 24
              }
            ]
          }
        }
      ],
      images: [],
      base_image: getImageMap(i + 1),
      previews: getPreviews(),
      is_new: null,
      is_featured: null,
      in_stock: getStockStatus(i, context),
      variants: [],
      short_description: null,
      description: null,
      is_saved: false,
      created_at: '2020-02-27 15:23:06',
      updated_at: '2020-02-27 15:23:06'
    },
    {
      id: getVariantId(),
      type: 'simple',
      sku: 'dress-base-variant-2-9',
      name: getProductName(i + 1),
      url_key: `strujashheesja-platje-s-cvetochnym-printom-base-variant-2-9-${i}`,
      price: '100.0000',
      formatted_price: '1500 грн',
      discount_price: getDiscountPrice(i, 'default'),
      formatted_discount_price: getDiscountPrice(i, 'formatted'),
      attributes: [
        {
          id: 28,
          code: 'color',
          locale: null,
          channel: null,
          value: 222,
          product_id: 5,
          attribute_id: 23,
          attribute: {
            id: 23,
            code: 'color',
            admin_name: 'Color',
            type: 'select',
            validation: '',
            position: 23,
            is_required: 1,
            is_unique: 0,
            value_per_locale: 0,
            value_per_channel: 0,
            is_filterable: 1,
            is_configurable: 1,
            is_user_defined: 1,
            is_visible_on_front: 1,
            created_at: '2020-02-25 19:52:47',
            updated_at: '2020-02-27 15:45:15',
            swatch_type: 'color',
            use_in_flat: 1,
            name: 'Color',
            translations: [
              {
                id: 23,
                locale: 'en',
                name: 'Color',
                attribute_id: 23
              }
            ]
          }
        },
        {
          id: 29,
          code: 'size',
          locale: null,
          channel: null,
          value: 666,
          product_id: 6,
          attribute_id: 24,
          attribute: {
            id: 24,
            code: 'size',
            admin_name: 'Size',
            type: 'select',
            validation: null,
            position: 24,
            is_required: 0,
            is_unique: 0,
            value_per_locale: 0,
            value_per_channel: 0,
            is_filterable: 1,
            is_configurable: 1,
            is_user_defined: 1,
            is_visible_on_front: 0,
            created_at: '2020-02-25 19:52:47',
            updated_at: '2020-02-25 19:52:47',
            swatch_type: null,
            use_in_flat: 1,
            name: 'Size',
            translations: [
              {
                id: 24,
                locale: 'en',
                name: 'Size',
                attribute_id: 24
              }
            ]
          }
        }
      ],
      images: [],
      base_image: getImageMap(i + 1),
      previews: getPreviews(),
      is_new: null,
      is_featured: null,
      in_stock: getStockStatus(i, context),
      variants: [],
      short_description: null,
      description: null,
      is_saved: false,
      created_at: '2020-02-27 15:23:06',
      updated_at: '2020-02-27 15:23:06'
    }
  ]
}

const productAttrs = {
  id(i) {
    return i + 1
  },

  name(i) {
    return getProductName(i)
  },

  url_key(i) {
    const keys = [
      'brjuki-kozhanye-s-karmanami',
      'hlopkovoe-platje',
      'strujashheesja-platje-s-cvetochnym-printom',
      'trikotazhnoe-platje-s-pojasom'
    ]

    return `${keys[i % keys.length]}-${i + 1}`
  },

  sku(i) {
    return `VR0${i + 1}-0100668`
  },

  price(i) {
    const prices = ['1150.0000', '950.0000', '750.0000', '550.0000']

    return prices[i % prices.length]
  },

  formatted_price(i) {
    const formatedPrices = ['1150 грн', '950 грн', '750 грн', '550 грн']

    return formatedPrices[i % formatedPrices.length]
  },

  discount_price(i) {
    const discountPrice = '750.0000'

    return i % 2 === 0 ? discountPrice : null
  },

  formatted_discount_price(i) {
    const formatedFiscountPrice = '750 грн'

    return i % 2 === 0 ? formatedFiscountPrice : null
  },

  attributes(i) {
    const attrList = [
      [
        {
          id: 11,
          code: 'color',
          name: 'Цвет',
          options: getColorOptions(i)
        },
        {
          id: 22,
          code: 'size',
          name: 'Размер',
          options: getSizeOptions()
        }
      ],
      [
        {
          id: 11,
          code: 'color',
          name: 'Цвет',
          options: getColorOptions(i)
        },
        {
          id: 22,
          code: 'size',
          name: 'Размер',
          options: getSizeOptions()
        }
      ],
      [
        {
          id: 11,
          code: 'color',
          name: 'Цвет',
          options: getColorOptions(i)
        },
        {
          id: 22,
          code: 'size',
          name: 'Размер',
          options: getSizeOptions()
        }
      ],
      [
        {
          id: 11,
          code: 'color',
          name: 'Цвет',
          options: getColorOptions(i)
        },
        {
          id: 22,
          code: 'size',
          name: 'Размер',
          options: getSizeOptions()
        }
      ]
    ]

    return attrList[i % attrList.length]
  },

  attribute_family() {
    return getAttributeFamily()
  },

  images(i) {
    const imgMap = getImageMap(i)

    return [imgMap]
  },

  base_image(i) {
    return getImageMap(i)
  },

  previews() {
    return getPreviews()
  },

  variants(i) {
    return getVariants(i, this)
  },

  is_new(i) {
    const isSale = this.discount_price(i) !== null
    return !isSale && (i + 1) % 3 === 0
  },

  in_stock(i) {
    return getStockStatus(i, this)
  },

  reviews() {
    return []
  }
}

module.exports = productAttrs
