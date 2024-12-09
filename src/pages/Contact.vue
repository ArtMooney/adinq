<script setup>
import Contact from "../components/Contact.vue";
</script>

<template>
  <div
    class="grid-rows-auto mx-auto grid w-full max-w-screen-2xl grid-cols-1 px-4 sm:px-4"
  >
    <Contact />
  </div>
</template>

<script>
export default {
  name: "Contact",
  head: {
    title: "Kontakta Oss - Webb- och 3D-Animationstjänster | FrameCore 2024",
    meta: [
      {
        name: "keywords",
        content:
          "kontakta oss, kontaktformulär, frågor, support, FrameCore 2024",
      },
      { name: "robots", content: "index, follow" },
      {
        name: "description",
        content:
          "Kontakta oss för att diskutera dina behov och projekt. Använd vårt kontaktformulär för att skicka frågor, begära support eller få mer information om våra tjänster. Drivs av FrameCore 2024.",
      },
      {
        property: "og:title",
        content:
          "Kontakta Oss - Webb- och 3D-Animationstjänster | FrameCore 2024",
      },
      {
        property: "og:description",
        content:
          "Kontakta oss för att diskutera dina behov och projekt. Använd vårt kontaktformulär för att skicka frågor, begära support eller få mer information om våra tjänster. Drivs av FrameCore 2024.",
      },
      {
        property: "og:image",
        content: "https://www.framecore.se/assets/safsen_snapshot.jpg",
      },
    ],
  },
};
</script>
