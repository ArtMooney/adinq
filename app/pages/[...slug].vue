<script setup>
setResponseStatus(404);
useNoIndexSeo("404 - Sidan hittades inte");
</script>

<template>
  <div class="flex grow flex-col items-center justify-center gap-4 py-16">
    <h1 class="text-6xl font-bold">404</h1>
    <p>Sidan du letar efter kunde inte hittas</p>
    <NuxtLink
      to="/"
      class="mt-4 cursor-pointer rounded px-4 py-2 text-sm text-white underline"
    >
      Tillbaka till startsidan
    </NuxtLink>
  </div>
</template>
