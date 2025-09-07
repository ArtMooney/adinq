<script setup>
import IconQlementineIconsChevronDoubleDown16 from "~icons/qlementine-icons/chevron-double-down-16";

useSeoMeta({
  title: "Priser för DOOH & Butiks-TV reklam | Kostnader & prisexempel",
  description:
    "Se prisexempel för DOOH och butiks-TV reklam. Priser varierar beroende på täckning och sändningstid. Transparenta kostnader för storbildsskärmar och digital utomhusreklam.",
  ogTitle: "Priser för DOOH & Butiks-TV reklam",
  ogDescription:
    "Se prisexempel för DOOH och butiks-TV reklam. Transparenta kostnader för digital utomhusreklam.",
  ogImage: "https://www.adinq.se/priser-handslag.jpg",
  twitterCard: "summary_large_image",
  twitterTitle: "Priser för DOOH & Butiks-TV reklam",
  twitterDescription:
    "Se prisexempel för DOOH och butiks-TV reklam. Transparenta kostnader för digital utomhusreklam.",
  twitterImage: "https://www.adinq.se/priser-handslag.jpg",
});

definePageMeta({
  ssr: true,
});

const config = useRuntimeConfig();

const { data: prices, error } = await useFetch("/api/prices", {
  method: "GET",
  headers: {
    Authorization:
      "Basic " + btoa(config.public.userName + ":" + config.public.userPass),
  },
  default: () => [],
});
</script>

<template>
  <Heading>
    <template #heading-content>
      <NuxtImg
        src="priser-handslag.jpg"
        alt=""
        class="h-full w-full object-cover"
        sizes="1000px md:2000px"
        width="7360"
        height="4912"
        densities="x1"
        format="webp"
      />

      <div class="absolute inset-0 bg-[#2f3f4d]/50"></div>

      <div
        class="absolute inset-0 flex flex-col items-center justify-center text-center"
      >
        <h1 class="mx-10 mb-8 md:mx-30">Priser</h1>

        <NuxtLink
          :to="{ path: '/priser', hash: '#priser' }"
          class="absolute bottom-8 flex w-full items-center justify-center"
        >
          <IconQlementineIconsChevronDoubleDown16
            class="h-12 min-h-12 w-12 min-w-12 cursor-pointer opacity-70 hover:opacity-100"
          ></IconQlementineIconsChevronDoubleDown16>
        </NuxtLink>
      </div>
    </template>
  </Heading>

  <div id="priser" class="mx-4 my-32 flex flex-col gap-8 sm:mx-8">
    <div
      class="mx-auto flex w-full flex-col items-center justify-center gap-8 text-center sm:max-w-lg lg:max-w-4xl"
    >
      <h3 class="text-center">Prisexempel</h3>

      <p>
        Priserna varierar beroende på flera faktorer såsom täckning och
        sändningstid så vi tillhandahåller endast några förslag för att ge
        exempel på vilka kostnadsnivåer ni kan förvänta er.
      </p>
    </div>

    <div
      class="relative mt-32 grid gap-8 px-4 py-8 sm:px-8 lg:grid-cols-2 xl:grid-cols-3"
    >
      <NuxtImg
        src="background-bricks-flowers.jpg"
        alt=""
        class="absolute inset-0 h-full w-full object-cover opacity-15"
        sizes="1000px md:2000px"
        width="2483"
        height="3718"
        format="webp"
      />

      <PriceBlob
        v-for="price in prices.slice(0, 3)"
        :key="price.id"
        :data="price"
      ></PriceBlob>

      <p
        v-if="prices.length < 1"
        class="my-12 text-center lg:col-span-2 xl:col-span-3"
      >
        Det finns inga prisexempel att visa för tillfället.
      </p>
    </div>

    <div
      v-if="prices.length > 3"
      class="relative mt-32 grid gap-8 px-4 py-8 sm:px-8 lg:grid-cols-2 xl:grid-cols-3"
    >
      <h3 class="my-12 text-center lg:col-span-2 xl:col-span-3">
        Fler prisexempel
      </h3>

      <NuxtImg
        src="background-bricks-flowers.jpg"
        alt=""
        class="absolute inset-0 h-full w-full object-cover opacity-15"
        sizes="1000px md:2000px"
        width="2483"
        height="3718"
        format="webp"
      />

      <PriceBlob
        v-for="price in prices.slice(3)"
        :key="price.id"
        :data="price"
      ></PriceBlob>
    </div>

    <MarketingChannels></MarketingChannels>
  </div>
</template>

<script>
export default {
  name: "Priser",
};
</script>
