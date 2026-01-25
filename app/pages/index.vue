<script setup>
import IconChevronDoubleDown16 from "~icons/qlementine-icons/chevron-double-down-16";

const config = useRuntimeConfig();
const imageBaseUrl = config.public.imageBaseUrl;
const publicSiteUrl = config.public.publicSiteUrl;
const staticContentStore = useStaticContentStore();
const staticContent = computed(
  () => staticContentStore.getContentByTitle("page - Index").content,
);
const staticContentSEO = computed(
  () => staticContentStore.getContentByTitle("SEO page - Index").content,
);

useSeoMeta({
  title: () => staticContentSEO.value.title,
  description: () => staticContentSEO.value.description,
  ogTitle: () => staticContentSEO.value.ogTitle,
  ogDescription: () => staticContentSEO.value.ogDescription,
  ogImage: () => `${imageBaseUrl}/cms-files/${staticContentSEO.value.ogImage}`,
  ogUrl: `${publicSiteUrl}`,
  ogType: "website",
  ogSiteName: "Adinq",
  ogLocale: "sv_SE",
  twitterCard: "summary_large_image",
  twitterTitle: () => staticContentSEO.value.twitterTitle,
  twitterDescription: () => staticContentSEO.value.twitterDescription,
  twitterImage: () =>
    `${imageBaseUrl}/cms-files/${staticContentSEO.value.twitterImage}`,
  robots: "index, follow",
  author: "Adinq",
});

definePageMeta({
  ssr: true,
});
</script>

<template>
  <Heading>
    <template #heading-content>
      <LoadingSpinner
        v-if="!videoLoaded"
        class="absolute top-2/5 left-1/2 -translate-x-1/2 transform"
      ></LoadingSpinner>

      <ClientOnly>
        <video
          ref="titleVideo"
          v-show="videoLoaded"
          @canplay="videoLoaded = true"
          autoplay
          loop
          muted
          disablepictureinpicture
          playsinline
          preload="auto"
          class="h-full w-full object-cover"
        >
          <source :src="`${imageBaseUrl}/slow-motion-crowd.mp4`" />
        </video>
      </ClientOnly>

      <div v-show="videoLoaded" class="absolute inset-0 bg-red-950/40"></div>

      <div
        v-show="videoLoaded"
        class="absolute inset-0 flex flex-col items-center justify-center bg-amber-700/15 px-4 text-center"
      >
        <h1 class="mx-10 mb-8 md:mx-30">{{ staticContent.header.title }}</h1>

        <div class="max-w-3xl px-8 text-lg lg:text-2xl">
          {{ staticContent.header.subtitle }}
        </div>

        <NuxtLink
          :to="{ path: '/', hash: '#services' }"
          class="absolute bottom-8 flex w-full items-center justify-center"
        >
          <IconChevronDoubleDown16
            class="h-12 min-h-12 w-12 min-w-12 cursor-pointer opacity-70 hover:opacity-100"
          ></IconChevronDoubleDown16>
        </NuxtLink>
      </div>
    </template>
  </Heading>

  <div class="mx-4 my-20 flex flex-col gap-8 sm:mx-8">
    <h3 id="services" class="mt-32 text-center">
      {{ staticContent.videoBlock.title }}
    </h3>
    <div class="flex justify-center gap-4 underline">
      <div
        @click="sweVersion = true"
        class="cursor-pointer"
        :class="[!sweVersion && 'opacity-25']"
      >
        Svensk version
      </div>
      <div class="opacity-50">|</div>
      <div
        @click="sweVersion = false"
        class="cursor-pointer"
        :class="[sweVersion && 'opacity-25']"
      >
        English version
      </div>
    </div>

    <VideoBlob
      v-if="sweVersion"
      :video-Link="`${staticContent.videoBlock.videoLinkSwe}`"
      :poster="`${imageBaseUrl}/cms-files/${staticContent.videoBlock.poster}`"
    ></VideoBlob>
    <VideoBlob
      v-if="!sweVersion"
      :video-Link="`${staticContent.videoBlock.videoLinkEng}`"
      :poster="`${imageBaseUrl}/cms-files/${staticContent.videoBlock.poster}`"
    ></VideoBlob>

    <MarketingChannels></MarketingChannels>
  </div>
</template>

<script>
export default {
  name: "Index",

  data() {
    return {
      videoLoaded: false,
      sweVersion: true,
    };
  },

  activated() {
    if (this.$refs.titleVideo) {
      this.$refs.titleVideo.play();
    }
  },
};
</script>
