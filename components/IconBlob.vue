<template>
  <NuxtLink
    :to="link"
    class="group relative min-h-52 cursor-pointer rounded border border-white/25"
  >
    <div
      class="absolute inset-0 z-0 transform-gpu rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 blur-xl transition-opacity duration-300 ease-in-out group-hover:opacity-50"
    ></div>

    <div class="relative h-full w-full rounded bg-neutral-900 p-8 pb-12">
      <Icon
        v-if="icon"
        :name="icon"
        class="relative mb-3 h-10 max-h-10 min-h-10 w-10 max-w-10 min-w-10 text-zinc-500"
        :style="{ color: iconColor }"
      ></Icon>

      <div class="mb-6 h-[1px] w-2/3 bg-white/25"></div>

      <p v-if="message">
        {{ message }}
      </p>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  name: "IconBlob",

  props: {
    message: {
      type: String,
      required: false,
    },
    icon: {
      type: String,
      required: false,
    },
    iconColor: {
      type: String,
      required: false,
    },
    link: {
      type: String,
      required: false,
    },
  },
};
</script>
