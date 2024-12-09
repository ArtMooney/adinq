/** @type {import("tailwindcss").Config} */
export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        noto: ["Notosansdisplay", "sans-serif"],
        exo: ["Exo", "sans-serif"],
      },
      gridTemplateColumns: {
        thin: "3rem 1fr 3rem",
        slim: "0.25fr 1fr 0.25fr",
      },
      backgroundImage: {
        "footer-gradient":
          "linear-gradient(to bottom, hsla(19.999999999999975, 4.76%, 24.71%, 0.93), hsla(19.999999999999975, 4.76%, 24.71%, 0.93)), url('../assets/pexels-iva-mu.jpg')",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
};
