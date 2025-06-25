<template>
  <NuxtLink
    :to="link"
    target="_blank"
    external
    class="group relative w-full cursor-pointer rounded border-2 border-white/25 shadow-2xl sm:max-w-lg lg:max-w-4xl"
    :style="`transform: translateX(${randomX}) rotate(${randomRotate})`"
  >
    <div
      class="absolute inset-0 z-0 transform-gpu rounded-xl bg-gradient-to-r from-yellow-500 to-blue-500 opacity-0 blur-xl transition-opacity duration-300 ease-in-out group-hover:opacity-25"
    ></div>

    <div
      class="relative h-full w-full rounded bg-neutral-500/65 p-6 pb-12 backdrop-blur-xs md:p-8"
    >
      <Icon
        name="fluent:comment-quote-20-regular"
        class="absolute -top-10 -left-6 h-20 max-h-20 min-h-20 w-20 max-w-20 min-w-20"
        style="color: #ffffff"
      ></Icon>

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

  computed: {
    randomX() {
      const baseRange = this.breakpoints.lg ? 100 : 20;
      const baseOffset = this.breakpoints.lg ? 50 : 10;
      const value = Math.random() * baseRange - baseOffset;
      return `${value.toFixed(1)}px`;
    },

    randomRotate() {
      const baseRange = this.breakpoints.lg ? 6 : 3;
      const baseOffset = this.breakpoints.lg ? 3 : 1.5;
      const value = Math.random() * baseRange - baseOffset;
      return `${value.toFixed(1)}deg`;
    },
  },
};
</script>
