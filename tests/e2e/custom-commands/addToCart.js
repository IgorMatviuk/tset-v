module.exports = {
  command(params) {
    const page = this.page[params.currentPage]()
    const { masthead } = page.section

    let addToCartClickTrigger

    this.listenXHR()
      .perform(() => {
        const isProductPageItself =
          params.currentPage === 'product' && !params.section

        if (isProductPageItself) {
          const { productInfo } = page.section
          addToCartClickTrigger = () => productInfo.click('@btnAddToCart')
        } else {
          const targetBlock = page.section[params.section]
          const { regularProduct } = targetBlock.sections

          regularProduct.click('@btnAddToCart')
          // TODO: get random size
          addToCartClickTrigger = () => regularProduct.click('@btnSelectSize')
        }

        addToCartClickTrigger()
      })
      .perform(() => {
        page.waitForElementVisible('@cartPreview')
      })
      .perform(() => {
        page.waitForElementNotPresent('@cartSpinner')
      })
      .getXHR('checkout/cart/add', 1000, (xhrs) => {
        this.assert.equal(xhrs.length, 1)
        this.assert.equal(xhrs[0].status, 'success')
        this.assert.equal(xhrs[0].method, 'POST')
        this.assert.equal(xhrs[0].httpResponseCode, '200')
      })
      .perform(() => {
        masthead.click('@btnCart')
        page.waitForElementNotPresent('@cartPreview')
      })
  }
}
