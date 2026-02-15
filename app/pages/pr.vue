<script setup>
const config = useRuntimeConfig();
const staticContentStore = useStaticContentStore();
const staticContent = computed(
  () => staticContentStore.getContentByTitle("page - PolitiskReklam").content,
);

useNoIndexSeo("Politisk reklam");

definePageMeta({
  ssr: true,
});

const { data: reklam, error } = await useFetch("/api/politisk-reklam", {
  method: "GET",
  headers: {
    Authorization:
      "Basic " + btoa(config.public.userName + ":" + config.public.userPass),
  },
  default: () => [],
});
</script>

<template>
  <div
    class="flex h-full w-full grow flex-col items-center justify-center px-8"
  >
    <h3 id="services" class="mt-32 text-center">
      {{ staticContent.header.title }}
    </h3>

    <p
      class="mb-12 text-center sm:px-16 md:px-32"
      v-html="formatText(staticContent.header.text)"
    ></p>

    <div class="relative mb-32 grid w-full gap-8 p-4 sm:p-8">
      <NuxtImg
        src="background-bricks-flowers.jpg"
        alt=""
        class="absolute inset-0 h-full w-full object-cover opacity-15"
        sizes="500px sm:640px md:768px lg:1024px xl:1280px 2xl:1536px"
        width="2003"
        height="3000"
        format="webp"
      />

      <PolitiskBlob v-for="item in reklam" :reklam="item"></PolitiskBlob>
    </div>
  </div>
</template>

<script>
export default {
  name: "PolitiskReklam",
};
</script>
