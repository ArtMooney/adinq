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
      class="relative flex h-full w-full flex-col gap-2 rounded bg-neutral-900 p-4 pb-12 sm:p-8"
    >
      <p>
        <span class="mr-1 font-bold text-neutral-400"
          >{{ staticContent.rad1 }}:</span
        >
        {{ reklam.title }}
      </p>
      <p>
        <span class="mr-1 font-bold text-neutral-400"
          >{{ staticContent.rad2 }}:</span
        >
        {{ reklam.rad2 }}
      </p>
      <p>
        <span class="mr-1 font-bold text-neutral-400"
          >{{ staticContent.rad3 }}:</span
        >
        {{ reklam.rad3 }}
      </p>
      <p>
        <span class="mr-1 font-bold text-neutral-400"
          >{{ staticContent.rad4 }}:</span
        >
        {{ reklam.rad4 }}
      </p>
      <p>
        <span class="mr-1 font-bold text-neutral-400"
          >{{ staticContent.rad5 }}:</span
        >
        {{ reklam.rad5 }}
      </p>
      <p>
        <span class="mr-1 font-bold text-neutral-400"
          >{{ staticContent.rad6 }}:</span
        >
        {{ reklam.rad6 }}
      </p>
      <p>
        <span class="mr-1 font-bold text-neutral-400"
          >{{ staticContent.rad7 }}:</span
        >
        {{ reklam.rad7 }}
      </p>
      <p>
        <span class="mr-1 font-bold text-neutral-400"
          >{{ staticContent.rad8 }}:</span
        >
        {{ reklam.rad8 }}
      </p>
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
