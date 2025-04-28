<script setup>
import { ChevronDoubleDownIcon } from "@heroicons/vue/24/solid";

useSeoMeta({
  title: "",
  description: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  twitterCard: "",
  twitterTitle: "",
  twitterDescription: "",
  twitterImage: "",
});

definePageMeta({
  ssr: true,
});
</script>

<template>
  <!--  <img src="test.jpg" />-->
  <!--  <img src="../assets/images/test.jpg" />-->
  <!--  <NuxtImg src="test.jpg" />-->
  <NuxtImg src="test.jpg" sizes="sm:100vw md:50vw lg:400px" />

  <div
    class="relative mx-[calc(-50vw+50%)] w-screen"
    :style="{
      height: `calc(100${supportsDvh ? 'dvh' : 'vh'} - ${navHeight}px)`,
    }"
  >
    <!--    <NuxtImg-->
    <!--      src="andrey-novik-5DDDzKMK0s8-unsplash.jpg"-->
    <!--      alt=""-->
    <!--      class="h-full w-full object-cover"-->
    <!--      sizes="1000px md:2000px"-->
    <!--      width="4600"-->
    <!--      height="3500"-->
    <!--      densities="x1"-->
    <!--    />-->

    <div class="absolute inset-0 bg-black/40"></div>

    <div
      class="absolute inset-0 flex flex-col items-center justify-center bg-amber-700/15 text-center"
    >
      <h1
        class="mb-8 text-3xl sm:text-4xl md:text-5xl md:leading-12 lg:text-6xl lg:leading-16"
      >
        Vi producerar er reklamfilm eller slide för storbildsskärmar!
      </h1>
      <div class="px-8 text-lg lg:text-2xl">
        - Vi kan hjälpa er med allt under samma tak!
      </div>

      <NuxtLink
        :to="{ path: '/', hash: '#services' }"
        class="absolute bottom-24 flex w-full items-center justify-center sm:bottom-16"
      >
        <ChevronDoubleDownIcon
          class="h-12 min-h-12 w-12 min-w-12 cursor-pointer opacity-70 hover:opacity-100"
        ></ChevronDoubleDownIcon>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: "MediaProduktion",

  inject: ["navbarHeight"],

  data() {
    return {
      sweVersion: true,
      supportsDvh: null,
    };
  },

  activated() {
    if (this.$refs.titleVideo) {
      this.$refs.titleVideo.play();
    }
  },

  computed: {
    navHeight() {
      return this.navbarHeight();
    },
  },

  mounted() {
    this.supportsDvh = CSS.supports("height", "100dvh");
  },
};
</script>
