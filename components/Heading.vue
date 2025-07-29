<template>
  <div
    class="relative mx-[calc(-50vw+50%)] w-screen"
    :style="{
      height: `${windowHeight - navHeight}px`,
    }"
  >
    <slot name="heading-content"></slot>
  </div>
</template>

<script>
export default {
  name: "Heading",

  inject: ["navbarHeight"],

  data() {
    return {
      windowWidth: 0,
      windowHeight: 0,
    };
  },

  computed: {
    navHeight() {
      return this.navbarHeight();
    },
  },

  mounted() {
    this.windowHeight = window.innerHeight;
    window.addEventListener("resize", this.handleResize);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    handleResize() {
      if (this.windowWidth === window.innerWidth) {
        return;
      }
      
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
    },
  },
};
</script>
