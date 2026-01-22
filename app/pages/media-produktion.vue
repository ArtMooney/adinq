<script setup>
import IconQlementineIconsChevronDoubleDown16 from "~icons/qlementine-icons/chevron-double-down-16";

const config = useRuntimeConfig();
const imageBaseUrl = config.public.imageBaseUrl;

useSeoMeta({
  title: "Reklamfilm & Media Produktion för storbildsskärmar | Adinq",
  description:
    "Vi producerar reklamfilmer och slides för storbildsskärmar och DOOH. Allt under samma tak - från idé till färdig film. Perfekt för butiks-TV och sociala medier.",
  ogTitle: "Reklamfilm & Media Produktion för storbildsskärmar",
  ogDescription:
    "Vi producerar reklamfilmer och slides för storbildsskärmar och DOOH. Allt under samma tak för ditt företag.",
  ogImage: `${imageBaseUrl}/camera-at-ocean-shore.jpg`,
  twitterCard: "summary_large_image",
  twitterTitle: "Reklamfilm & Media Produktion för storbildsskärmar",
  twitterDescription:
    "Vi producerar reklamfilmer och slides för storbildsskärmar och DOOH.",
  twitterImage: `${imageBaseUrl}/camera-at-ocean-shore.jpg`,
});

definePageMeta({
  ssr: true,
});

const { data: gallery, error } = await useFetch("/api/media-productions", {
  method: "GET",
  headers: {
    Authorization:
      "Basic " + btoa(config.public.userName + ":" + config.public.userPass),
  },
  default: () => [],
});

const galleryStores = gallery.value.filter(
  (qcard) => qcard?.filmType === "butiksfilm",
);

const galleryBigscreens = gallery.value.filter(
  (qcard) => qcard?.filmType === "storbildsfilm",
);
</script>

<template>
  <Heading>
    <template #heading-content>
      <NuxtImg
        src="camera-at-ocean-shore.jpg"
        alt=""
        class="h-full w-full object-cover"
        sizes="500px sm:640px md:768px lg:1024px xl:1280px 2xl:1536px"
        width="1919"
        height="3000"
        densities="x1"
        format="webp"
      />

      <div class="absolute inset-0 bg-[#2f3f4d]/50"></div>

      <div
        class="absolute inset-0 flex flex-col items-center justify-center text-center"
      >
        <h1 class="mx-10 mb-8 md:mx-30">
          {{ staticContent.header.title }}
        </h1>

        <div class="max-w-3xl px-8 text-lg lg:text-2xl">
          {{ staticContent.header.subtitle }}
        </div>

        <NuxtLink
          :to="{ path: '/media-produktion', hash: '#info' }"
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
    <div class="grid items-center gap-8 lg:grid-cols-2">
      <div
        class="mx-2 mb-8 flex flex-col gap-6 text-center lg:mb-0 lg:text-left"
      >
        <p v-html="formatText(staticContent.videoBlock.text)"></p>
      </div>

      <VideoBlob :video-Link="staticContent.videoBlock.videoLink"></VideoBlob>
    </div>

    <h3 id="media-gallery" class="mt-32 text-center">
      {{ staticContent.marketingChannels.title }}
    </h3>

    <p
      v-if="galleryStores.length > 0"
      class="text-center"
      v-html="formatText(staticContent.marketingChannels.text_movies)"
    ></p>

    <QcardGallery
      v-if="galleryStores.length > 0"
      :galleryData="galleryStores"
    ></QcardGallery>

    <p
      v-if="galleryBigscreens.length > 0"
      class="mt-20 text-center"
      v-html="formatText(staticContent.marketingChannels.text_bigscreens)"
    ></p>

    <QcardGallery
      v-if="galleryBigscreens.length > 0"
      :galleryData="galleryBigscreens"
    ></QcardGallery>

    <div class="relative mt-32 grid gap-8 p-8">
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
        icon="ph:film-reel-light"
        icon-color="#e09963"
        :message="formatText(staticContent.iconBlob.block1)"
        link="/media-produktion#media-gallery"
      ></IconBlob>

      <IconBlob
        icon="bi:camera-reels"
        icon-color="#67ac6e"
        :message="formatText(staticContent.iconBlob.block2)"
        link="/media-produktion#media-gallery"
      ></IconBlob>

      <IconBlob
        icon="teenyicons:headset-outline"
        icon-color="#ac67a6"
        :message="formatText(staticContent.iconBlob.block3)"
        link="/kundutlatanden"
      ></IconBlob>

      <IconBlob
        icon="hugeicons:contact-01"
        icon-color="#6293a5"
        :message="formatText(staticContent.iconBlob.block4)"
        link="/kontakta-oss"
      ></IconBlob>
    </div>
  </div>
</template>

<script>
import { useStaticContentStore } from "~/stores/static-content.js";

export default {
  name: "MediaProduktion",

  computed: {
    staticContent() {
      return useStaticContentStore().getContentByTitle("page - MediaProduktion")
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
