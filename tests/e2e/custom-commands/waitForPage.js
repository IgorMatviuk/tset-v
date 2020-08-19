module.exports = {
  command(pagename) {
    const selector = `.${pagename}-page`

    this.waitForElementVisible('body')
      .waitForElementPresent(selector, 10000)
      .waitForElementNotVisible('.preloader')
      .assert.not.elementPresent('.error-page')
      .assert.not.elementPresent('.__nuxt-error-page')

    if (pagename === 'home') {
      this.pause(2000)
    }
  }
}
