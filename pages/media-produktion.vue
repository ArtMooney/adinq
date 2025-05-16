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
    class="relative mx-[calc(-50vw+50%)] w-screen"
    :style="{
      height: `calc(100${supportsDvh ? 'dvh' : 'vh'} - ${navHeight}px)`,
    }"
  >
    <NuxtImg
      src="pexels-rpnickson-7238759.jpg"
      alt=""
      class="h-full w-full object-cover"
      sizes="1000px md:2000px"
      width="6720"
      height="4480"
      densities="x1"
    />

    <div class="absolute inset-0 bg-black/40"></div>

    <div
      class="absolute inset-0 flex flex-col items-center justify-center bg-amber-700/15 text-center"
    >
      <h1
        class="mx-10 mb-8 text-3xl sm:text-4xl md:mx-20 md:text-5xl md:leading-12 lg:text-6xl lg:leading-16"
      >
        Vi producerar er reklamfilm eller slide för storbildsskärmar!
      </h1>
      <div class="px-8 text-lg lg:text-2xl">
        - Vi kan hjälpa er med allt under samma tak!
      </div>

      <NuxtLink
        :to="{ path: '/media-produktion', hash: '#info' }"
        class="absolute bottom-24 flex w-full items-center justify-center sm:bottom-16"
      >
        <ChevronDoubleDownIcon
          class="h-12 min-h-12 w-12 min-w-12 cursor-pointer opacity-70 hover:opacity-100"
        ></ChevronDoubleDownIcon>
      </NuxtLink>
    </div>
  </div>

  <div id="info" class="mx-4 my-20 flex flex-col gap-8 sm:mx-8">
    <div class="grid items-center gap-8 lg:grid-cols-2">
      <div class="mx-8 mb-8 flex flex-col gap-6 lg:mb-0">
        <p>
          Stort eller litet företag? Vi har lösningar för det mesta. Nej vi kan
          inte trolla men vi har en bred kompetens och vi försöker alltid skapa
          bästa möjliga produktion utifrån ditt företags behov och plånbok här
          och nu. Vi hjälper er gärna!
        </p>
        <p>
          Vi gör både reklamfilmer och material till storbildsskärmar i olika
          storlek och komplexitet för våra digitala utomhusmedier.
        </p>
        <p>
          Tänk på att nyttan med en bra film är större än bara en enskild
          kampanj. Ni kan även fritt använda er film i sociala medier och nå
          ännu fler människor samtidigt som ni stärker ert varumärke.
        </p>
      </div>

      <VideoBlob video-Link="/videos/ADinQ-Info.mp4"></VideoBlob>
    </div>

    <h3 class="mt-32 text-center">
      Mer information om våra marknadsföringskanaler
    </h3>

    <p v-if="galleryData.length > 0" class="text-center">
      Några exempelfilmer som vi producerat. Ni kan hitta fler genom att klicka
      på Youtube-länken i övre högra hörnet.
    </p>

    <QcardGallery
      v-if="galleryData.length > 0"
      :galleryData="galleryData"
    ></QcardGallery>
  </div>
</template>

<script>
export default {
  name: "MediaProduktion",

  inject: ["navbarHeight"],

  data() {
    const config = useRuntimeConfig();
    return {
      userName: config.public.userName,
      userPass: config.public.userPass,
      supportsDvh: null,
      galleryData: [],
      error: false,
    };
  },

  computed: {
    navHeight() {
      return this.navbarHeight();
    },
  },

  async created() {
    try {
      this.galleryData = await $fetch("/api/get-mediaproduktioner", {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa(this.userName + ":" + this.userPass),
        },
      });
    } catch (err) {
      this.error = true;
    }
  },

  mounted() {
    this.supportsDvh = CSS.supports("height", "100dvh");
  },
};
</script>
