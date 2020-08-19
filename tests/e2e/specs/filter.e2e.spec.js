module.exports = {
  'Initial navigation': (client) => {
    const homepage = client.page.homepage()
    homepage.navigate()
    client.waitForPage('home')
  },
  'Navigate to catalog': (client) => {
    const homepage = client.page.homepage()
    const { masthead, catalogMenu } = homepage.section

    masthead.click('@btnCatalog')
    homepage.waitForElementPresent('@catalogMenu')

    client.randomClick({
      fromElements: catalogMenu.elements.categoryLinks.selector,
      section: catalogMenu,
      trigger: '@categoryLinks'
    })

    client.waitForPage('catalog')
  },
  'Filters selection': (client) => {
    const catalogPage = client.page.catalog()
    const { catalogFilter, filterSelection } = catalogPage.section

    // Select filters
    catalogFilter.click('@triggerFilter')
    catalogFilter.waitForElementVisible('@filterList')

    catalogPage.selectFilterOptions({ perAttribute: 1 })
    catalogFilter.expect.element('@btnApply').to.be.enabled

    // Clear filters
    catalogFilter.click('@btnClear')
    catalogFilter.waitForElementNotVisible('@filterList')
    catalogFilter.click('@triggerFilter')
    catalogFilter.waitForElementVisible('@filterList')
    catalogFilter.expect.element('@btnApply').not.to.be.enabled

    // Apply filters
    catalogPage.selectFilterOptions({ perAttribute: 2 })

    client.waitForFirstXHR(
      '',
      5000,
      () => {
        catalogFilter.click('@btnApply')
        filterSelection.waitForElementPresent('@selections')
      },
      (xhr) => {
        client.assert.equal(xhr.status, 'success')
        client.assert.equal(xhr.method, 'GET')
        client.assert.equal(xhr.httpResponseCode, '200')
      }
    )
  }
}
