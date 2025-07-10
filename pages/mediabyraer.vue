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
        src="personalgraphic-com-fseahNq6zic-unsplash.jpg"
        alt=""
        class="h-full w-full object-cover"
        sizes="1000px md:2000px"
        width="2500"
        height="2500"
        densities="x1"
        format="webp"
      />

      <div class="absolute inset-0 bg-[#2a3749]/50"></div>

      <div
        class="absolute inset-0 flex flex-col items-center justify-center text-center"
      >
        <h1 class="mx-10 mb-8 md:mx-30">En naturlig del i mediemixen!</h1>

        <div class="px-8 text-lg lg:text-2xl">
          Stor flexibilitet - lokala i hela Sverige!
        </div>

        <NuxtLink
          :to="{ path: '/mediabyraer', hash: '#info' }"
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
    <div class="relative grid gap-8 p-8">
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
