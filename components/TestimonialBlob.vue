<template>
  <NuxtLink
    :to="link"
    target="_blank"
    external
    class="group relative w-full cursor-pointer rounded shadow-2xl sm:max-w-lg lg:max-w-4xl"
    :style="`transform: translateX(${randomX}px) rotate(${randomRotate}deg)`"
  >
    <div
      class="absolute inset-0 z-0 transform-gpu rounded-xl bg-gradient-to-r from-yellow-500 to-blue-500 opacity-0 blur-xl transition-opacity duration-300 ease-in-out group-hover:opacity-25"
    ></div>

    <div
      class="relative h-full w-full rounded bg-neutral-500/65 p-6 pb-12 backdrop-blur-xs md:p-8"
    >
      <p v-if="message" class="mt-4 md:mt-0">
        {{ message }}
      </p>

      <p class="mt-8">{{ att }}</p>
      <p class="italic">{{ client }}</p>

      <NuxtImg
        :src="logo.url"
        class="relative mt-8 h-14 max-h-14 min-h-14 max-w-40 object-contain lg:absolute lg:right-6 lg:bottom-6 lg:mt-0"
      ></NuxtImg>
    </div>

    <Icon
      name="fluent:comment-quote-20-regular"
      class="absolute -top-10 -left-10 h-20 max-h-20 min-h-20 w-20 max-w-20 min-w-20"
      style="color: #ffffff"
    ></Icon>
  </NuxtLink>
</template>

<script>
import { getBreakpointMixin } from "../mixins/getBreakpoint.js";

export default {
  name: "TestimonialBlob",

  mixins: [getBreakpointMixin],

  props: {
    message: {
      type: String,
      required: false,
    },
    logo: {
      type: Object,
      required: false,
    },
    att: {
      type: String,
      required: false,
    },
    client: {
      type: String,
      required: false,
    },
    link: {
      type: String,
      required: false,
      default: "",
    },
  },

  data() {
    return {
      randomX: 0,
      randomRotate: 0,
    };
  },

  mounted() {
    this.randomX = this.getRandomX();
    this.randomRotate = this.getRandomRotate();
  },

  methods: {
    getRandomX() {
      const baseRange = this.breakpoints.lg ? 100 : 10;
      const baseOffset = this.breakpoints.lg ? 50 : 5;

      return (Math.random() * baseRange - baseOffset).toFixed(1);
    },

    getRandomRotate() {
      const baseRange = this.breakpoints.lg ? 6 : 3;
      const baseOffset = this.breakpoints.lg ? 3 : 1.5;

      return (Math.random() * baseRange - baseOffset).toFixed(1);
    },
  },

  watch: {
    "breakpoints.lg"() {
      this.randomX = this.getRandomX();
      this.randomRotate = this.getRandomRotate();
    },
  },
};
</script>
