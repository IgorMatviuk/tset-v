const shared = require('../shared')

module.exports = {
  elements: shared.elements,
  sections: {
    masthead: shared.sections.masthead,
    cartPreview: shared.sections.cartPreview,
    productInfo: {
      selector: '.product__info',
      elements: {
        productName: '.product-info__name',
        btnAddToCart: '.product-info__add'
      }
    },
    similarProducts: {
      selector: '.product-page__similar-products',
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
    bestsellers: {
      selector: '.product-page__bestsellers',
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
    viewedProducts: {
      selector: '.product-page__viewed-products',
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
    }
  }
}
