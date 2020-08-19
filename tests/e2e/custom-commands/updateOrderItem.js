module.exports = {
  command({ type, name }) {
    const checkoutPage = this.page.checkout()
    const { orderInfo } = checkoutPage.section

    let triggerName

    const cName = `${name.charAt(0).toUpperCase()}${name.slice(1)}`

    if (type === 'quantity') {
      triggerName = `@btn${cName}Qty`
    } else if (type === 'attribute') {
      triggerName = `@trigger${cName}Popover`
    } else if (type === 'chore') {
      triggerName = `@btn${cName}`
    }

    this.listenXHR().perform(() => {
      orderInfo.click(triggerName)
    })

    if (type === 'attribute') {
      this.perform(() => {
        checkoutPage.waitForElementVisible('@popover')
      }).perform(() => {
        const optionElements = `${name}Options`
        const optionTrigger = `@${optionElements}`

        orderInfo.randomClick({
          fromElements: checkoutPage.elements[optionElements].selector,
          section: checkoutPage,
          trigger: optionTrigger
        })
      })
    }

    this.perform(() => {
      checkoutPage.waitForElementNotPresent('@loadingOverlay')
    })

    if (name === 'remove') {
      this.getXHR('checkout/cart/remove-item', 1500, (xhrs) => {
        this.assert.equal(xhrs.length, 1)
        this.assert.equal(xhrs[0].status, 'success')
        this.assert.equal(xhrs[0].method, 'GET')
        this.assert.equal(xhrs[0].httpResponseCode, '200')
      })
    } else {
      this.getXHR('checkout/cart/update', 1500, (xhrs) => {
        this.assert.equal(xhrs.length, 1)
        this.assert.equal(xhrs[0].status, 'success')
        this.assert.equal(xhrs[0].method, 'PUT')
        this.assert.equal(xhrs[0].httpResponseCode, '200')
      })
    }
  }
}
