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
  <div class="relative mx-[calc(-50vw+50%)] h-full w-screen grow">
    <ClientOnly>
      <video
        autoplay
        loop
        muted
        disablepictureinpicture
        playsinline
        preload="auto"
        class="absolute h-full w-full object-cover"
      >
        <source src="../assets/videos/folkmassa.mp4" type="video/mp4" />
      </video>
      <div class="absolute inset-0 bg-black/40"></div>

      <div
        class="absolute inset-0 flex flex-col items-center justify-center bg-gray-800/50"
      >
        <h1 class="mb-8 text-7xl">Vi hjälper er att nå ut digitalt!</h1>
        <div class="text-2xl">
          Lokalt, regionalt eller rikstäckande - just DOOH* it!
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script>
export default {
  name: "Index",
};
</script>
