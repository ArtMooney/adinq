<template>
  <NuxtLink
    :to="link"
    class="group relative min-h-52 cursor-pointer rounded border border-white/25 shadow-2xl"
  >
    <div
      class="absolute inset-0 z-0 transform-gpu rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 blur-xl transition-opacity duration-300 ease-in-out group-hover:opacity-25"
    ></div>

    <div
      class="relative h-full w-full rounded bg-[#2c3645]/75 p-8 pb-12 backdrop-blur-xs"
    >
      <NuxtImg
        :src="logo.url"
        class="relative mt-2 mb-6 h-14 max-h-14 min-h-14"
      ></NuxtImg>

      <Icon
        name="fluent:comment-quote-20-regular"
        class="absolute -top-6 -right-4 h-20 max-h-20 min-h-20 w-20 max-w-20 min-w-20"
        style="color: #6293a5"
      ></Icon>

      <div class="mb-6 h-[1px] w-2/3 bg-white/25"></div>

      <p v-if="message">
        {{ message }}
      </p>

      <p class="mt-8 text-lg">{{ att }}</p>
      <p class="italic">{{ client }}</p>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  name: "TestimonialBlob",

  props: {
    message: {
      type: String,
      required: false,
    },
    logo: {
      type: Object,
      required: false,
    },
    att: {
      type: String,
      required: false,
    },
    client: {
      type: String,
      required: false,
    },
    link: {
      type: String,
      required: false,
      default: "",
    },
  },
};
</script>
