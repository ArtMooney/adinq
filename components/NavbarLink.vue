<template>
  <NuxtLink
    :to="route"
    @click="showNavbar = false"
    class="group relative flex cursor-pointer flex-row-reverse items-center gap-2 xl:flex-row"
  >
    <div
      class="absolute inset-0 transform-gpu bg-gradient-to-r from-red-400 to-red-800 opacity-0 blur-xl transition-opacity duration-300 ease-in-out group-hover:opacity-90"
      :class="[currentPath === route && 'opacity-60']"
    ></div>

    <div
      v-if="icon"
      class="relative flex h-7 min-h-7 w-7 min-w-7 items-center justify-center rounded-full border-2 border-white/15 bg-neutral-800 p-1"
    >
      <Icon :name="icon" class="h-full w-full" />
    </div>

    <div
      class="transform-gpu whitespace-nowrap opacity-80 transition-opacity duration-300 ease-in-out hover:opacity-100"
    >
      {{ text }}
    </div>
  </NuxtLink>
</template>

<script>
export default {
  name: "NavbarLink",

  props: {
    text: {
      type: String,
      required: false,
    },
    icon: {
      type: String,
      required: false,
    },
    route: {
      type: String,
      required: false,
      default: "/",
    },
  },

  computed: {
    currentPath() {
      return this.$route.path;
    },
  },
};
</script>
