const imageminMozjpeg = require('imagemin-mozjpeg')
// const JavaScriptObfuscator = require('webpack-obfuscator')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const isDev = process.env.NODE_ENV !== 'production'


module.exports = {
  mode: 'universal',
  ...(!isDev && {
    modern: 'client'
  }),
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'yandex-verification', content: 'bcbdff5a6793d84f'},
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      {
        rel: 'dns-prefetch',
        href: 'https://fonts.googleapis.com/',
        crossorigin: true
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Display:wght@100;300;400;500;600&display=swap'
      }
    ],
    script: [
      {
        src: 'calltouch.js'
      }
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
    //'@/assets/scss/base.scss'
  ],


  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // { src: '~plugins/vue-bootstrap.js', ssr: false },
    { src: '~/plugins/vue-js-modal', ssr: false },
    { src: '~/plugins/vue-scrollTo', ssr: false },
    // { src: '~/plugins/vue-awesome-swiper', ssr: false },
    { src: '~/plugins/vue-mask', ssr: false },
    { src: '~/plugins/vue-slider-component', ssr: false },
    { src: '~/plugins/google-maps', ssr: false },
    { src: '~/plugins/vue2-editor', ssr: false },
    { src: '~/plugins/vue-html-to-paper.js', ssr: false },
    { src: '~/plugins/vue-lazyload', ssr: false },
    { src: '~/plugins/vue-tinybox', ssr: false },
    { src: '~/plugins/vuejs-datepicker', ssr: false },
    { src: '~plugins/GoogleAnalytics.js', ssr: false },
    { src: '~plugins/vue-draggable.js', ssr: false },
    { src: '~plugins/utils.js', ssr: false },
    { src: '~plugins/utils2.js', ssr: false },
    { src: '~plugins/form-validate.js', ssr: false }

    
  ],
  /*
  ** Nuxt.js dev-modules
  */

  // Включаем автоматическое подключение компонентов.
  // components: true,
  components: {
    components: true,
    // dirs: [
    //   '~/components',
    //   '~/components/lots',
    //   '~/components/base/foo'
    // ]
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/toast',
    '@nuxtjs/style-resources',
    'bootstrap-vue/nuxt',
    'nuxt-vue-select',
    'cookie-universal-nuxt',
    // 'nuxt-webfontloader',
    
    // [
    //   '@nuxtjs/yandex-metrika',
    //   {
    //     id: '66785296',
    //     webvisor: true,
    //     clickmap:true,
    //     // useCDN:false,
    //     trackLinks:true,
    //     accurateTrackBounce:true,
    //   }
    // ]
  ],
  styleResources: {
    scss: [
      '~/assets/scss/variables.scss',
    ],
  },
  // webfontloader: {
  //   events: false,
  //   google: {
  //     families: ['Noto Sans Display:300,400,500,600:cyrillic&display=swap']
  //   },
  //   timeout: 5000
  // },
  bootstrapVue: {
    // bootstrapCSS: false,
    icons: true
  },
  toast: {
    position: 'top-right',
    duration: 2000
  },
  axios: {
    baseURL: '/api/'
  },
  loading: {
    name: 'chasing-dots',
    color: '#886F8A',
    background: 'white',
    height: '4px'
 },
 auth: {
  strategies: {
    local: {
      endpoints: {
        login: {url: '/user/login', method: 'post', propertyName: 'token' },
        logout: {url: 'logout', method: 'post'},
        user: {url: '/user/user', method: 'get', propertyName: false},
      },
      tokenRequired: true,
      tokenType: 'Bearer'
    }
  },
  },
  redirect: {
    login: '/login111',
    logout: '/login222',
    user: '/admin/subscribers',
    callback:'/admin/subscribers'
  },
  /*
  ** Build configuration
  */
  build: {    optimizeCss: false,
    filenames: {
      app: ({ isDev }) => isDev ? '[name].js' : 'js/[contenthash].js',
      chunk: ({ isDev }) => isDev ? '[name].js' : 'js/[contenthash].js',
      css: ({ isDev }) => isDev ? '[name].css' : 'css/[contenthash].css',
      img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]',
      font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[contenthash:7].[ext]',
      video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[contenthash:7].[ext]'
    },
    ...(!isDev && {
      html: {
        minify: {
          collapseBooleanAttributes: true,
          decodeEntities: true,
          minifyCSS: true,
          minifyJS: true,
          processConditionalComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          trimCustomFragments: true,
          useShortDoctype: true
        }
      }
    }),
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true
    },
    optimization: {
      minimize: !isDev
    },
    ...(!isDev && {
      extractCSS: {
        ignoreOrder: true
      }
    }),
    transpile: [/^vue2-google-maps($|\/)/],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      const ORIGINAL_TEST = '/\\.(png|jpe?g|gif|svg|webp)$/i'

      // Remove any original svg rules

      // const vueSvgLoader = [
      //   {
      //     loader: 'vue-svg-loader',
      //     options: {
      //       svgo: false
      //     }
      //   }
      // ]
      const imageMinPlugin = new ImageminPlugin({
        pngquant: {
          quality: '5-30',
          speed: 7,
          strip: true
        },
        jpegtran: {
          progressive: true

        },
        gifsicle: {
          interlaced: true
        },
        plugins: [
          // imageminMozjpeg({
          //   quality: 70,
          //   // arithmetic: true,
          //   progressive: true
          // })

        ]
      })
      if (!ctx.isDev) config.plugins.push(imageMinPlugin)

      config.module.rules.forEach(rule => {
        if (rule.test.toString() === ORIGINAL_TEST) {
          rule.test = /\.(png|jpe?g|gif|webp)$/i
          rule.use = [
            {
              loader: 'url-loader',
              options: {
                limit: 1000,
                name: ctx.isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]'
              }
            }
          ]
        }
      })
      //  Create the custom SVG rule
      // const svgRule = {
      //   test: /\.svg$/,
      //   oneOf: [
      //     {
      //       resourceQuery: /inline/,
      //       use: vueSvgLoader
      //     },
      //     {
      //       resourceQuery: /data/,
      //       loader: 'url-loader'
      //     },
      //     {
      //       resourceQuery: /raw/,
      //       loader: 'raw-loader'
      //     },
      //     {
      //       loader: 'file-loader' // By default, always use file-loader
      //     }
      //   ]
      // }

      // config.module.rules.push(svgRule) // Actually add the rule
    }
  },
  server: {
    port: 10000, // default: 3000 
    host: 'localhost', // default: localhost
  },
  serverMiddleware: [
    // API middleware
    '~/api/index.js'
  ],
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue'),
        props: true
      })
    },
  }
}
