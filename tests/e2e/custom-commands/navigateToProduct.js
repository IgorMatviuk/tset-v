module.exports = {
  command(params) {
    const page = this.page[params.fromPage]()
    const targetBlock = page.section[params.section]
    const { regularProduct } = targetBlock.sections

    regularProduct.click('@link')

    this.waitForPage('product')
  }
}
