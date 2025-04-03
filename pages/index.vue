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
  <div class="relative ml-[calc(-50vw+50%)] h-full w-screen grow">
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
    </ClientOnly>
  </div>
</template>

<script>
export default {
  name: "Index",
};
</script>
