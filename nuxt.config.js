if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.env.test' })
} else {
  require('dotenv').config()
}

module.exports = {
  mode: 'universal',
  /*
   ** Server settings
   */
  server: {
    host: '0.0.0.0'
  },
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ]
  },
  /*
   ** Customize the progress-bar
   */
  loading: {
    css: false
  },
  /*
   ** Global CSS
   */
  css: [
    'swiper/css/swiper.css',
    'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css',
    '~/assets/scss/main.scss'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/bus.js' },
    { src: '~/plugins/i18n.js' },
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/viewed-products.js', ssr: false },
    { src: '~/plugins/intersection-observer-polyfill.js', ssr: false },
    { src: '~/plugins/object-fit-polyfill.js', ssr: false },
    { src: '~/plugins/vue-awesome-swiper.js', ssr: false },
    { src: '~/plugins/vue-lazysizes.js', ssr: false },
    { src: '~/plugins/vue-lazyload-video.js', ssr: false },
    { src: '~/plugins/vue-perfect-scrollbar.js', ssr: false },
    { src: '~/plugins/vuelidate.js', ssr: false },
    { src: '~/plugins/dynamic-modal.js', ssr: false },
    { src: '~/plugins/vue-tel-input.js', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://github.com/rigor789/vue-scrollto
    'vue-scrollto/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
    // Doc: https://github.com/nuxt-community/svg-sprite-module
    '@nuxtjs/svg-sprite',
    // Doc: https://github.com/nuxt-community/device-module
    '@nuxtjs/device',
    // Doc: https://github.com/nuxt-community/auth-module
    '@nuxtjs/auth',
    // Doc: https://github.com/rubystarashe/nuxt-vuex-localstorage
    [
      'nuxt-vuex-localstorage',
      {
        localstorage: ['cartId']
      }
    ]
  ],
  /*
   ** SVG sprite config
   */
  svgSprite: {
    input: '~/assets/img/icons/'
  },
  /*
   ** Style resources
   */
  styleResources: {
    scss: [
      '~/assets/scss/abstracts/_variables.scss',
      '~/assets/scss/abstracts/_mixins.scss',
      'bootstrap/scss/_functions.scss',
      'bootstrap/scss/_variables.scss',
      'bootstrap/scss/_mixins.scss'
    ]
  },
  /*
   ** Optionally import individual components
   ** See https://bootstarap-vue.js.org/docs/
   */
  bootstrapVue: {
    components: [
      'BContainer',
      'BRow',
      'BCol',
      'BDropdown',
      'BDropdownItem',
      'BCollapse',
      'BPopover',
      'BForm',
      'BFormInput',
      'BFormGroup',
      'BFormCheckbox',
      'BFormCheckboxGroup',
      'BButton',
      'BImg',
      'BImgLazy',
      'BPagination',
      'BBreadcrumb',
      'BBreadcrumbItem',
      'BFormRadio',
      'BFormRadioGroup',
      'BFormTextarea',
      'BModal',
      'BTable'
    ],
    directives: ['VBModal'],
    bootstrapCSS: false
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.API_URL
  },
  /*
   ** Auth module configuration
   ** See https://auth.nuxtjs.org/recipes/extend.html
   */
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/api/customer/login',
            method: 'post',
            propertyName: 'token'
          },
          logout: { url: '/api/customer/logout', method: 'get' },
          user: {
            url: '/api/customer/get',
            method: 'get',
            propertyName: 'data'
          }
        }
      },
      tokenRequired: true,
      tokenType: 'bearer'
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, { isDev, isClient, loaders: { vue } }) {
      if (isClient) {
        vue.transformAssetUrls.img = ['data-src', 'src']
        vue.transformAssetUrls.source = ['data-srcset', 'srcset']
      }
    }
  },
  /*
   ** Router config
   */
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style'].includes(type)
      }
    }
  },
  /*
   ** Router config
   */
  router: {
    middleware: ['i18n', 'header'],
    extendRoutes(routes, resolve) {
      const langRegExp = '([a-z]{2})'

      routes.push(
        {
          path: `/:lang${langRegExp}?`,
          component: resolve(__dirname, 'pages/-index.vue')
        },

        {
          path: `/:lang${langRegExp}?/search`,
          component: resolve(__dirname, 'pages/-search.vue'),
          name: 'searchPage'
        },

        {
          path: `/:lang${langRegExp}?/checkout`,
          component: resolve(__dirname, 'pages/-checkout.vue'),
          name: 'checkoutPage'
        },

        {
          path: `/:lang${langRegExp}?/account`,
          component: resolve(__dirname, 'pages/-account.vue'),
          name: 'accountPage'
        },

        {
          path: `/:lang${langRegExp}?/contacts`,
          component: resolve(__dirname, 'pages/-contacts.vue'),
          name: 'contactsPage'
        },

        {
          path: `/:lang${langRegExp}?/about`,
          component: resolve(__dirname, 'pages/-about.vue'),
          name: 'aboutUsPage'
        },

        // {
        //   path: `/:lang${langRegExp}?/testimonials`,
        //   component: resolve(__dirname, 'pages/-testimonials.vue'),
        //   name: 'testimonialsPage'
        // },

        {
          path: `/:lang${langRegExp}?/privacy-policy`,
          component: resolve(__dirname, 'pages/-privacy-policy.vue'),
          name: 'privacyPolicyPage'
        },

        {
          path: `/:lang${langRegExp}?/blog`,
          component: resolve(__dirname, 'pages/-blog.vue'),
          name: 'blogPage'
        },

        {
          path: `/:lang${langRegExp}?/blog/:slug`,
          component: resolve(__dirname, 'pages/-post.vue'),
          name: 'postPage'
        },

        {
          path: `/:lang${langRegExp}?/bonuses`,
          component: resolve(__dirname, 'pages/-bonuses.vue'),
          name: 'bonusesPage'
        },

        {
          path: `/:lang${langRegExp}?/payment`,
          component: resolve(__dirname, 'pages/-payment.vue'),
          name: 'paymentPage'
        },

        {
          path: `/:lang${langRegExp}?/exchange`,
          component: resolve(__dirname, 'pages/-exchange.vue'),
          name: 'exchangePage'
        },

        {
          path: `/:lang${langRegExp}?/*`,
          component: resolve(__dirname, 'pages/-.vue')
        }
      )
    }
  }
}
