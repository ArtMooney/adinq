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
  <div
    ref="videoTitle"
    class="relative mx-[calc(-50vw+50%)] w-screen"
    :style="{ height: `calc(100vh - ${videoTitleTop}px)` }"
  >
    <LoadingSpinner
      v-if="!videoLoaded"
      class="absolute top-2/5 left-1/2"
    ></LoadingSpinner>

    <ClientOnly>
      <video
        v-show="videoLoaded"
        @canplaythrough="videoLoaded = true"
        autoplay
        loop
        muted
        disablepictureinpicture
        playsinline
        preload="auto"
        class="h-full w-full object-cover"
      >
        <source src="../assets/videos/folkmassa.mp4" type="video/mp4" />
      </video>
    </ClientOnly>

    <div v-show="videoLoaded" class="absolute inset-0 bg-black/40"></div>

    <div
      v-show="videoLoaded"
      class="absolute inset-0 flex flex-col items-center justify-center bg-amber-700/15"
    >
      <h1 class="mb-8 text-7xl">Vi hjälper er att nå ut digitalt!</h1>
      <div class="text-2xl">
        Lokalt, regionalt eller rikstäckande - just DOOH* it!
      </div>

      <div class="text-l absolute right-3 bottom-2 italic opacity-30">
        *DOOH - Digital out of Home Media
      </div>

      <NuxtLink :to="{ path: '/', hash: '#services' }">
        <ChevronDoubleDownIcon
          class="absolute bottom-4 h-12 min-h-12 w-12 min-w-12 cursor-pointer opacity-70 hover:opacity-100"
        ></ChevronDoubleDownIcon>
      </NuxtLink>
    </div>
  </div>

  <div id="services" class="mx-8 flex flex-col">
    <div class="my-32 grid grid-cols-2 gap-8">
      <IconBlob
        icon="tv"
        message="Butiks-TV är ett effektivt marknadsföringsverktyg som visar reklam och information direkt i butiksmiljön. Skärmarna placeras strategiskt för att nå kunder när de handlar."
      ></IconBlob>

      <IconBlob
        icon="computer"
        message="Digitala utomhusskärmar eller LED-skyltar visar rörlig reklam som effektivt fångar förbipasserande trafikanters uppmärksamhet. Med sina starka färger och dynamiska innehåll skapar de minnesvärda intryck även vid hög hastighet."
      ></IconBlob>

      <IconBlob
        icon="video"
        message="Med specialistkompetens kring olika kanaler maximeras avkastningen på kundens marknadsföringsinvesteringar genom datadrivna beslut och förhandlingskraft gentemot medieleverantörer."
      ></IconBlob>

      <IconBlob
        icon="building"
        message="Strategiska samarbeten med fastighetsägare ger annonsörer tillgång till exponeringsytor där människor bor, arbetar och konsumerar."
      ></IconBlob>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",

  data() {
    return {
      videoLoaded: false,
      videoTitleTop: 0,
    };
  },

  mounted() {
    this.videoTitleTop = this.$refs.videoTitle.getBoundingClientRect().top;
  },
};
</script>
