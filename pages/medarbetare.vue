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
  <div class="relative mx-[calc(-50vw+50%)] w-screen">
    <NuxtImg
      src="teo-d-4op9_2Bt2Eg-unsplash.jpg"
      alt=""
      class="h-full w-full object-cover"
      sizes="1000px md:2000px"
      width="3456"
      height="5184"
      densities="x1"
    />

    <div class="absolute inset-0 bg-[#365e80]/70"></div>
  </div>

  <div class="mx-4 my-20 flex flex-col gap-8 sm:mx-8">HEJ</div>
</template>

<script>
export default {
  name: "Medarbetare",
};
</script>
