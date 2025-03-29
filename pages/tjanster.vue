<script setup>
useSeoMeta({
  title:
    "Våra besiktningstjänster - Hissar, portar, kranar och lyftanordningar | Säkra besiktningar",
  description:
    "Vi utför ackrediterad besiktning av motordrivna portar, lastbryggor, mobila arbetsplattformar, plocktruckar, fordonslyftar, kranar och hissar enligt lagkrav.",
  ogTitle:
    "Besiktningstjänster för hissar, portar och lyftanordningar | Säkra besiktningar",
  ogDescription:
    "Våra besiktningstjänster omfattar motordrivna portar, lastbryggor, kranar, hissar och andra lyftanordningar enligt gällande lagkrav och föreskrifter.",
  ogImage: "/images/og-image-services.jpg",
  twitterCard: "summary_large_image",
  twitterTitle: "Besiktningstjänster för hissar, portar och lyftanordningar",
  twitterDescription:
    "Ackrediterad besiktning av motordrivna portar, lastbryggor, kranar, hissar och andra lyftanordningar.",
  twitterImage: "/images/twitter-image-services.jpg",
});
</script>

<template>
  <Services />
</template>

<script>
export default {
  name: "Tjanster",
  setup() {
    definePageMeta({
      ssr: true,
    });
  },
};
</script>
