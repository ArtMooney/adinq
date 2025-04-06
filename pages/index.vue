<script setup>
import { TvIcon } from "@heroicons/vue/24/outline";

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
  <div class="flex flex-col">
    <div class="relative mx-[calc(-50vw+50%)] w-screen">
      <ClientOnly>
        <video
          autoplay
          loop
          muted
          disablepictureinpicture
          playsinline
          preload="auto"
          class="h-auto w-full object-cover"
        >
          <source src="../assets/videos/folkmassa.mp4" type="video/mp4" />
        </video>
      </ClientOnly>

      <div class="absolute inset-0 bg-black/40"></div>

      <div
        class="absolute inset-0 flex flex-col items-center justify-center bg-amber-700/15"
      >
        <h1 class="mb-8 text-7xl">Vi hjälper er att nå ut digitalt!</h1>
        <div class="text-2xl">
          Lokalt, regionalt eller rikstäckande - just DOOH* it!
        </div>
      </div>
    </div>

    <div class="mt-12 mb-20 grid grid-cols-2 gap-4">
      <div
        v-for="i in 4"
        :key="i"
        class="min-h-64 rounded border border-white/25 bg-neutral-900 p-4"
      >
        <TvIcon class="h-10 w-10" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
};
</script>
