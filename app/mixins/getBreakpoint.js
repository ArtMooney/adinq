export const getBreakpointMixin = {
  data() {
    return {
      breakpoints: {
        sm: false,
        md: false,
        lg: false,
        xl: false,
        "2xl": false,
      },
    };
  },

  methods: {
    updateBreakpoints() {
      const width = window.innerWidth;
      this.breakpoints.sm = width >= 640;
      this.breakpoints.md = width >= 768;
      this.breakpoints.lg = width >= 1024;
      this.breakpoints.xl = width >= 1280;
      this.breakpoints["2xl"] = width >= 1536;
    },
  },

  mounted() {
    this.updateBreakpoints();
    window.addEventListener("resize", this.updateBreakpoints);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.updateBreakpoints);
  },
};
