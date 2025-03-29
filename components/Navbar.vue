<script setup>
import Button from "./elements/Button.vue";
import imageLogo from "assets/images/sakra-logo.png";
import { Bars2Icon, XMarkIcon } from "@heroicons/vue/24/solid";
</script>

<template>
  <div
    id="navbar"
    class="relative z-10 flex items-center justify-between bg-white p-4 py-2"
  >
    <router-link to="/">
      <img
        :src="imageLogo"
        alt="navbar logo"
        class="h-auto w-24 p-1 md:w-32 md:p-2"
      />
    </router-link>

    <Bars2Icon
      @click="showNavbar = !showNavbar"
      class="block h-8 w-8 cursor-pointer md:hidden"
    />

    <div
      class="fixed top-0 right-0 bottom-0 left-0 flex flex-col items-center justify-center gap-5 bg-white p-4 pb-10 text-center md:static md:flex-row md:bg-transparent md:p-0"
      :class="showNavbar ? 'absolute md:flex' : 'hidden md:flex'"
    >
      <XMarkIcon
        v-if="showNavbar"
        @click="showNavbar = !showNavbar"
        class="absolute top-4 right-4 h-8 w-8 cursor-pointer"
      />

      <NuxtLink
        to="/"
        @click="showNavbar = false"
        class="hover:underline"
        :class="[currentPath === '/' && 'border-t-3 border-t-[#ffc000]']"
      >
        Hem
      </NuxtLink>
      <NuxtLink
        to="/tjanster"
        @click="showNavbar = false"
        class="hover:underline"
        :class="[
          currentPath === '/tjanster' && 'border-t-3 border-t-[#ffc000]',
        ]"
        >Tjänster
      </NuxtLink>
      <Button
        @click="showNavbar = false"
        text="Kontakta oss"
        link="/kontakta-oss"
        type="button"
        class="w-full"
        :class="[
          currentPath === '/kontakta-oss' && 'border-t-3 border-t-[#ffc000]',
        ]"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",

  data() {
    return {
      showNavbar: false,
    };
  },

  computed: {
    currentPath() {
      return this.$route.path;
    },
  },
};
</script>
