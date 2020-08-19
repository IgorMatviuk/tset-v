module.exports = {
  masthead: {
    selector: '.masthead',
    elements: {
      btnCatalog: '.masthead__catalog-trigger',
      btnCart: '.functions__shopping-bag',
      btnAuth: '.auth-buttons__btn'
    }
  },
  catalogMenu: {
    selector: '.catalog-menu',
    elements: {
      categoryLinks: '.catalog-menu__categories .catalog-menu__link'
    }
  },
  cartPreview: {
    selector: '.cart-preview',
    elements: {
      totalPrice: '.cart-preview__footer > b',
      btnCheckout: '.cart-preview__btn-checkout'
    }
  },
  myAccountPopover: {
    selector: '.popover',
    elements: {
      btnLogout: '.my-account__item:last-of-type > .my-account__link'
    }
  },
  loginModal: {
    selector: '.modal-form',
    elements: {
      close: '.modal-close',
      submit: 'button[type="submit"]',

      forgotPassModalTrigger: '.link-forgot-password > .next-modal-trigger',
      registerModalTrigger: '.link-register > .next-modal-trigger',

      generalErrorMessage: '.error-message--general',

      emailInput: 'input[name="email"]',
      emailError: 'input[name="email"] + .error-message',

      passwordInput: 'input[name="password"]',
      passwordError: 'input[name="password"] + .error-message'
    }
  },
  registerModal: {
    selector: '.modal-form',
    elements: {
      close: '.modal-close',
      submit: 'button[type="submit"]',

      loginModalTrigger: '.link-login > .next-modal-trigger',

      modalErrorMessages: '.form-group .error-message',

      regionChangeTrigger: '.vti__dropdown',
      regionChangeDropdown: '.vti__dropdown-list',
      regionUaTrigger: {
        selector: '//ul[@class="vti__dropdown-list below"]/li[228]',
        locateStrategy: 'xpath'
      },

      firstNameInput: 'input[name="first_name"]',
      firstNameError: 'input[name="first_name"] + .error-message',

      lastNameInput: 'input[name="last_name"]',
      lastNameError: 'input[name="last_name"] + .error-message',

      phoneInput: 'input[name="phone"]',
      phoneError: '.vue-tel-input + .error-message',

      emailInput: 'input[name="email"]',
      emailError: 'input[name="email"] + .error-message',

      passwordInput: 'input[name="password"]',
      passwordError: 'input[name="password"] + .error-message',

      passwordConfirmationInput: 'input[name="password_confirmation"]',
      passwordConfirmationError:
        'input[name="password_confirmation"] + .error-message'
    }
  }
}
