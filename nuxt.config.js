export default {
  //// For Server Side rendaring(SSR) (Node.js Server Required)
  // target: "server",

  ////For Static Site Generation(SSG)
  // target: "static",
  // generate: {
  //   interval: 2400
  // },

  //For Single Page Application(SPA)
  ssr: process.env.MODE === "spa" ? false : true,


  head: {
    title: "-",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Traveler Tourism Site" },
      { hid: "keywords", name: "keywords", content: "Tour, Travel, Trip, tourism, journey" },
      { hid: "author", name: "author", content: "AmiAnik" },
    ],

    link: [
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

  css: [],

  pageTransition: {
    name: "fade",
    mode: "out-in"
  },

  plugins: [
    "./plugins/mixin/global-access.js",
    "./plugins/pagination.js",
    "./plugins/filter.js",
    "./plugins/tooltip.js",
    { src: "./plugins/toaster.js", ssr: false },
    { src: "./plugins/owl.js", ssr: false },
    { src: "./plugins/chart.js", ssr: false },
  ],

  components: true,

  buildModules: [
    "@nuxtjs/fontawesome",
    "@nuxtjs/dotenv",
  ],

  fontawesome: {
    component: "icon",
    icons: {
      solid: true,
      regular: true,
      brands: true,
    }
  },

  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    "vue-sweetalert2/nuxt",
    "vue2-editor/nuxt",
    'nuxt-client-init-module',
    ["nuxt-lazy-load", {
      defaultImage: process.env.assetURL + "images/preloader.svg",
      loadingClass: "isLoading",
      loadedClass: "isLoaded",
    }]
  ],

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

  build: {}
}
