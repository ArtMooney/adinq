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
        src="geranimo-OomNPPv1Rpk-unsplash.jpg"
        alt=""
        class="h-full w-full object-cover"
        sizes="1000px md:2000px"
        width="3992"
        height="2992"
        densities="x1"
        format="webp"
      />

      <div class="absolute inset-0 bg-[#294143]/40"></div>

      <div
        class="absolute inset-0 flex flex-col items-center justify-center text-center"
      >
        <h1 class="mx-10 mb-8 md:mx-30">
          Sök bland våra många marknadsplatser över hela Sverige!
        </h1>

        <div class="px-8 text-lg lg:text-2xl">
          Navigera i kartan nedan med mus, touchpad eller på mobilen!
        </div>

        <NuxtLink
          :to="{ path: '/marknadsplatskarta', hash: '#info' }"
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

  <div id="info" class="my-20">
    <MarketplaceMap />

    <MarketingChannels></MarketingChannels>
  </div>
</template>

<script>
export default {
  name: "Marknadsplatskarta",
};
</script>
