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

      <div class="absolute inset-0 bg-red-950/40"></div>

      <div
        class="absolute inset-0 flex flex-col items-center justify-center text-center"
      >
        <h1 class="mx-10 mb-8 md:mx-30">
          Tydlig och bra marknadsföring med Storbildsskärmar!
        </h1>

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
        icon="streamline-ultimate-color:saving-money-flower"
        icon-color="#e09963"
        message="Att synas på Storbildsskärm är ett fantastiskt bra sätt att synas där människor finns! Ett stort antal passerande människor kombinerat med ett medie som är stort, tydligt och som inte är påtvingande är ett vinnande recept. Vi kan erbjuda er att synas på flera olika orter i Sverige. Vår produktionsavdelning kan även hjälpa er att producera era egna slides som sen kan visas på Storbildsskärmarna."
        link=""
      ></IconBlob>
    </div>
  </div>
</template>

<script>
export default {
  name: "Storbildsskarmar",
};
</script>
