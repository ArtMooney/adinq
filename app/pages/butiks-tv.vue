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
        src="grocery-shopping.jpg"
        alt=""
        class="h-full w-full object-cover"
        sizes="1000px md:2000px"
        width="4000"
        height="4000"
        densities="x1"
        format="webp"
      />

      <div class="absolute inset-0 bg-[#8a5f35]/40"></div>

      <div
        class="absolute inset-0 flex flex-col items-center justify-center text-center"
      >
        <h1 class="mx-10 mb-8 md:mx-30">Butiks-TV</h1>

        <div class="max-w-3xl px-8 text-lg lg:text-2xl">
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
    <div class="relative grid gap-8 p-4 sm:p-8">
      <NuxtImg
        src="background-bricks-flowers.jpg"
        alt=""
        class="absolute inset-0 h-full w-full object-cover opacity-15"
        sizes="1000px md:2000px"
        width="2912"
        height="2032"
        format="webp"
      />

      <IconBlob
        icon="streamline-ultimate-color:color-palette"
        icon-color="#e09963"
        title="Stort eller litet företag?"
        message="Vi hjälper dig att nå ut. Lokalt, regionalt eller rikstäckande!"
        link=""
      ></IconBlob>

      <IconBlob
        icon="streamline-ultimate-color:desktop-monitor-smiley"
        icon-color="#67ac6e"
        title="Fördelar som annonsör"
        :message="[
          '• Filmerna går inte att klicka eller zappa bort.',
          '• Du möter folk i en av vardagens få pauser, - i kön till kassan.',
          '• Hög visningsfrekvens, - från 140 visningar per dag/butik.',
          '• Enkelt att köpa, enkelt att variera ditt budskap.',
          '• Köp lokalt på din ort, regionalt eller rikstäckande.',
        ]"
        link=""
      ></IconBlob>

      <IconBlob
        icon="emojione-v1:bull-horn"
        icon-color="#ac67a6"
        title="200 butiker"
        message="Vi har digitala skärmar i kassalinjen på ca 200 livsmedelsbutiker i Sverige. Här kan du nå ut med ditt budskap med hög visningsfrekvens till dina kunder under en vecka, månad eller kampanjvis under året, allt efter behov. Dessutom i en av vardagens få pauser, - i kön till kassan!"
        link=""
      ></IconBlob>
    </div>

    <MarketingChannels></MarketingChannels>
  </div>
</template>

<script>
export default {
  name: "ButiksTv",
};
</script>
