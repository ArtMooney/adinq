<template>
  <a
    :href="link"
    class="flex flex-col items-center p-4 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all duration-200"
  >
    <component :is="iconComponent" class="h-8 w-8 mb-2 text-white" />
    <span class="text-white text-sm font-medium">{{ text }}</span>
  </a>
</template>

<script>
import { Tv, Monitor, Eye, Building } from "lucide-vue-next";

export default {
  components: { Tv, Monitor, Eye, Building },
  props: {
    icon: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  computed: {
    iconComponent() {
      const icons = {
        tv: Tv,
        monitor: Monitor,
        eye: Eye,
        building: Building,
      };
      return icons[this.icon];
    },
  },
};
</script>