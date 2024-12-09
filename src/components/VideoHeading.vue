<script setup>
import Button from "../elements/Button.vue";
</script>

<template>
  <div
    class="relative grid grid-cols-1 grid-rows-2 sm:grid-rows-1 md:grid-cols-slim"
  >
    <video
      class="col-start-1 col-end-4 row-start-1 row-end-1 h-full w-full items-stretch justify-items-stretch object-cover"
      muted=""
      playsinline=""
      autoplay=""
      loop=""
    >
      <source src="../assets/production%20ID_4374507.mp4" />
    </video>

    <div class="absolute bottom-0 left-0 right-0 top-0 bg-black/25"></div>

    <div
      class="relative col-start-2 col-end-2 row-start-2 row-end-2 flex flex-col items-start justify-center p-12 sm:row-start-1 sm:row-end-1 md:p-0"
    >
      <h1 class="text-4xl md:text-5xl">
        Kreativa lösningar för webb och animation
      </h1>

      <p class="max-w-prose pb-8 text-white">
        Vi erbjuder anpassade webb- och 3D-animationstjänster för att hjälpa
        ditt företag att skapa nytta. Kontakta oss idag för en kostnadsfri
        konsultation.
      </p>

      <Button
        text="Läs mer"
        link="/"
        hash="#services"
        type="button"
        data-wait=""
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoHeading",
};
</script>
