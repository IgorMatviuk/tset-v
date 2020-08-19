function registerRoutes(server) {
  const routes = [
    { method: 'get', filename: 'router', path: 'router' },
    { method: 'get', filename: 'main', path: 'main' },
    {
      method: 'get',
      filename: 'pages/testimonials',
      path: 'pages/testimonials'
    },
    {
      method: 'get',
      filename: 'pages/blog',
      path: 'pages/blog'
    },
    { method: 'get', filename: 'checkout', path: 'checkout' },
    { method: 'get', filename: 'checkout/cart', path: 'checkout/cart/:id' },
    {
      method: 'post',
      filename: 'checkout/cart/add',
      path: 'checkout/cart/add/:id'
    },
    {
      method: 'put',
      filename: 'checkout/cart/update',
      path: 'checkout/cart/:cart_id/update/:item_id/'
    },
    {
      method: 'get',
      filename: 'checkout/cart/remove-item',
      path: 'checkout/cart/remove-item/:id'
    },
    {
      method: 'post',
      filename: 'checkout/cart/save-order',
      path: 'checkout/cart/save-order'
    },
    {
      method: 'get',
      filename: 'shipping/countries',
      path: 'shipping/countries'
    },
    {
      method: 'get',
      filename: 'shipping/regions',
      path: 'shipping/regions'
    },
    {
      method: 'get',
      filename: 'shipping/states',
      path: 'shipping/states'
    },
    {
      method: 'get',
      filename: 'shipping/offices',
      path: 'shipping/offices'
    },
    { method: 'get', filename: 'customer/get', path: 'customer/get' },
    { method: 'post', filename: 'customer/login', path: 'customer/login' },
    {
      method: 'post',
      filename: 'customer/forgot-password',
      path: 'customer/forgot-password'
    },
    { method: 'get', filename: 'customer/logout', path: 'customer/logout' },
    {
      method: 'post',
      filename: 'customer/register',
      path: 'customer/register'
    },
    {
      method: 'get',
      filename: 'posts',
      path: 'posts'
    },
    {
      method: 'get',
      filename: 'posts/single',
      path: 'posts/:slug'
    }
  ]

  routes.forEach((route) => {
    const path = `/${route.path}`
    const filename = `./${route.filename}`
    const handler = require(filename)

    server[route.method](path, handler)
  })

  return routes.map(({ path }) => path)
}

module.exports = registerRoutes
