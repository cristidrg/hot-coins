export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'fractional-interview',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  target: 'server',

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/styles/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/svg',
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/pwa',
  ],

  colorMode: {
    classSuffix: '',
  },

  pwa: {
    manifest: {
      name: 'Coin Ranking',
      short_name: 'Coin Ranking',
      lang: 'en',
      display: 'standalone',
    },
    workbox: {
      runtimeCaching: [
        {
          // Should be a regex string. Compiles into new RegExp('https://my-cdn.com/.*')
          urlPattern: 'https://res.cloudinary.com/dpvqe9t6l.*',
          // Defaults to `NetworkFirst` if omitted
          // handler: 'NetworkFirst',
          // Defaults to `GET` if omitted
          // method: 'GET'
        },
      ],
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/style-resources',
    [
      'nuxt-vuex-localstorage',
      {
        localStorage: ['preferences', 'search'],
        versionPropName: 'frdca',
      },
    ],
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
