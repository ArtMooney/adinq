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
          "@apply mx-auto w-full max-w-screen-2xl bg-white font-body font-normal text-black":
            {},
        },
        "h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6": {
          "@apply mb-4 mt-0 font-body font-heading leading-none": {},
        },

        "h1, .h1": {
          "@apply text-4xl md:text-5xl leading-10": {},
        },

        "h2, .h2": {
          "@apply text-3xl md:text-4xl leading-9": {},
        },

        "h3, .h3": {
          "@apply text-2xl md:text-3xl leading-8": {},
        },

        "h4, .h4": {
          "@apply text-xl md:text-2xl leading-7": {},
        },

        "h5, .h5": {
          "@apply text-lg md:text-xl leading-6": {},
        },

        "h6, .h6": {
          "@apply text-base md:text-lg leading-5": {},
        },
      });
    }),
  ],
  corePlugins: {
    preflight: true,
  },
};
