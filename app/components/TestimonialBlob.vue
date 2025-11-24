<script setup>
import IconFluentCommentQuote20Regular from "~icons/fluent/comment-quote-20-regular";
</script>

<template>
  <NuxtLink
    :to="link"
    target="_blank"
    external
    class="group relative grid w-full cursor-pointer grid-cols-1 rounded shadow-2xl sm:max-w-lg sm:grid-cols-3 lg:max-w-4xl"
    :style="`transform: translateX(${randomX}px) rotate(${randomRotate}deg)`"
  >
    <div
      class="absolute inset-0 z-0 transform-gpu rounded-xl bg-gradient-to-r from-red-400 to-red-800 opacity-0 blur-xl transition-opacity duration-300 ease-in-out group-hover:opacity-30"
    ></div>

    <NuxtImg
      :src="`cms-files/${testData?.screenshot}`"
      @click="clickedQcard($event, index)"
      class="relative h-full w-full rounded-l object-cover hover:brightness-120"
      sizes="520px sm:300px md:450px"
      densities="x1"
      format="webp"
    />

    <div
      class="relative col-span-2 h-full w-full rounded-r bg-neutral-500/65 p-6 pb-12 backdrop-blur-xs md:p-8"
    >
      <p v-if="message" class="mt-4 md:mt-0">
        {{ message }}
      </p>

      <p class="mt-8">{{ att }}</p>
      <p class="italic">{{ client }}</p>

      <NuxtImg
        :src="`cms-files/${logo}`"
        class="relative mt-8 h-14 max-h-14 min-h-14 max-w-40 object-contain lg:absolute lg:right-6 lg:bottom-6 lg:mt-0"
        sizes="250px"
        densities="x1"
        format="webp"
      ></NuxtImg>
    </div>

    <IconFluentCommentQuote20Regular
      class="absolute -top-10 -left-10 h-20 max-h-20 min-h-20 w-20 max-w-20 min-w-20 text-white"
    ></IconFluentCommentQuote20Regular>
  </NuxtLink>

  <QcardLightbox
    v-if="showQcardLightbox"
    :lightboxUrl="lightboxUrl"
    @close="showQcardLightbox = false"
  ></QcardLightbox>
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
      type: String,
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
      showQcardLightbox: false,
      lightboxUrl: 0,
      testData: {
        screenshot:
          "r1i8hIRqeEjbqJzAizgw10IKQ8gtbPP2_7e58cd021fda1a357c97e940720d7ba388bd66c7448382edd308cc545c254afe.jpg",
        qCardLink: "https://qcard.adinq.se/?i=1742905382",
      },
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

    clickedQcard(event, index) {
      const link = this.testData?.qCardLink;

      if (link) {
        this.lightboxUrl = link;
        this.showQcardLightbox = true;
      }
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
