<script setup>
useSeoMeta({
  title:
    "Säkra besiktningar - Ackrediterad besiktning av hissar och lyftanordningar",
  description:
    "Vi utför ackrediterad och oberoende besiktning av hissar, portar och lyftanordningar. Lokal partner med personlig service i Kungsbacka och hela Sverige.",
  ogTitle: "Säkra besiktningar - Ackrediterad besiktning",
  ogDescription:
    "Vi utför ackrediterad och oberoende besiktning av hissar, portar och lyftanordningar. Lokal partner med personlig service.",
  ogImage: "/images/og-image-home.jpg",
  twitterCard: "summary_large_image",
  twitterTitle: "Säkra besiktningar - Ackrediterad besiktning",
  twitterDescription:
    "Vi utför ackrediterad och oberoende besiktning av hissar, portar och lyftanordningar. Lokal partner med personlig service.",
  twitterImage: "/images/twitter-image-home.jpg",
});
</script>

<template>
  <Home />
</template>

<script>
export default {
  name: "Index",
  setup() {
    definePageMeta({
      ssr: true,
    });
  },
};
</script>
