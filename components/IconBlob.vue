<script setup>
import {
  TvIcon,
  ComputerDesktopIcon,
  VideoCameraIcon,
  BuildingOffice2Icon,
} from "@heroicons/vue/24/outline";
</script>

<template>
  <a
    class="group relative min-h-52 cursor-pointer rounded border border-white/25 bg-neutral-900 p-8 pb-12"
    :href="link"
  >
    <div
      class="absolute inset-0 z-[-1] rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 blur-xl transition-opacity duration-300 ease-in-out group-hover:opacity-50"
    ></div>
    <component
      v-if="getIcon"
      :is="getIcon"
      class="relative mb-3 h-10 w-10 text-zinc-500"
    />
    <div class="relative mb-6 h-[1px] w-2/3 bg-white/25"></div>
    <p v-if="message" class="relative">
      {{ message }}
    </p>
  </a>
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
    link: {
      type: String,
      required: false,
    },
  },

  computed: {
    getIcon() {
      switch (this.icon) {
        case "tv":
          return TvIcon;
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
  },
};
</script>
