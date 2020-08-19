module.exports = {
  command({ currentPage, user: { email, password } }, assertValues) {
    const page = this.page[currentPage]()
    const { loginModal } = page.section

    loginModal.clearValue('@emailInput')
    loginModal.setValue('@emailInput', email)

    loginModal.clearValue('@passwordInput')
    loginModal.setValue('@passwordInput', password)

    this.waitForXHR(
      'login|get',
      5000,
      () => {
        loginModal.click('@submit')
      },
      (xhrs) => {
        // Login action
        this.assert.equal(xhrs[0].status, 'success')
        this.assert.equal(xhrs[0].method, 'POST')
        this.assert.equal(xhrs[0].httpResponseCode, '200')

        // Get user action
        this.assert.equal(xhrs[1].status, 'success')
        this.assert.equal(xhrs[1].method, 'GET')
        this.assert.equal(xhrs[1].httpResponseCode, '200')

        assertValues && assertValues()
      }
    )
  }
}
