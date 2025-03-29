<script setup>
useSeoMeta({
  title: "Kontakta Säkra besiktningar - Offert och information",
  description:
    "Kontakta oss för offert på besiktning av hissar, portar och lyftanordningar. Ring 0760-05 75 15 eller maila info@sakrabesiktningar.se. Baserade i Kungsbacka.",
  ogTitle: "Kontakta Säkra besiktningar - Offert och information",
  ogDescription:
    "Kontakta oss för offert på besiktning av hissar, portar och lyftanordningar. Vi ser fram emot att höra från er!",
  ogImage: "/images/og-image-contact.jpg",
  twitterCard: "summary_large_image",
  twitterTitle: "Kontakta Säkra besiktningar",
  twitterDescription:
    "Kontakta oss för offert på besiktning av hissar, portar och lyftanordningar. Ring 0760-05 75 15 eller maila info@sakrabesiktningar.se.",
  twitterImage: "/images/twitter-image-contact.jpg",
});
</script>

<template>
  <Contact />
</template>

<script>
export default {
  name: "KontaktaOss",
  setup() {
    definePageMeta({
      ssr: true,
    });
  },
};
</script>
