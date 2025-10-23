<script setup>
import IconQlementineIconsChevronDoubleDown16 from "~icons/qlementine-icons/chevron-double-down-16";

useSeoMeta({
  title: "DOOH för Mediebyråer - En naturlig del i mediemixen | Adinq",
  description:
    "DOOH och butiks-TV som naturlig del i mediemixen. Stor flexibilitet, lokala i hela Sverige. 140+ visningar per dag, filmer som inte går att zappa bort. Perfekt komplement till era kampanjer.",
  ogTitle: "DOOH för Mediebyråer - En naturlig del i mediemixen",
  ogDescription:
    "DOOH och butiks-TV som naturlig del i mediemixen. Stor flexibilitet, lokala i hela Sverige.",
  ogImage: "https://www.adinq.se/air-balloons-on-blue-sky.jpg",
  twitterCard: "summary_large_image",
  twitterTitle: "DOOH för Mediebyråer - En naturlig del i mediemixen",
  twitterDescription:
    "DOOH och butiks-TV som naturlig del i mediemixen. Stor flexibilitet, lokala i hela Sverige.",
  twitterImage: "https://www.adinq.se/air-balloons-on-blue-sky.jpg",
});

definePageMeta({
  ssr: true,
});
</script>

<template>
  <Heading>
    <template #heading-content>
      <NuxtImg
        src="air-balloons-on-blue-sky.jpg"
        alt=""
        class="h-full w-full object-cover"
        sizes="500px sm:640px md:768px lg:1024px xl:1280px 2xl:1536px"
        width="2000"
        height="3000"
        densities="x1"
        format="webp"
      />

      <div class="absolute inset-0 bg-[#29648b]/40"></div>

      <div
        class="absolute inset-0 flex flex-col items-center justify-center text-center"
      >
        <h1 class="mx-10 mb-8 md:mx-30">En naturlig del i mediemixen!</h1>

        <div class="max-w-3xl px-8 text-lg lg:text-2xl">
          Stor flexibilitet - lokala i hela Sverige!
        </div>

        <NuxtLink
          :to="{ path: '/mediabyraer', hash: '#info' }"
          class="absolute bottom-8 flex w-full items-center justify-center"
        >
          <IconQlementineIconsChevronDoubleDown16
            class="h-12 min-h-12 w-12 min-w-12 cursor-pointer opacity-70 hover:opacity-100"
          ></IconQlementineIconsChevronDoubleDown16>
        </NuxtLink>
      </div>
    </template>
  </Heading>

  <div id="info" class="mx-4 my-20 flex flex-col gap-8 sm:mx-8">
    <div class="relative grid gap-8 p-4 sm:p-8">
      <NuxtImg
        src="background-bricks-flowers.jpg"
        alt=""
        class="absolute inset-0 h-full w-full object-cover opacity-15"
        sizes="500px sm:640px md:768px lg:1024px xl:1280px 2xl:1536px"
        width="2003"
        height="3000"
        format="webp"
      />

      <IconBlob
        icon="streamline-ultimate-color:color-palette-2"
        icon-color="#e09963"
        title="Butiks TV och digitala storbildskärmar"
        :message="[
          'Två kompletterande marknadsplatser. Ett koncept vi är relativt ensamma om och specialiserade på sedan många år.',
          '',
          '• Filmerna går inte att klicka eller zappa bort.',
          '• Du möter folk i en av vardagens få pauser, - i kön till kassan.',
          '• Hög visningsfrekvens, - från 140 visningar per dag/butik.',
          '• Enkelt att köpa, enkelt att variera ditt budskap.',
          '• Köp lokalt på din ort, regionalt eller rikstäckande.',
          '',
          'Allt beroende på hur era kunders kampanjer ligger bokade eller vart man vill synas. Vår stora fördel är att vi kan vara lokala i hela Sverige.',
        ]"
        link=""
      ></IconBlob>
    </div>

    <MarketingChannels></MarketingChannels>
  </div>
</template>

<script>
export default {
  name: "Mediabyraer",
};
</script>
