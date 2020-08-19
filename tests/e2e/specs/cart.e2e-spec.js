module.exports = {
  '@tags': ['cart'],
  'Initial navigation': (client) => {
    const homepage = client.page.homepage()
    homepage.navigate()
    client.waitForPage('home')
  },
  'Add item from "Featured Products" block': (client) => {
    client.addToCart({ currentPage: 'homepage', section: 'featuredProducts' })
  },
  'Add item from the page itself': (client) => {
    client.navigateToProduct({
      fromPage: 'homepage',
      section: 'featuredProducts'
    })

    client.addToCart({ currentPage: 'product' })
  },
  'Add item from "Similar Products" block': (client) => {
    client.addToCart({ currentPage: 'product', section: 'similarProducts' })
  },
  'Add item from "Bestsellers" block': (client) => {
    client.addToCart({ currentPage: 'product', section: 'bestsellers' })
  },
  'Add item from "Viewed Products" block': (client) => {
    client.addToCart({ currentPage: 'product', section: 'viewedProducts' })
  }
}
