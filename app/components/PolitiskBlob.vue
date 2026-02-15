<script setup>
const staticContentStore = useStaticContentStore();
const staticContent = computed(
  () =>
    staticContentStore.getContentByTitle("component - PolitiskBlob").content,
);
</script>

<template>
  <div
    class="group relative min-h-52 cursor-pointer rounded border border-white/25"
  >
    <div
      class="absolute inset-0 z-0 transform-gpu rounded-xl bg-linear-to-r from-red-400 to-red-800 opacity-0 blur-xl transition-opacity duration-300 ease-in-out group-hover:opacity-60"
    ></div>

    <div
      class="relative flex h-full w-full flex-col gap-4 rounded bg-neutral-900 p-4 pb-12 sm:p-8"
    >
      <div v-for="i in 8" :key="i">
        <p class="font-bold text-neutral-400">
          {{ staticContent[`rad${i}`] }}:
        </p>

        <p class="break-all">
          {{ i === 1 ? reklam.title : reklam[`rad${i}`] }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PolitiskBlob",

  props: {
    reklam: {
      type: Object,
      required: true,
    },
  },
};
</script>
