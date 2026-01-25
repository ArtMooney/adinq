<script setup>
useSimpleSeo(
  "404 - Sidan hittades inte",
  "Sidan du letar efter kunde inte hittas",
);

const props = defineProps({
  error: Object,
});

const handleError = () => {
  clearError({ redirect: "/" });
};
</script>

<template>
  <div class="flex grow flex-col items-center justify-center gap-4 py-16">
    <h1 class="text-6xl font-bold">{{ error?.statusCode || "404" }}</h1>
    <p>
      {{ error?.statusMessage || "Sidan du letar efter kunde inte hittas" }}
    </p>
    <button
      @click="handleError"
      class="mt-4 cursor-pointer rounded px-4 py-2 text-sm text-white underline"
    >
      Tillbaka till startsidan
    </button>
  </div>
</template>
