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
      <video controls autoplay class="absolute h-full w-full object-cover">
        <source src="../assets/videos/folkmassa.mp4" type="video/mp4" />
      </video>
    </ClientOnly>
  </div>
</template>

<script>
export default {
  name: "Index",
};
</script>
