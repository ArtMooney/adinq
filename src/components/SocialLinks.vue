<template>
  <div class="flex space-x-4">
    <a
      v-for="link in socialLinks"
      :key="link.url"
      :href="link.url"
      target="_blank"
      class="text-white hover:text-gray-300 transition-colors duration-200"
    >
      <component :is="link.icon" class="h-5 w-5" />
    </a>
  </div>
</template>

<script>
import { Facebook, Linkedin, Youtube } from "lucide-vue-next";

export default {
  components: { Facebook, Linkedin, Youtube },
  data() {
    return {
      socialLinks: [
        {
          url: "https://www.facebook.com/ADinQAB/?fref=ts",
          icon: Facebook,
        },
        {
          url: "https://www.linkedin.com/company/adinq-ab/?originalSubdomain=se",
          icon: Linkedin,
        },
        {
          url: "https://www.youtube.com/channel/UCnc_HP_7V8zWUTZBpGRdp2w/videos",
          icon: Youtube,
        },
      ],
    };
  },
};
</script>