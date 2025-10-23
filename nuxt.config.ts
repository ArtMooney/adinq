import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-09-04",

  devtools: { enabled: true },

  css: ["/assets/css/main.css", "leaflet/dist/leaflet.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  nitro: {
    preset: "cloudflare-pages",
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
    baserowToken: process.env.NUXT_BASEROW_TOKEN,
    baserowUsername: process.env.NUXT_BASEROW_USERNAME,
    baserowPassword: process.env.NUXT_BASEROW_PASSWORD,
    baserowDbId: process.env.NUXT_BASEROW_DB_ID,
    baserowCmsUsersId: process.env.NUXT_BASEROW_CMS_USERS_ID,

    public: {
      userName: process.env.NUXT_PUBLIC_USERNAME,
      userPass: process.env.NUXT_PUBLIC_USERPASS,
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
    dir: "assets/images",
    quality: 80,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      "2xl": 1536,
    },
    densities: [1, 2],
    staticFilename: "[name]-[width]-[height]-[format].[ext]",
    provider: "ipxStatic",
  },

  robots: {
    rules: () => {
      if (
        process.env.NUXT_PUBLIC_SITE_URL?.includes("pages.dev") ||
        process.env.CF_PAGES_URL?.includes("pages.dev")
      ) {
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
    url: process.env.CF_PAGES_URL || "https://adinq.se",
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
    },
  },
});
