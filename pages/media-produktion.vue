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
      src="andrey-novik-5DDDzKMK0s8-unsplash.jpg"
      alt=""
      class="h-full w-full object-cover"
      sizes="1000px md:2000px"
      width="4600"
      height="3500"
      densities="x1"
    />

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
    <p>
      Stort eller litet företag? Vi har lösningar för det mesta. Nej vi kan inte
      trolla men vi har en bred kompetens och vi försöker alltid skapa bästa
      möjliga produktion utifrån ditt företags behov och plånbok här och nu. Vi
      hjälper er gärna!
    </p>
    <p>
      Vi gör både reklamfilmer och material till storbildsskärmar i olika
      storlek och komplexitet för våra digitala utomhusmedier.
    </p>
    <p>
      Tänk på att nyttan med en bra film är större än bara en enskild kampanj.
      Ni kan även fritt använda er film i sociala medier och nå ännu fler
      människor samtidigt som ni stärker ert varumärke.
    </p>

    <VideoBlob video-Link="/videos/ADinQ-Info.mp4"></VideoBlob>

    <h3 class="mt-32 text-center">
      Mer information om våra marknadsföringskanaler
    </h3>

    <div class="mt-4 grid gap-8 md:grid-cols-2">
      <IconBlob
        icon="tv"
        message="Butiks-TV är ett effektivt marknadsföringsverktyg som visar reklam och information direkt i butiksmiljön. Skärmarna placeras strategiskt för att nå kunder när de handlar."
        link="/butiks-tv"
      ></IconBlob>

      <IconBlob
        icon="computer"
        message="Digitala utomhusskärmar eller LED-skyltar visar rörlig reklam som effektivt fångar förbipasserande trafikanters uppmärksamhet. Med sina starka färger och dynamiska innehåll skapar de minnesvärda intryck även vid hög hastighet."
        link="/storbildsskarmar"
      ></IconBlob>

      <IconBlob
        icon="video"
        message="Med specialistkompetens kring olika kanaler maximeras avkastningen på kundens marknadsföringsinvesteringar genom datadrivna beslut och förhandlingskraft gentemot medieleverantörer."
        link="/mediabyraer"
      ></IconBlob>

      <IconBlob
        icon="building"
        message="Strategiska samarbeten med fastighetsägare ger annonsörer tillgång till exponeringsytor där människor bor, arbetar och konsumerar."
        link="/kommersialisera"
      ></IconBlob>
    </div>
  </div>
  s
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
