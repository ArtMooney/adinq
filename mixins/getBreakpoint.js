export const getBreakpointMixin = {
    data() {
        return {
            breakpoints: {
                xs: true,
                phone: false,
                sm: false,
                md: false,
                laptop: false,
                lg: false,
                xlarge: false,
                xl: false,
                xxlarge: false,
                desktop: false,
                "2xl": false,
                wide: false,
            },
        };
    },

    methods: {
        updateBreakpoints() {
            const width = window.innerWidth;
            this.breakpoints.phone = width >= 576;
            this.breakpoints.sm = width >= 640;
            this.breakpoints.md = width >= 768;
            this.breakpoints.laptop = width >= 992;
            this.breakpoints.lg = width >= 1024;
            this.breakpoints.xlarge = width >= 1200;
            this.breakpoints.xl = width >= 1280;
            this.breakpoints.xxlarge = width >= 1440;
            this.breakpoints.desktop = width >= 1500;
            this.breakpoints["2xl"] = width >= 1536;
            this.breakpoints.wide = width >= 2048;
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
