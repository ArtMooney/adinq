<script setup>
import IconQlementineIconsChevronDoubleDown16 from "~icons/qlementine-icons/chevron-double-down-16";

const config = useRuntimeConfig();
const imageBaseUrl = config.public.imageBaseUrl;

useSeoMeta({
  title: "Storbildsskärmar - Tydlig DOOH reklam utomhus | Adinq",
  description:
    "Tydlig och effektiv marknadsföring med storbildsskärmar. Syns där människor finns - stort, tydligt och icke-påtvingande. Flera orter i Sverige. Vi producerar även era slides.",
  ogTitle: "Storbildsskärmar - Tydlig DOOH reklam utomhus",
  ogDescription:
    "Tydlig och effektiv marknadsföring med storbildsskärmar. Syns där människor finns på flera orter i Sverige.",
  ogImage: `${imageBaseUrl}/led-screen-gislaved-hq.jpg`,
  twitterCard: "summary_large_image",
  twitterTitle: "Storbildsskärmar - Tydlig DOOH reklam utomhus",
  twitterDescription:
    "Tydlig och effektiv marknadsföring med storbildsskärmar. Syns där människor finns.",
  twitterImage: `${imageBaseUrl}/led-screen-gislaved-hq.jpg`,
});

definePageMeta({
  ssr: true,
});
</script>

<template>
  <Heading>
    <template #heading-content>
      <NuxtImg
        src="led-screen-gislaved-hq.jpg"
        alt=""
        class="h-full w-full object-cover"
        sizes="768px lg:1024px xl:1280px 2xl:1536px"
        width="2000"
        height="1333"
        densities="x1"
        format="webp"
      />

      <div class="absolute inset-0 bg-[#2a3749]/50"></div>

      <div
        class="absolute inset-0 flex flex-col items-center justify-center text-center"
      >
        <h1 class="mx-10 mb-8 md:mx-30">{{ staticContent.header.title }}</h1>

        <NuxtLink
          :to="{ path: '/storbildsskarmar', hash: '#info' }"
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
    <div class="relative grid items-center gap-8 p-4 sm:p-8 lg:grid-cols-3">
      <NuxtImg
        src="background-bricks.jpg"
        alt=""
        class="absolute inset-0 h-full w-full object-cover opacity-10"
        sizes="500px sm:640px md:768px lg:1024px xl:1280px 2xl:1536px"
        width="2000"
        height="3000"
        format="webp"
      />

      <IconBlob
        icon="streamline-ultimate-color:saving-money-flower"
        icon-color="#e09963"
        :message="formatText(staticContent.textBlock.text)"
        link=""
        class="relative lg:col-span-2"
      ></IconBlob>

      <NuxtImg
        :src="`/cms-files/${staticContent.textBlock.image}`"
        alt=""
        sizes="500px sm:640px md:500px"
        width="750"
        height="924"
        format="webp"
        class="relative"
      />
    </div>

    <MarketingChannels></MarketingChannels>
  </div>
</template>

<script>
import { useStaticContentStore } from "~/stores/static-content.js";

export default {
  name: "Storbildsskarmar",

  computed: {
    staticContent() {
      return useStaticContentStore().getContentByTitle(
        "page - Storbildsskarmar",
      ).content;
    },
  },
};
</script>
