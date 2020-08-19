const shared = require('../shared')

const checkoutCommands = {
  placeOrder(params) {
    // TODO:
  }
}

module.exports = {
  url() {
    return `${this.api.launchUrl}/checkout`
  },
  commands: [checkoutCommands],
  elements: {
    messageEmpty: '.checkout-empty',
    loadingOverlay: '.loading-overlay',
    submit: '.checkout__submit',
    contactInfo: '.checkout__item--contacts',
    deliveryInfo: '.checkout__item--delivery',
    paymentInfo: '.checkout__item--payment',
    orderItems: '.checkout-order__item',
    totalPrice: '.checkout-order__total-price',
    colorOptions:
      '.options-select__option--color:not(.options-select__option--active):not(.options-select__option--disabled)',
    sizeOptions:
      '.options-select__option--size:not(.options-select__option--active):not(.options-select__option--disabled)',
    popover: '.popover'
  },
  sections: {
    masthead: shared.sections.masthead,
    cartPreview: shared.sections.cartPreview,
    contactInfo: {
      selector: '.checkout__item--contacts',
      elements: {
        regionChangeTrigger: '.vti__dropdown',
        regionChangeDropdown: '.vti__dropdown-list',
        regionUaTrigger: {
          selector: '//ul[@class="vti__dropdown-list below"]/li[228]',
          locateStrategy: 'xpath'
        },

        firstNameInput: 'input#checkoutFirstName',
        firstNameError: 'input#checkoutFirstName + .error-message',

        lastNameInput: 'input#checkoutLastName',
        lastNameError: 'input#checkoutLastName + .error-message',

        phoneInput: 'input[type="tel"]',
        phoneError: '.vue-tel-input + .error-message',

        emailInput: 'input#checkoutEmail',
        emailError: 'input#checkoutEmail + .error-message'
      }
    },
    deliveryInfo: {
      selector: '.checkout__item--delivery',
      sections: {
        deliveryMethods: {
          selector: '.checkout-info__delivery-methods',
          elements: {
            novaposhtaInput: 'input[value="novaposhta"]',
            novaposhtaLabel: 'input[value="novaposhta"] + label',

            localInput: 'input[value="local"]',
            localLabel: 'input[value="local"] + label',

            abroadInput: 'input[value="abroad"]',
            abroadLabel: 'input[value="abroad"] + label'
          }
        },
        deliverySelection: {
          selector: '.checkout-info__delivery-wrapper',
          elements: {
            countryInput: 'input#checkoutСountry',
            countriesDropdown:
              'input#checkoutСountry ~ .search-select__dropdown',
            countryOptions:
              'input#checkoutСountry ~ .search-select__dropdown .search-select__option',

            cityInput: 'input#checkoutCity',
            citiesDropdown: 'input#checkoutCity ~ .search-select__dropdown',
            cityOptions:
              'input#checkoutCity ~ .search-select__dropdown .search-select__option',

            officeInput: 'input#checkoutOffice',
            officesDropdown: 'input#checkoutOffice ~ .search-select__dropdown',
            officeOptions:
              'input#checkoutOffice ~ .search-select__dropdown .search-select__option',

            addressInput: 'input#checkoutAddress',
            addressError: 'input#checkoutAddress + .error-message'
          }
        }
      }
    },
    //   paymentInfo: {}
    orderInfo: {
      selector: '.checkout-order',
      elements: {
        orderItems: '.checkout-order__item',

        btnRemove: '.order-item__remove',
        btnIncreaseQty: '.counter__toggle--increase',
        btnDecreaseQty: '.counter__toggle--decrease',

        triggerColorPopover: '.order-item__colors',
        triggerSizePopover: '.order-item__sizes',

        totalPrice: '.checkout-order__total-price'
      }
    }
  }
}
