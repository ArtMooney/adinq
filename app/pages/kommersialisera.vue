<script setup>
import IconQlementineIconsChevronDoubleDown16 from "~icons/qlementine-icons/chevron-double-down-16";

const config = useRuntimeConfig();
const imageBaseUrl = config.public.imageBaseUrl;

useSeoMeta({
  title:
    "Kommersialisera din fastighet med DOOH | Storbildsskärmar & utomhusmedia",
  description:
    "Öka intäkterna från din fastighet med storbildsskärmar och DOOH utomhusmedia. Vi hjälper fastighetsägare, markägare och skärmägare med installation, montage och mediaförsäljning.",
  ogTitle: "Kommersialisera din fastighet med DOOH",
  ogDescription:
    "Öka intäkterna från din fastighet med storbildsskärmar och DOOH utomhusmedia. Installation, montage och mediaförsäljning.",
  ogImage: `${imageBaseUrl}/city-stockholm.jpg`,
  twitterCard: "summary_large_image",
  twitterTitle: "Kommersialisera din fastighet med DOOH",
  twitterDescription:
    "Öka intäkterna från din fastighet med storbildsskärmar och DOOH utomhusmedia.",
  twitterImage: `${imageBaseUrl}/city-stockholm.jpg`,
});

definePageMeta({
  ssr: true,
});
</script>

<template>
  <Heading>
    <template #heading-content>
      <NuxtImg
        src="city-stockholm.jpg"
        alt=""
        class="h-full w-full object-cover"
        sizes="500px sm:640px md:768px lg:1024px xl:1280px 2xl:1536px"
        width="2000"
        height="1333"
        densities="x1"
        format="webp"
      />

      <div class="absolute inset-0 bg-[#29648b]/40"></div>

      <div
        class="absolute inset-0 flex flex-col items-center justify-center text-center"
      >
        <h1 class="mx-10 mb-8 md:mx-30">{{ staticContent.header.title }}</h1>

        <div class="max-w-3xl px-8 text-lg lg:text-2xl">
          {{ staticContent.header.subtitle }}
        </div>

        <NuxtLink
          :to="{ path: '/kommersialisera', hash: '#info' }"
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
        icon="streamline-ultimate-color:screen-curved"
        :title="staticContent.textBlocks.block1.title"
        :message="formatText(staticContent.textBlocks.block1.text)"
        link=""
      ></IconBlob>

      <IconBlob
        icon="streamline-ultimate-color:business-deal-handshake-1"
        :title="staticContent.textBlocks.block2.title"
        :message="formatText(staticContent.textBlocks.block2.text)"
        link=""
      ></IconBlob>

      <IconBlob
        icon="fxemoji:housebuilding"
        :title="staticContent.textBlocks.block3.title"
        :message="formatText(staticContent.textBlocks.block3.text)"
        link=""
      ></IconBlob>
    </div>

    <MarketingChannels></MarketingChannels>
  </div>
</template>

<script>
import { useStaticContentStore } from "~/stores/static-content.js";

export default {
  name: "Kommersialisera",

  computed: {
    staticContent() {
      return useStaticContentStore().getContentByTitle("page - Kommersialisera")
        .content;
    },
  },

  methods: {
    formatText(text) {
      return text.replace(/\*/g, "•").replace(/\n/g, "<br>").trim();
    },
  },
};
</script>
