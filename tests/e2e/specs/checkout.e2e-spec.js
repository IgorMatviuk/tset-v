module.exports = {
  '@tags': ['cart'],
  'Initial navigation': (client) => {
    const homepage = client.page.homepage()
    homepage.navigate()
    client.waitForPage('home')
  },
  'Navigate to checkout page': (client) => {
    const homepage = client.page.homepage()
    const { masthead, cartPreview } = homepage.section

    masthead.click('@btnCart')
    homepage.waitForElementVisible('@cartPreview')

    cartPreview.click('@btnCheckout')
    client.waitForPage('checkout')
  },
  'Checkout page has expected structure': (client) => {
    const checkoutPage = client.page.checkout()

    checkoutPage.expect.element('@messageEmpty').not.to.be.present
    checkoutPage.expect.element('@contactInfo').to.be.present
    checkoutPage.expect.element('@deliveryInfo').to.be.present
    checkoutPage.expect.element('@paymentInfo').to.be.present
    checkoutPage.expect.element('@orderItems').to.be.present
    checkoutPage.expect.element('@totalPrice').to.be.present
  },
  'Edit order': (client) => {
    // Increase quantity
    client.updateOrderItem({ type: 'quantity', name: 'increase' })

    // Decrease quantity
    client.updateOrderItem({ type: 'quantity', name: 'decrease' })

    // Edit size attribute
    client.updateOrderItem({ type: 'attribute', name: 'size' })

    // Edit color attribute
    client.updateOrderItem({ type: 'attribute', name: 'color' })
  },
  'Apply coupon': (client) => {
    // TODO:
  },
  'Validate separate field on change': (client) => {
    const checkoutPage = client.page.checkout()
    const { contactInfo } = checkoutPage.section

    // Invalid
    contactInfo.setValue('@firstNameInput', 'J')
    contactInfo.expect.element('@firstNameError').to.be.present
    contactInfo.clearValue('@firstNameInput')
    contactInfo.expect.element('@firstNameError').to.be.present

    contactInfo.setValue('@lastNameInput', 'D')
    contactInfo.expect.element('@lastNameError').to.be.present
    contactInfo.clearValue('@lastNameInput')
    contactInfo.expect.element('@lastNameError').to.be.present

    contactInfo.setValue('@phoneInput', '123')
    contactInfo.expect.element('@phoneError').to.be.present

    contactInfo.setValue('@emailInput', 'invalid email')
    contactInfo.expect.element('@emailError').to.be.present
    contactInfo.clearValue('@emailInput')
    contactInfo.expect.element('@emailError').to.be.present

    // Valid
    contactInfo.clearValue('@firstNameInput')
    contactInfo.setValue('@firstNameInput', 'John')
    contactInfo.expect.element('@firstNameError').not.to.be.present

    contactInfo.clearValue('@lastNameInput')
    contactInfo.setValue('@lastNameInput', 'Doe')
    contactInfo.expect.element('@lastNameError').not.to.be.present

    // UA phone number format
    contactInfo.click('@regionChangeTrigger')
    contactInfo.waitForElementVisible('@regionChangeDropdown')
    contactInfo.click('@regionUaTrigger')
    contactInfo.clearValue('@phoneInput')
    contactInfo.setValue('@phoneInput', '661234567')
    contactInfo.expect.element('@phoneError').not.to.be.present

    contactInfo.clearValue('@emailInput')
    contactInfo.setValue('@emailInput', 'john.doe1@mail.com')
    contactInfo.expect.element('@emailError').not.to.be.present
  },
  'Select delivery method': (client) => {
    const checkoutPage = client.page.checkout()
    const { deliveryInfo } = checkoutPage.section
    const { deliveryMethods, deliverySelection } = deliveryInfo.section

    // Novaposhta delivery
    deliveryMethods.click('@novaposhtaLabel')
    deliveryMethods.expect.element('@novaposhtaInput').to.be.selected

    // Select random city
    deliverySelection.assert.value('@cityInput', '')
    deliverySelection.click('@cityInput')
    deliverySelection.waitForElementVisible('@citiesDropdown')

    client
      .listenXHR()
      .perform(() => {
        deliverySelection.randomClick({
          fromElements: deliverySelection.elements.cityOptions.selector,
          section: deliverySelection,
          trigger: '@cityOptions'
        })
      })
      .getXHR('offices', 1000, (xhrs) => {
        client.assert.equal(xhrs.length, 1)
        client.assert.equal(xhrs[0].status, 'success')
        client.assert.equal(xhrs[0].method, 'GET')
        client.assert.equal(xhrs[0].httpResponseCode, '200')
      })

    // Select random office
    deliverySelection.click('@officeInput')
    deliverySelection.waitForElementVisible('@officesDropdown')

    deliverySelection.randomClick({
      fromElements: deliverySelection.elements.officeOptions.selector,
      section: deliverySelection,
      trigger: '@officeOptions'
    })

    // Local delivery
    deliveryMethods.click('@localLabel')
    deliveryMethods.expect.element('@localInput').to.be.selected

    // Select random city
    deliverySelection.assert.value('@cityInput', '')
    deliverySelection.click('@cityInput')
    deliverySelection.waitForElementVisible('@citiesDropdown')

    deliverySelection.randomClick({
      fromElements: deliverySelection.elements.cityOptions.selector,
      section: deliverySelection,
      trigger: '@cityOptions'
    })

    deliverySelection.setValue('@addressInput', 'foo')
    deliverySelection.clearValue('@addressInput')
    deliverySelection.expect.element('@addressError').to.be.present
    deliverySelection.setValue('@addressInput', 'some address')
    deliverySelection.expect.element('@addressError').not.to.be.present

    // Abroad delivery
    deliveryMethods.click('@abroadLabel')
    deliveryMethods.expect.element('@abroadInput').to.be.selected

    // Select random country
    deliverySelection.assert.value('@countryInput', '')
    deliverySelection.click('@countryInput')
    deliverySelection.waitForElementVisible('@countriesDropdown')

    deliverySelection.randomClick({
      fromElements: deliverySelection.elements.countryOptions.selector,
      section: deliverySelection,
      trigger: '@countryOptions'
    })
  },
  'API fields validation': (client) => {
    // TODO: check if user exists by phone number or email in the future release
  },
  'Clean cart': (client) => {
    const checkoutPage = client.page.checkout()
    const { orderInfo } = checkoutPage.section

    let orderItems = client
      .perform(() =>
        client.getElements(
          orderInfo.elements.orderItems.selector,
          (items) => (orderItems = items)
        )
      )
      .perform(() => {
        orderItems.forEach((_) =>
          client.updateOrderItem({ type: 'chore', name: 'remove' })
        )
      })
      .perform(() => checkoutPage.expect.element('@messageEmpty').to.be.present)
  },
  'Navigate to catalog': (client) => {
    const homepage = client.page.homepage()
    const { masthead, catalogMenu } = homepage.section

    client.pause(1000)
    masthead.click('@btnCatalog')
    homepage.waitForElementVisible('@catalogMenu')

    client.randomClick({
      fromElements: catalogMenu.elements.categoryLinks.selector,
      section: catalogMenu,
      trigger: '@categoryLinks'
    })

    client.waitForPage('catalog')
  },
  'Add item to cart and navigate to checkout': (client) => {
    const catalogPage = client.page.catalog()
    const { masthead, cartPreview } = catalogPage.section
    // const { regularProduct, discountProduct } = catalogResults

    client.addToCart({ currentPage: 'catalog', section: 'catalogResults' })

    masthead.click('@btnCart')
    catalogPage.waitForElementVisible('@cartPreview')

    cartPreview.click('@btnCheckout')
    client.waitForPage('checkout')
  },
  'Place order': (client) => {
    // const checkoutPage = client.page.checkout()
    // checkoutPage.placeOrder({ deliveryMethod: DELIVERY_METHODS.NOVAPOSHTA, itemsCount: 2 })
    // checkoutPage.placeOrder({ deliveryMethod: DELIVERY_METHODS.LOCAL, itemsCount: 2 })
    // checkoutPage.placeOrder({ deliveryMethod: DELIVERY_METHODS.ABROAD, itemsCount: 2 })
  }
}
