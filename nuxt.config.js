export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  generate: {
    interval: 2400
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "-",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],

    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "stylesheet", href: process.env.assetURL + "assets/css/bootstrap.min.css", },
      { rel: "stylesheet", href: process.env.assetURL + "assets/css/style.css" },
      { rel: "stylesheet", href: process.env.assetURL + "assets/css/responsive.css" },
    ],

    script: [
      { type: "text/javascript", src: process.env.assetURL + "assets/js/jquery-3.3.1.slim.min.js" },
      { type: "text/javascript", src: process.env.assetURL + "assets/js/popper.min.js" },
      { type: "text/javascript", src: process.env.assetURL + "assets/js/bootstrap.min.js" },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  pageTransition: {
    name: "fade",
    mode: "out-in"
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "./plugins/mixin/global-access.js",
    "./plugins/pagination.js",
    "./plugins/filter.js",
    "./plugins/tooltip.js",
    {src: "./plugins/toaster.js", ssr: false},
    {src: "./plugins/owl.js", ssr: false},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    "@nuxtjs/fontawesome",
    "@nuxtjs/dotenv"
  ],

  fontawesome: {
    component: "icon",
    icons: {
      solid: true,
      regular: true,
      brands: true,
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    "vue-sweetalert2/nuxt",
    "vue2-editor/nuxt",
    "nuxt-lazy-load",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.baseURL
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.baseURL
    }
  },

  proxy: {
    "/laravel": {
      target: "/",
      pathRewrite: { "^/laravel": "/" }
    }
  },

  auth: {
    strategies: {
      "laravelJWT": {
        provider: "laravel/jwt",
        url: "/",
        endpoints: {
          login: { url: "/login", method: "post" },
          logout: { url: "/logout", method: "post" },
          user: { url: "/user", method: "post" }
        },
        token: {
          property: "access_token",
          maxAge: 60 * 12
        },
        refreshToken: {
          maxAge: 20160 * 60
        },
      },
    },
    redirect: {
      home: "/dashboard",
      logout: "/",
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
