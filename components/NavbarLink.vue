<script setup>
import {
  Bars2Icon,
  XMarkIcon,
  HomeIcon,
  FilmIcon,
  UserGroupIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  QuestionMarkCircleIcon,
  CurrencyEuroIcon,
} from "@heroicons/vue/24/outline";
</script>

<template>
  <div class="group relative flex cursor-pointer items-center gap-2">
    <component
      :is="getIcon"
      class="h-7 min-h-7 w-7 min-w-7 rounded-full bg-neutral-800 p-1 outline-2 outline-white/15"
    />
    <div
      class="absolute inset-0 z-[-1] h-7 min-h-7 w-7 min-w-7 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 blur-xl transition-opacity duration-300 ease-in-out group-hover:opacity-100"
      :class="[currentPath === '/' && 'opacity-100']"
    />

    <NuxtLink
      to="/"
      @click="showNavbar = false"
      class="opacity-80 transition-opacity duration-300 ease-in-out hover:opacity-100"
    >
      Hem
    </NuxtLink>
  </div>
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
  },

  computed: {
    getIcon() {
      switch (this.icon) {
        case "HomeIcon":
          return HomeIcon;
        case "computer":
          return ComputerDesktopIcon;
        case "video":
          return VideoCameraIcon;
        case "building":
          return BuildingOffice2Icon;
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
