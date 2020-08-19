const shared = require('../shared')

module.exports = {
  url() {
    return this.api.launchUrl
  },
  elements: shared.elements,
  sections: {
    ...shared.sections,
    homeScreen: {
      selector: '.home-screen',
      elements: {
        slides: '.home-screen__slide',
        navigation: '.home-screen__navigation'
      }
    },
    staticCollections: {
      selector: '.collections',
      index: 0
    },
    featuredProducts: {
      selector: '.featured-products',
      sections: {
        regularProduct: {
          selector: '.product-preview:not(.product-preview--out-of-stock)',
          index: 0,
          elements: {
            productName: '.product-preview__name',
            btnAddToCart: '.product-preview__btn-buy',
            btnSelectSize: '.product-preview__btn-size',
            link: 'a[href]'
          }
        }
      }
    },
    categoryCollections: {
      selector: '.collections',
      index: 1
    }
  }
}
