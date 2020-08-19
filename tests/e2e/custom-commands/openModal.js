module.exports = {
  command(params) {
    const page = this.page[params.currentPage]()
    const targetBlock = page.section[params.section]

    page.waitForElementVisible(`@${params.section}`)

    const isHomePageMasthead =
      params.currentPage === 'homepage' && params.section === 'masthead'

    // Wait for masthead reveal animation
    if (isHomePageMasthead) {
      page.pause(1000)
    }

    targetBlock.click(params.trigger)
    page.waitForElementVisible(params.modal)
  }
}
