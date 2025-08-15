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

        "button, .button": {
          "@apply rounded px-8 py-3 text-center text-sm no-underline cursor-pointer transition-colors duration-300 ease-in-out":
            {},
          "&:disabled, &.disabled": {
            "@apply !cursor-not-allowed !pointer-events-none": {},
          },
        },

        "button.primary, .button.primary": {
          "@apply bg-neutral-800 text-white": {},
          "&:hover": {
            "@apply bg-neutral-800/80": {},
          },
          "&:focus, &.selected, &:active": {
            "@apply bg-neutral-800 outline-4 -outline-offset-4": {},
          },
          "&:disabled, &.disabled": {
            "@apply bg-neutral-700 text-neutral-500 ": {},
          },
        },

        "button.secondary, .button.secondary": {
          "@apply bg-transparent text-white outline-white outline-2 -outline-offset-2":
            {},
          "&:hover, &:focus, &.selected, &:active": {
            "@apply outline-white/80": {},
          },
          "&:disabled, &.disabled": {
            "@apply bg-neutral-800 text-neutral-600 outline-neutral-600": {},
          },
        },

        "button.white, .button.white": {
          "@apply bg-white/95 text-black outline-black": {},
          "&:hover, &:focus, &.selected, &:active": {
            "@apply bg-white/80": {},
          },
          "&:disabled, &.disabled": {
            "@apply bg-neutral-300 text-neutral-400": {},
          },
        },

        "button.transparent, .button.transparent": {
          "@apply bg-transparent text-white": {},
          "&:hover, &:focus, &.selected, &:active": {
            "@apply bg-white/10": {},
          },
          "&:disabled, &.disabled": {
            "@apply bg-neutral-800 text-neutral-600": {},
          },
        },

        "label, .label": {
          "@apply block text-white mb-2": {},
        },

        "input, .input": {
          "@apply rounded border border-white/25 px-4 py-3 placeholder:text-neutral-600 focus:border-white/50 focus:outline-none":
            {},
          "&.error, &:user-invalid": {
            "@apply !bg-rose-100 outline-rose-700 text-rose-700": {},
          },
        },

        "input[type='checkbox'], .checkbox": {
          "@apply w-5 h-5 max-w-5 max-h-5 outline-1 outline-black bg-white rounded cursor-pointer appearance-none box-border p-0 m-0":
            {},
          "&:focus": {
            "@apply outline-1": {},
          },
          "&:checked": {
            "background-image":
              "url(\"data:image/svg+xml,%3csvg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M18.2222 6L20 7.71429L10.2222 18L4 12L5.77778 10.2857L10.2222 13.7143L18.2222 6Z' fill='black'/%3e%3c/svg%3e\")",
            "background-size": "100% 100%",
            "background-position": "center",
            "background-repeat": "no-repeat",
          },
        },

        "input[type='radio'], .radio": {
          "@apply w-5 h-5 max-w-5 max-h-5 outline-1 outline-black bg-white rounded-full cursor-pointer appearance-none box-border p-0 m-0":
            {},
          "&:focus": {
            "@apply outline-1": {},
          },
          "&:checked": {
            "@apply bg-black": {},
            "box-shadow": "inset 0 0 0 3px white",
          },
        },

        "textarea, .textarea": {
          "@apply min-h-28 rounded border border-white/25 px-4 py-3 placeholder:text-neutral-600 focus:border-white/50 focus:outline-none":
            {},
        },
      });
    }),
  ],
  safelist: ["border-l", "border-white", "pl-3"],
  corePlugins: {
    preflight: true,
  },
};
