import colors from 'vuetify/es5/util/colors'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // buildDir: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-builddir
  // 기본값은  .nuxt 디렉토리입니다
  // buildDir: 'nuxt-dist',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - j3-frontend',
    title: 'j3-frontend',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
    ],
    link: [{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/auth',
    'nuxt-vuex-localstorage',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // 배포모드에서 사용'
    baseURL: 'http://localhost:20000',
  },

  // Proxy module configuration: https://github.com/nuxt-community/proxy-module#readme
  proxy: {
    '/api': {
      target: 'http://localhost:20000', //  개발 시 프록시 지정
      logLevel: 'debug',
    },
  },

  auth: {
    redirect: {
      login: '/auth/login',
    },

    strategies: {
      local: {
        // auth 관련 api 관리
        endpoints: {
          // data { email, role, token } 이므로 토큰의 경로는 data.token
          login: { url: '/api/accounts/login', method: 'post', propertyName: 'token' },
          user: false,
          // user: { url: '/api/accounts/my', method: 'get' },
          logout: false,
        },
        tokenRequired: true,
        tokenType: 'Bearer',
      },
      // user: {
      //   property: false,
      //   authFetch: true,
      // }
    },
    cookie:{
      prefix: 'AUTHENTIFICATION',
    },
    watchLoggedIn: true,
    resetOnError: true,
    plugins: ['~/plugins/auth.js'],
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  //
  router: {
    middleware: ['auth', 'redirection'],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      'nuxt-vuex-localstorage'
    ],
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        });
      }
    }
  },
}
