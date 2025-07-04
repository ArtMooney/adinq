import plugin from "tailwindcss/plugin";

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Hanuman", "sans-serif"],
        body: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        body: {
          "@apply mx-auto w-full max-w-screen-2xl bg-neutral-900 font-body font-normal text-white overflow-x-hidden":
            {},
        },
        "h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6": {
          "@apply mb-4 mt-0 font-body font-heading leading-none": {},
        },

        "h1, .h1": {
          "@apply text-4xl md:text-5xl lg:text-6xl leading-10 md:leading-14 lg:leading-16":
            {},
        },

        "h2, .h2": {
          "@apply text-3xl md:text-4xl lg:text-5xl leading-9 md:leading-13 lg:leading-15":
            {},
        },

        "h3, .h3": {
          "@apply text-2xl md:text-3xl lg:text-4xl leading-8 md:leading-12 lg:leading-14":
            {},
        },

        "h4, .h4": {
          "@apply text-xl md:text-2xl lg:text-3xl leading-7 md:leading-11 lg:leading-13":
            {},
        },

        "h5, .h5": {
          "@apply text-lg md:text-xl lg:text-2xl leading-6 md:leading-10 lg:leading-12":
            {},
        },

        "h6, .h6": {
          "@apply text-base md:text-lg lg:text-xl leading-5 md:leading-9 lg:leading-11":
            {},
        },
      });
    }),
  ],
  corePlugins: {
    preflight: true,
  },
};
