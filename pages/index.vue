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
  <div class="relative h-full w-full grow">
    <ClientOnly>
      <video
        controls
        autoplay
        class="absolute h-full w-full scale-104 transform-gpu object-cover blur-sm"
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
