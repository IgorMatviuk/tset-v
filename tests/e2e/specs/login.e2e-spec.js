module.exports = {
  '@disabled': true,
  'Initial navigation': (client) => {
    const homepage = client.page.homepage()
    homepage.navigate()
    client.waitForPage('home')
  },
  'Validate fields on form submit': (client) => {
    const homepage = client.page.homepage()
    const { loginModal } = homepage.section

    client.openModal({
      currentPage: 'homepage',
      section: 'masthead',
      trigger: '@btnAuth',
      modal: '@modalForm'
    })

    loginModal.click('@submit')

    loginModal.expect.element('@emailError').to.be.present
    loginModal.expect.element('@passwordError').to.be.present
  },
  'Validate separate field on change': (client) => {
    const homepage = client.page.homepage()
    const { loginModal } = homepage.section

    loginModal.setValue('@emailInput', 'invalid email')
    loginModal.expect.element('@emailError').to.be.present

    loginModal.setValue('@passwordInput', '123')
    loginModal.expect.element('@passwordError').to.be.present

    loginModal.clearValue('@emailInput')
    loginModal.setValue('@emailInput', 'example@mail.com')
    loginModal.expect.element('@emailError').not.to.be.present

    loginModal.clearValue('@passwordInput')
    loginModal.setValue('@passwordInput', '123456')
    loginModal.expect.element('@passwordError').not.to.be.present
  },
  'API fields validation': (client) => {
    const homepage = client.page.homepage()
    const { loginModal } = homepage.section

    loginModal.clearValue('@emailInput')
    loginModal.setValue('@emailInput', 'example@mail.com')
    loginModal.expect.element('@emailError').not.to.be.present

    loginModal.clearValue('@passwordInput')
    loginModal.setValue('@passwordInput', '123456')
    loginModal.expect.element('@passwordError').not.to.be.present

    client.waitForFirstXHR(
      'login',
      5000,
      () => {
        loginModal.click('@submit')
      },
      (xhr) => {
        client.assert.equal(xhr.status, 'error')
        client.assert.equal(xhr.method, 'POST')
        client.assert.equal(xhr.httpResponseCode, '404')

        loginModal.expect.element('@generalErrorMessage').to.be.present
      }
    )
  },
  'Login user': (client) => {
    const homepage = client.page.homepage()
    const { loginModal } = homepage.section

    client.loginUser(
      {
        currentPage: 'homepage',
        user: {
          email: 'johndoe@mail.com',
          password: '123456'
        }
      },
      () => {
        loginModal.expect.element('@generalErrorMessage').not.to.be.present
      }
    )

    loginModal.expect.element('@emailError').not.to.be.present
    loginModal.expect.element('@passwordError').not.to.be.present
  },
  'Logout user': (client) => {
    const homepage = client.page.homepage()
    const { masthead, myAccountPopover } = homepage.section

    masthead.click('@btnAuth')
    homepage.waitForElementVisible('@popover')

    client.waitForFirstXHR(
      'logout',
      5000,
      () => {
        myAccountPopover.click('@btnLogout')
      },
      (xhr) => {
        // Logout action
        client.assert.equal(xhr.status, 'success')
        client.assert.equal(xhr.method, 'GET')
        client.assert.equal(xhr.httpResponseCode, '200')
      }
    )
  }
}
