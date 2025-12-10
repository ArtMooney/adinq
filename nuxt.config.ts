import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-11-24",

  devtools: { enabled: true },

  css: ["/assets/css/main.css", "leaflet/dist/leaflet.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  nitro: {
    preset: "cloudflare_pages",
    prerender: {
      crawlLinks: false,
      ignore: [],
    },
  },

  runtimeConfig: {
    mailgunApiKey: process.env.NUXT_MAILGUN_API_KEY,
    emailFrom: process.env.NUXT_EMAIL_FROM,
    emailTo: process.env.NUXT_EMAIL_TO,
    unsubscribeTo: process.env.NUXT_UNSUBSCRIBE_TO,
    userName: process.env.NUXT_USERNAME,
    userPass: process.env.NUXT_USERPASS,

    public: {
      userName: process.env.NUXT_PUBLIC_USERNAME,
      userPass: process.env.NUXT_PUBLIC_USERPASS,
      imageBaseUrl: process.env.NUXT_PUBLIC_IMAGE_BASE_URL,
      publicSiteUrl: process.env.NUXT_PUBLIC_SITE_URL,
    },
  },

  modules: [
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
    "@nuxt/image",
    "@nuxtjs/leaflet",
    "unplugin-icons/nuxt",
  ],

  image: {
    provider: "weserv",

    weserv: {
      baseURL: process.env.NUXT_PUBLIC_IMAGE_BASE_URL,
      modifiers: {
        format: "webp",
        quality: 65,
      },
    },

    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      "2xl": 1536,
    },
  },

  robots: {
    rules: () => {
      if (process.env.CF_PAGES_BRANCH !== "main") {
        return [
          {
            userAgent: "*",
            disallow: "/",
          },
        ];
      }

      return [
        {
          userAgent: "*",
          allow: "/",
        },
      ];
    },
  },

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || process.env.CF_PAGES_URL,
  },

  sitemap: {
    gzip: true,
  },

  app: {
    keepalive: true,
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
      // meta: [
      //   {
      //     name: "google-site-verification",
      //     content: "",
      //   },
      // ],
    },
  },
});
