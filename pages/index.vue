<script setup>
import {
  TvIcon,
  ComputerDesktopIcon,
  VideoCameraIcon,
  BuildingOffice2Icon,
} from "@heroicons/vue/24/outline";

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

    <div class="mt-12 mb-20 grid grid-cols-2 gap-8">
      <div
        class="group relative min-h-52 rounded border border-white/25 bg-neutral-900 p-8 pb-12"
      >
        <div
          class="absolute inset-0 z-[-1] rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 blur-xl transition-opacity duration-300 ease-in-out group-hover:opacity-50"
        ></div>
        <TvIcon class="relative mb-3 h-10 w-10" />
        <div class="relative mb-6 h-[1px] w-2/3 bg-white/25"></div>
        <p class="relative">
          Butiks-TV är ett effektivt marknadsföringsverktyg som visar reklam och
          information direkt i butiksmiljön. Skärmarna placeras strategiskt för
          att nå kunder när de handlar.
        </p>
      </div>

      <div
        class="group relative min-h-52 rounded border border-white/25 bg-neutral-900 p-8 pb-12"
      >
        <div
          class="absolute inset-0 z-[-1] rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 blur-xl transition-opacity duration-300 ease-in-out group-hover:opacity-50"
        ></div>
        <ComputerDesktopIcon class="relative mb-3 h-10 w-10" />
        <div class="relative mb-6 h-[1px] w-2/3 bg-white/25"></div>
        <p class="relative">
          Digitala utomhusskärmar eller LED-skyltar visar rörlig reklam som
          effektivt fångar förbipasserande trafikanters uppmärksamhet. Med sina
          starka färger och dynamiska innehåll skapar de minnesvärda intryck
          även vid hög hastighet.
        </p>
      </div>

      <div
        class="group relative min-h-52 rounded border border-white/25 bg-neutral-900 p-8 pb-12"
      >
        <div
          class="absolute inset-0 z-[-1] rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 blur-xl transition-opacity duration-300 ease-in-out group-hover:opacity-50"
        ></div>
        <VideoCameraIcon class="relative mb-3 h-10 w-10" />
        <div class="relative mb-6 h-[1px] w-2/3 bg-white/25"></div>
        <p class="relative">
          Med specialistkompetens kring olika kanaler maximeras avkastningen på
          kundens marknadsföringsinvesteringar genom datadrivna beslut och
          förhandlingskraft gentemot medieleverantörer.
        </p>
      </div>

      <div
        class="group relative min-h-52 rounded border border-white/25 bg-neutral-900 p-8 pb-12"
      >
        <div
          class="absolute inset-0 z-[-1] rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 blur-xl transition-opacity duration-300 ease-in-out group-hover:opacity-50"
        ></div>
        <BuildingOffice2Icon class="relative mb-3 h-10 w-10" />
        <div class="relative mb-6 h-[1px] w-2/3 bg-white/25"></div>
        <p class="relative">
          Strategiska samarbeten med fastighetsägare ger annonsörer tillgång
          till exponeringsytor där människor bor, arbetar och konsumerar.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
};
</script>
