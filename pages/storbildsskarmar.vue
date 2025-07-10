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
        <h1 class="mx-10 mb-8 md:mx-30">
          Tydlig och bra marknadsföring med Storbildsskärmar!
        </h1>

        <NuxtLink
          :to="{ path: '/storbildsskarmar', hash: '#info' }"
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
    <div class="relative grid items-center gap-8 p-4 sm:p-8 lg:grid-cols-3">
      <NuxtImg
        src="angele-kamp--OQbUQce54k-unsplash.jpg"
        alt=""
        class="absolute inset-0 h-full w-full object-cover opacity-10"
        sizes="1000px md:2000px"
        width="3456"
        height="5184"
        format="webp"
      />

      <IconBlob
        icon="streamline-ultimate-color:saving-money-flower"
        icon-color="#e09963"
        message="Att synas på Storbildsskärm är ett fantastiskt bra sätt att synas där människor finns! Ett stort antal passerande människor kombinerat med ett medie som är stort, tydligt och som inte är påtvingande är ett vinnande recept. Vi kan erbjuda er att synas på flera olika orter i Sverige. Vår produktionsavdelning kan även hjälpa er att producera era egna slides som sen kan visas på Storbildsskärmarna."
        link=""
        class="relative lg:col-span-2"
      ></IconBlob>

      <NuxtImg
        src="vertical-billboard-9083310.jpg"
        alt=""
        sizes="1000px md:2000px"
        width="3968"
        height="4800"
        format="webp"
        class="relative"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Storbildsskarmar",
};
</script>
