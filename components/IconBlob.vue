<template>
  <NuxtLink
    :to="link"
    class="group relative min-h-52 cursor-pointer rounded border border-white/25"
  >
    <div
      class="absolute inset-0 z-0 transform-gpu rounded-xl bg-gradient-to-r from-red-400 to-red-800 opacity-0 blur-xl transition-opacity duration-300 ease-in-out group-hover:opacity-60"
    ></div>

    <div class="relative h-full w-full rounded bg-neutral-900 p-4 pb-12 sm:p-8">
      <Icon
        v-if="icon"
        :name="icon"
        class="relative mb-3 h-10 max-h-10 min-h-10 w-10 max-w-10 min-w-10 text-zinc-500"
        :style="{ color: iconColor }"
      ></Icon>

      <div class="mb-6 h-[1px] w-2/3 bg-white/25"></div>

      <h6 v-if="title" class="mb-3">{{ title }}</h6>

      <ul v-if="message" class="flex flex-col">
        <li v-if="typeof message === 'string'">
          {{ message }}
        </li>

        <li v-if="Array.isArray(message)" v-for="line in message">
          {{ line || "\u00A0" }}
        </li>
      </ul>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  name: "IconBlob",

  props: {
    title: {
      type: String,
      required: false,
    },
    message: {
      type: [String, Array],
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
