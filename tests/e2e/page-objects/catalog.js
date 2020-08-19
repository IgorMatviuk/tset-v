const shared = require('../shared')

const catalogCommands = {
  selectFilterOptions(params) {
    const catalogPage = this.api.page.catalog()
    const { catalogFilter } = catalogPage.section

    const attributes = ['size', 'color', 'pattern', 'style', 'material']

    for (let i = 0; i < attributes.length; i++) {
      const attr = attributes[i]

      for (let j = 0; j < params.perAttribute; j++) {
        this.api.pause(100).randomClick({
          fromElements: catalogFilter.elements[`${attr}Options`].selector,
          section: catalogFilter,
          trigger: `@${attr}Options`
        })
      }
    }
  }
}

module.exports = {
  commands: [catalogCommands],
  elements: {
    cartPreview: shared.elements.cartPreview,
    cartSpinner: shared.elements.cartSpinner,
    selectedOptions: '[type="checkbox"]:checked'
  },
  sections: {
    masthead: shared.sections.masthead,
    cartPreview: shared.sections.cartPreview,
    filterSelection: {
      selector: '.filter-selection',
      elements: {
        selections: '.filter-selection__item'
      }
    },
    catalogFilter: {
      selector: '.catalog-filter',
      elements: {
        triggerFilter: '.catalog-filter__label--filters',

        filterList: '.collapse',

        sizeOptions: '.catalog-filter__column:nth-child(1) label',
        colorOptions: '.catalog-filter__column:nth-child(2) label',
        patternOptions: '.catalog-filter__column:nth-child(3) label',
        styleOptions: '.catalog-filter__column:nth-child(4) label',
        materialOptions: '.catalog-filter__column:nth-child(5) label',

        btnApply: '.catalog-filter__footer .catalog-filter__btn-apply',
        btnClear: '.catalog-filter__footer .btn-clear-filters'
      }
    },
    catalogResults: {
      selector: '.catalog-results',
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
