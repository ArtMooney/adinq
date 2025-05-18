<script setup>
import { ChevronDoubleDownIcon } from "@heroicons/vue/24/solid";
</script>

<template>
  <div class="relative overflow-hidden pb-64">
    <div class="absolute inset-0 flex items-center overflow-hidden">
      <NuxtImg
        src="pexels-dariuskrs-2931915.jpg"
        alt="background image with a blue sky and some clouds"
        class="parallax-background -mt-12 h-full w-full object-cover"
        sizes="1000px md:2000px"
        width="2000"
        height="3000"
        densities="x1"
        placeholder
      />
    </div>

    <div class="absolute inset-0 flex items-center overflow-hidden">
      <NuxtImg
        src="flat_clouds.png"
        alt="an extra background layer with clouds"
        class="parallax-clouds h-full w-full object-cover"
        sizes="1000px md:2000px"
        width="2000"
        height="3000"
      />
    </div>

    <div
      class="relative flex h-[50vh] flex-col items-center justify-center px-8 text-center text-white"
    >
      <h1 class="text-4xl md:text-6xl">Säkra besiktningar</h1>
      <p>-Ackrediterad besiktning</p>
    </div>

    <NuxtImg
      src="skylift.png"
      alt="image of a red skylift towards a blue sky"
      class="relative h-full w-full min-w-[200vw] -translate-x-20 object-cover sm:min-w-0 sm:translate-x-0"
      sizes="1000px md:1800px"
      width="1800"
      height="1200"
    />

    <div class="relative right-0 mt-20 flex justify-end pl-4 text-left sm:px-0">
      <div
        class="flex flex-col gap-2 bg-white p-8 sm:col-start-2 sm:col-end-2 sm:max-w-2/3"
      >
        <h4 class="font-bold">Besiktning</h4>
        <p>
          Vi utför ackrediterad och oberoende besiktning av hissar, portar och
          lyftanordningar. Vi bidrar till ert arbete med att göra era
          anordningar säkra, funktionsdugliga samt att de uppfyller gällande
          krav från lagstiftning.
        </p>
      </div>
    </div>

    <NuxtImg
      src="travers.png"
      alt="image of a red skylift towards a blue sky"
      class="relative h-auto w-full object-cover"
      sizes="1000px md:2000px"
      width="2000"
      height="934"
      loading="lazy"
    />

    <div
      class="relative left-0 flex justify-start pr-4 text-left sm:grid-cols-2 sm:px-0"
    >
      <div
        class="flex flex-col gap-2 bg-white p-8 sm:col-start-1 sm:col-end-1 sm:max-w-2/3"
      >
        <h4 class="font-bold">Lokal Partner</h4>
        <p>
          Genom att anlita Säkra besiktningar så gynnar ni en lokal aktör som
          prioriterar era behov och levererar pålitliga tjänster.
        </p>
      </div>
    </div>

    <div
      class="relative right-0 mt-20 flex justify-end pl-4 text-left sm:grid-cols-2 sm:px-0"
    >
      <div
        class="flex flex-col gap-2 bg-white p-8 sm:col-start-2 sm:col-end-2 sm:max-w-2/3"
      >
        <h4 class="font-bold">Personlig Service</h4>
        <p>
          Vi erbjuder personlig kontakt och flexibla lösningar anpassade till
          era behov.
        </p>
      </div>
    </div>

    <ChevronDoubleDownIcon
      class="fixed bottom-4 mx-auto ml-4 h-12 w-12 max-w-screen-2xl text-white transition-opacity duration-500 ease-in-out"
      :class="[fadeOutDownIcon && 'opacity-0']"
    />
  </div>
</template>

<script>
export default {
  name: "Home",

  data() {
    return {
      fadeOutDownIcon: false,
    };
  },

  methods: {
    handleScroll() {
      const scrolled = window.scrollY;
      if (scrolled > 500) {
        this.fadeOutDownIcon = true;
      }

      const parallaxElements = document.querySelectorAll(
        ".parallax-background, .parallax-clouds",
      );

      parallaxElements.forEach(function (el, index) {
        const rate = index === 0 ? 0.4 : 0.2;
        const translateY = scrolled * rate;
        el.style.transform = `translateY(${translateY}px)`;
      });
    },
  },

  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
