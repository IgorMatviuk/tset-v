module.exports = {
  '@disabled': true,
  'Initial navigation': (client) => {
    const homepage = client.page.homepage()
    homepage.navigate()
    client.waitForPage('home')
  },
  'Open register modal': (client) => {
    client.openModal({
      currentPage: 'homepage',
      section: 'masthead',
      trigger: '@btnAuth',
      modal: '@modalForm'
    })

    const homepage = client.page.homepage()
    const { loginModal } = homepage.section

    loginModal.click('@registerModalTrigger')
  },
  'Validate fields on form submit': (client) => {
    const homepage = client.page.homepage()
    const { registerModal } = homepage.section

    registerModal.click('@submit')
    registerModal.expect.elements('@modalErrorMessages').count.to.equal(6)
    registerModal.click('@close')
  },
  'Validate separate field on change': (client) => {
    const homepage = client.page.homepage()
    const { loginModal, registerModal } = homepage.section

    client.openModal({
      currentPage: 'homepage',
      section: 'masthead',
      trigger: '@btnAuth',
      modal: '@modalForm'
    })

    loginModal.click('@registerModalTrigger')

    // Invalid
    registerModal.setValue('@firstNameInput', 'J')
    registerModal.expect.element('@firstNameError').to.be.present

    registerModal.setValue('@lastNameInput', 'D')
    registerModal.expect.element('@lastNameError').to.be.present

    registerModal.setValue('@phoneInput', '123')
    registerModal.expect.element('@phoneError').to.be.present

    registerModal.setValue('@emailInput', 'invalid email')
    registerModal.expect.element('@emailError').to.be.present

    registerModal.setValue('@passwordInput', '123')
    registerModal.expect.element('@passwordError').to.be.present

    registerModal.setValue('@passwordConfirmationInput', '1234')
    registerModal.expect.element('@passwordConfirmationError').to.be.present

    // Valid
    registerModal.clearValue('@firstNameInput')
    registerModal.setValue('@firstNameInput', 'John')
    registerModal.expect.element('@firstNameError').not.to.be.present

    registerModal.clearValue('@lastNameInput')
    registerModal.setValue('@lastNameInput', 'Doe')
    registerModal.expect.element('@lastNameError').not.to.be.present

    // UA phone number format
    registerModal.click('@regionChangeTrigger')
    registerModal.waitForElementVisible('@regionChangeDropdown')
    registerModal.click('@regionUaTrigger')
    registerModal.clearValue('@phoneInput')
    registerModal.setValue('@phoneInput', '661234567')
    registerModal.expect.element('@phoneError').not.to.be.present

    registerModal.clearValue('@emailInput')
    registerModal.setValue('@emailInput', 'example@mail.com')
    registerModal.expect.element('@emailError').not.to.be.present

    // TODO: stronger password
    registerModal.clearValue('@passwordInput')
    registerModal.setValue('@passwordInput', '123456')
    registerModal.expect.element('@passwordError').not.to.be.present

    registerModal.clearValue('@passwordConfirmationInput')
    registerModal.setValue('@passwordConfirmationInput', '123456')
    registerModal.expect.element('@passwordConfirmationError').not.to.be.present
  },
  'API fields validation': (client) => {
    const homepage = client.page.homepage()
    const { registerModal } = homepage.section

    registerModal.clearValue('@phoneInput')
    registerModal.setValue('@phoneInput', '+380 66 123 4567')

    client.waitForFirstXHR(
      'register',
      5000,
      () => {
        registerModal.click('@submit')
      },
      (xhr) => {
        client.assert.equal(xhr.status, 'error')
        client.assert.equal(xhr.method, 'POST')
        client.assert.equal(xhr.httpResponseCode, '409')

        registerModal.expect.element('@phoneError').to.be.present
      }
    )

    registerModal.clearValue('@emailInput')
    registerModal.setValue('@emailInput', 'johndoe@mail.com')

    client.waitForFirstXHR(
      'register',
      5000,
      () => {
        registerModal.click('@submit')
      },
      (xhr) => {
        client.assert.equal(xhr.status, 'error')
        client.assert.equal(xhr.method, 'POST')
        client.assert.equal(xhr.httpResponseCode, '409')

        registerModal.expect.element('@emailError').to.be.present
      }
    )
  },
  'User registration': (client) => {
    const homepage = client.page.homepage()
    const { registerModal } = homepage.section

    registerModal.clearValue('@phoneInput')
    registerModal.setValue('@phoneInput', '+380 66 765 4321')

    registerModal.clearValue('@emailInput')
    registerModal.setValue('@emailInput', 'johndoe1@mail.com')

    client.waitForFirstXHR(
      'register',
      5000,
      () => {
        registerModal.click('@submit')
      },
      (xhr) => {
        client.assert.equal(xhr.status, 'success')
        client.assert.equal(xhr.method, 'POST')
        client.assert.equal(xhr.httpResponseCode, '200')

        registerModal.expect.element('@phoneError').not.to.be.present
        registerModal.expect.element('@emailError').not.to.be.present

        homepage.waitForElementVisible('@modalMessage')
      }
    )
  }
}
