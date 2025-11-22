<script setup>
import IconQlementineIconsChevronDoubleDown16 from "~icons/qlementine-icons/chevron-double-down-16";

useSeoMeta({
  title: "Marknadsplatskarta - Våra DOOH-platser över hela Sverige | Adinq",
  description:
    "Sök bland våra många marknadsplatser över hela Sverige. Interaktiv karta som visar var Adinq har digitala reklamplatser och DOOH-skärmar. Navigera enkelt för att hitta platser nära dig.",
  ogTitle: "Marknadsplatskarta - Våra DOOH-platser över hela Sverige",
  ogDescription:
    "Interaktiv karta som visar var Adinq har digitala reklamplatser och DOOH-skärmar över hela Sverige.",
  ogImage: "https://www.adinq.se/small-house-on-island.jpg",
  twitterCard: "summary_large_image",
  twitterTitle: "Marknadsplatskarta - Våra DOOH-platser över hela Sverige",
  twitterDescription:
    "Interaktiv karta som visar var Adinq har digitala reklamplatser över hela Sverige.",
  twitterImage: "https://www.adinq.se/small-house-on-island.jpg",
});

definePageMeta({
  ssr: true,
});
</script>

<template>
  <Heading>
    <template #heading-content>
      <NuxtImg
        src="small-house-on-island.jpg"
        alt=""
        class="h-full w-full object-cover"
        sizes="500px sm:640px md:768px lg:1024px xl:1280px 2xl:1536px"
        width="2000"
        height="1499"
        densities="x1"
        format="webp"
      />

      <div class="absolute inset-0 bg-[#3d5463]/40"></div>

      <div
        class="absolute inset-0 flex flex-col items-center justify-center text-center"
      >
        <h1 class="mx-10 mb-8 md:mx-30">
          Sök bland våra många marknadsplatser över hela Sverige!
        </h1>

        <div class="max-w-3xl px-8 text-lg lg:text-2xl">
          Navigera i kartan nedan med mus, touchpad eller på mobilen!
        </div>

        <NuxtLink
          :to="{ path: '/marknadsplatskarta', hash: '#info' }"
          class="absolute bottom-8 flex w-full items-center justify-center"
        >
          <IconQlementineIconsChevronDoubleDown16
            class="h-12 min-h-12 w-12 min-w-12 cursor-pointer opacity-70 hover:opacity-100"
          ></IconQlementineIconsChevronDoubleDown16>
        </NuxtLink>
      </div>
    </template>
  </Heading>

  <MarketplaceMap id="info" />

  <div class="mx-4 mb-20 flex flex-col gap-8 sm:mx-8">
    <MarketingChannels></MarketingChannels>
  </div>
</template>

<script>
export default {
  name: "Marknadsplatskarta",
};
</script>
