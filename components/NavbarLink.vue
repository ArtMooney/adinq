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
    class="group relative flex cursor-pointer items-center gap-2"
  >
    <component
      :is="getIcon"
      class="h-7 min-h-7 w-7 min-w-7 rounded-full bg-neutral-800 p-1 outline-2 outline-white/15"
    />
    <div
      class="absolute inset-0 z-[-1] h-7 min-h-7 w-7 min-w-7 rounded-full bg-gradient-to-r from-blue-500 to-green-500 opacity-0 blur-xl brightness-150 contrast-150 transition-all duration-300 ease-in-out group-hover:opacity-100"
      :class="[
        currentPath === route &&
          'bg-gradient-to-r from-pink-500 to-purple-500 opacity-75',
      ]"
    />
    <div
      class="whitespace-nowrap opacity-80 transition-opacity duration-300 ease-in-out hover:opacity-100"
    >
      {{ text }}
    </div>
  </NuxtLink>
</template>

<script>
export default {
  name: "IconBlob",

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
