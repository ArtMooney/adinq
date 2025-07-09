<script setup>
useSeoMeta({
  title: "",
  description: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  twitterCard: "",
  twitterTitle: "",
  twitterDescription: "",
  twitterImage: "",
});

definePageMeta({
  ssr: true,
});
</script>

<template>
  <Heading>
    <template #heading-content>
      <NuxtImg
        src="tara-clark-Gk8LG7dsHWA-unsplash.jpg"
        alt=""
        class="h-full w-full object-cover"
        sizes="1000px md:2000px"
        width="4000"
        height="4000"
        densities="x1"
        format="webp"
      />

      <div class="absolute inset-0 bg-yellow-900/50"></div>

      <div
        class="absolute inset-0 flex flex-col items-center justify-center text-center"
      >
        <h1 class="mx-10 mb-8 md:mx-30">Butiks-TV</h1>

        <div class="px-8 text-lg lg:text-2xl">
          Att synas där människor finns
        </div>

        <NuxtLink
          :to="{ path: '/butiks-tv', hash: '#info' }"
          class="absolute bottom-8 flex w-full items-center justify-center"
        >
          <Icon
            name="qlementine-icons:chevron-double-down-16"
            class="h-12 min-h-12 w-12 min-w-12 cursor-pointer opacity-70 hover:opacity-100"
          ></Icon>
        </NuxtLink>
      </div>
    </template>
  </Heading>

  <div id="info" class="mx-4 my-20 flex flex-col gap-8 sm:mx-8">
    <div class="relative mt-32 grid gap-8 p-8">
      <NuxtImg
        src="birmingham-museums-trust-BPWZ01FtySg-unsplash.jpg"
        alt=""
        class="absolute inset-0 h-full w-full object-cover opacity-15"
        sizes="1000px md:2000px"
        width="2912"
        height="2032"
        format="webp"
      />

      <IconBlob
        icon="ph:film-reel-light"
        icon-color="#e09963"
        message="En bild säger mer än tusen ord. 10-20 sekunder säger ännu mer. I kombination med enkla, personliga och kärnfulla budskap kan vi hjälpa dig att stärka ditt varumärke hos både befintliga och nya kunder. Effektfulla filmer som passar perfekt att dela på sociala medier."
        link="/media-produktion#media-gallery"
      ></IconBlob>

      <IconBlob
        icon="bi:camera-reels"
        icon-color="#67ac6e"
        message="Perfekt för dina kampanjer. På en bra grund är det enkelt att byta budskap under året."
        link="/media-produktion#media-gallery"
      ></IconBlob>

      <IconBlob
        icon="teenyicons:headset-outline"
        icon-color="#ac67a6"
        message="Att önska sina kunder en Glad Påsk, Trevlig Sommar eller God Jul har ett mycket stort värde och stärker din image. Kundvård på ett mycket enkelt sätt och vi hjälper dig gärna!"
        link="/kundutlatanden"
      ></IconBlob>
    </div>
  </div>
</template>

<script>
export default {
  name: "ButiksTv",
};
</script>
