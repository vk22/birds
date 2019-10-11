
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    // style: [
    //   {src: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css' }
    // ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    `node_modules/animate.css/animate.css`,
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [

    { src: '~/plugins/vue-owl-carousel', ssr: false },
    { src: '~/plugins/vue-js-modal', ssr: false },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
  ],

  axios: {
    baseURL: '/api/'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  server: {
    port: 5000, // default: 3000
    host: 'localhost', // default: localhost
  },
  serverMiddleware: [
    // API middleware
    '~/api/index.js'
  ]
}
