<template>
  <nav class="bg-black text-white py-4 fixed w-full z-50">
    <div class="container mx-auto px-4 flex justify-between items-center">
      <div class="flex items-center">
        <a href="/" class="mr-8">
          <img
            src="../assets/adinq_logo_vit.svg"
            alt="ADinQ logo"
            class="h-8"
          />
        </a>
      </div>
      <div class="hidden md:flex items-center space-x-6">
        <a
          v-for="link in menuLinks"
          :key="link.path"
          :href="link.path"
          class="hover:underline transition-colors duration-200"
        >
          {{ link.text }}
        </a>
      </div>
      <div class="flex items-center space-x-4">
        <SocialLinks />
        <button @click="toggleMobileMenu" class="md:hidden">
          <MenuIcon class="h-6 w-6" />
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { MenuIcon } from "lucide-vue-next";
import SocialLinks from "./SocialLinks.vue";

export default {
  components: { MenuIcon, SocialLinks },
  data() {
    return {
      menuLinks: [
        { text: "Marknadsföringskanaler", path: "/" },
        { text: "Mediaproduktion", path: "/media-produktion" },
        { text: "Dagens ADinQ", path: "/dagens-adinq" },
        { text: "Kundutlåtanden", path: "/kundutlatanden" },
        { text: "Varför oss", path: "/varfor-oss" },
        { text: "Priser", path: "/priser" },
        { text: "Kontakta oss", path: "/kontakt" },
      ],
    };
  },
  methods: {
    toggleMobileMenu() {
      this.$emit("toggle-menu");
    },
  },
};
</script>
