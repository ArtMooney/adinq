import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-04-28",
  devtools: { enabled: true },
  css: ["/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  nitro: {
    preset: "cloudflare-pages",
    prerender: {
      crawlLinks: true,
      ignore: [],
    },
  },
  runtimeConfig: {
    mailgunApiKey: process.env.NUXT_MAILGUN_API_KEY,
    baserowToken: process.env.NUXT_BASEROW_TOKEN,
    emailFrom: process.env.NUXT_EMAIL_FROM,
    emailTo: process.env.NUXT_EMAIL_TO,
    userName: process.env.NUXT_USERNAME,
    userPass: process.env.NUXT_USERPASS,

    public: {
      userName: process.env.NUXT_PUBLIC_USERNAME,
      userPass: process.env.NUXT_PUBLIC_USERPASS,
    },
  },
  modules: ["@nuxtjs/robots", "@nuxtjs/sitemap", "@nuxt/image", "@nuxt/icon"],
  image: {
    dir: "assets/images",
    format: ["webp", "jpg", "png"],
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
    modifiers: {
      format: "webp",
      quality: 80,
      animated: false,
    },
    staticFilename: "[name]-[width]-[height]-[format].[ext]",
    provider: "ipxStatic",
  },
  robots: {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        sitemap: "https://adinq.se/sitemap.xml",
      },
      {
        userAgent: "*",
        disallow: "/",
        comment: "Disallow all robots on adinq.pages.dev and its subdomains",
      },
    ],
    disallowNonStandardSchemes: true,
    sitemap: "https://adinq.se/sitemap.xml",
  },
  sitemap: {
    hostname: "https://adinq.se",
    gzip: true,
  },
  app: {
    keepalive: true,
    head: {
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
        { rel: "canonical", href: "https://adinq.se/" },
      ],
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "",
      meta: [
        {
          name: "description",
          content: "",
        },
        {
          name: "keywords",
          content: "",
        },

        // Open Graph / Facebook
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://adinq.se/" },
        {
          property: "og:title",
          content: "",
        },
        {
          property: "og:description",
          content: "",
        },
        {
          property: "og:image",
          content: "https://adinq.se/og-image.jpg",
        },

        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:url", content: "https://adinq.se/" },
        {
          name: "twitter:title",
          content: "",
        },
        {
          name: "twitter:description",
          content: "",
        },
        {
          name: "twitter:image",
          content: "https://adinq.se/twitter-image.jpg",
        },
      ],
    },
  },
});
