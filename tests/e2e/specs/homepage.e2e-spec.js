module.exports = {
  'Navigate to Home Page': (client) => {
    const homepage = client.page.homepage()
    homepage.navigate()
    client.waitForPage('home')
  },
  'Home Screen': (client) => {
    const homepage = client.page.homepage()
    const { homeScreen } = homepage.section

    homeScreen.expect.element('@slides').to.be.present
    homeScreen.expect.element('@navigation').to.be.present
  },
  'Static Collections': (client) => {
    const homepage = client.page.homepage()
    homepage.expect.section('@staticCollections').to.be.present
  },
  'Featured Products': (client) => {
    const homepage = client.page.homepage()
    homepage.expect.section('@featuredProducts').to.be.present

    const featuredProducts = homepage.section.featuredProducts
    featuredProducts.expect.element('.product-preview').to.be.present
  },
  'Category Collections': (client) => {
    const homepage = client.page.homepage()
    homepage.expect.section('@categoryCollections').to.be.present
  }
}
