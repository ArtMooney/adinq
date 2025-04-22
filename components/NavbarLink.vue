<script setup>
import {
  HomeIcon,
  FilmIcon,
  UserGroupIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  QuestionMarkCircleIcon,
  CurrencyEuroIcon,
} from "@heroicons/vue/24/outline";
</script>

<template>
  <NuxtLink
    :to="route"
    @click="showNavbar = false"
    class="group relative flex cursor-pointer flex-row-reverse items-center gap-2 xl:flex-row"
  >
    <div
      class="absolute inset-0 transform-gpu bg-gradient-to-r from-blue-500 to-green-500 opacity-0 blur-xl transition-opacity duration-300 ease-in-out group-hover:opacity-75"
      :class="[
        currentPath === route &&
          'bg-gradient-to-r from-pink-500 to-purple-500 opacity-50',
      ]"
    />

    <component
      :is="getIcon"
      class="relative h-7 min-h-7 w-7 min-w-7 rounded-full border-2 border-white/15 bg-neutral-800 p-1"
    />

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
    getIcon() {
      switch (this.icon) {
        case "HomeIcon":
          return HomeIcon;
        case "FilmIcon":
          return FilmIcon;
        case "UserGroupIcon":
          return UserGroupIcon;
        case "ChatBubbleOvalLeftEllipsisIcon":
          return ChatBubbleOvalLeftEllipsisIcon;
        case "QuestionMarkCircleIcon":
          return QuestionMarkCircleIcon;
        case "CurrencyEuroIcon":
          return CurrencyEuroIcon;
        default:
          return null;
      }
    },

    currentPath() {
      return this.$route.path;
    },
  },
};
</script>
