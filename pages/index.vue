<script setup>
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
    class="relative mx-[calc(-50vw+50%)] min-h-80 w-screen"
    :style="{
      height: `${windowHeight - navHeight}px`,
    }"
  >
    <LoadingSpinner
      v-if="!videoLoaded"
      class="absolute top-2/5 left-1/2 -translate-x-1/2 transform"
    ></LoadingSpinner>

    <ClientOnly>
      <video
        ref="titleVideo"
        v-show="videoLoaded"
        @canplay="videoLoaded = true"
        autoplay
        loop
        muted
        disablepictureinpicture
        playsinline
        preload="auto"
        class="h-full w-full object-cover"
      >
        <source src="../public/videos/slow-motion-crowd.mp4" />
      </video>
    </ClientOnly>

    <div v-show="videoLoaded" class="absolute inset-0 bg-red-950/40"></div>

    <!--    2c4459, 59312c, 59452c, amber-700/15-->
    <div
      v-show="videoLoaded"
      class="absolute inset-0 flex flex-col items-center justify-center bg-amber-700/15 px-4 text-center"
    >
      <h1 class="mx-10 mb-8 md:mx-30">Vi hjälper er att nå ut digitalt!</h1>

      <div class="px-8 text-lg lg:text-2xl">
        Lokalt, regionalt eller rikstäckande - just DOOH* it!
      </div>

      <div class="text-l absolute right-3 bottom-2 italic opacity-30">
        *DOOH - Digital out of Home Media
      </div>

      <NuxtLink
        :to="{ path: '/', hash: '#services' }"
        class="absolute bottom-8 flex w-full items-center justify-center"
      >
        <Icon
          name="qlementine-icons:chevron-double-down-16"
          class="h-12 min-h-12 w-12 min-w-12 cursor-pointer opacity-70 hover:opacity-100"
        ></Icon>
      </NuxtLink>
    </div>
  </div>

  <div class="mx-4 my-20 flex flex-col gap-8 sm:mx-8">
    <h3 id="services" class="mt-32 text-center">Se vår informationsvideo</h3>
    <div class="flex justify-center gap-4 underline">
      <div
        @click="sweVersion = true"
        class="cursor-pointer"
        :class="[!sweVersion && 'opacity-25']"
      >
        Svensk version
      </div>
      <div class="opacity-50">|</div>
      <div
        @click="sweVersion = false"
        class="cursor-pointer"
        :class="[sweVersion && 'opacity-25']"
      >
        English version
      </div>
    </div>

    <VideoBlob
      v-if="sweVersion"
      video-Link="https://qcard.adinq.se/?i=1747390713"
    ></VideoBlob>
    <VideoBlob
      v-if="!sweVersion"
      video-Link="https://qcard.adinq.se/?i=1747391059"
    ></VideoBlob>

    <h3 class="mt-32 text-center">
      Mer information om våra marknadsföringskanaler
    </h3>

    <div class="mt-4 grid gap-8 md:grid-cols-2">
      <IconBlob
        icon="la:store"
        icon-color="#6293a5"
        message="Butiks-TV är ett effektivt marknadsföringsverktyg som visar reklam och information direkt i butiksmiljön. Skärmarna placeras strategiskt för att nå kunder när de handlar."
        link="/butiks-tv"
      ></IconBlob>

      <IconBlob
        icon="fluent:projection-screen-20-regular"
        icon-color="#b9a966"
        message="Digitala utomhusskärmar eller LED-skyltar visar rörlig reklam som effektivt fångar förbipasserande trafikanters uppmärksamhet. Med sina starka färger och dynamiska innehåll skapar de minnesvärda intryck även vid hög hastighet."
        link="/storbildsskarmar"
      ></IconBlob>

      <IconBlob
        icon="solar:diagram-up-bold"
        icon-color="#a55c7c"
        message="Med specialistkompetens kring olika kanaler maximeras avkastningen på kundens marknadsföringsinvesteringar genom datadrivna beslut och förhandlingskraft gentemot medieleverantörer."
        link="/mediabyraer"
      ></IconBlob>

      <IconBlob
        icon="cil:building"
        icon-color="#5b9652"
        message="Strategiska samarbeten med fastighetsägare ger annonsörer tillgång till exponeringsytor där människor bor, arbetar och konsumerar."
        link="/kommersialisera"
      ></IconBlob>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",

  inject: ["navbarHeight"],

  data() {
    return {
      videoLoaded: false,
      sweVersion: true,
      windowHeight: 0,
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
    this.windowHeight = window.innerHeight;
    window.addEventListener("resize", this.handleResize);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    handleResize() {
      this.windowHeight = window.innerHeight;
    },
  },
};
</script>
