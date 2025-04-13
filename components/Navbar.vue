<script setup>
import Button from "./elements/Button.vue";
import { Bars2Icon, XMarkIcon } from "@heroicons/vue/24/outline";
</script>

<template>
  <div
    id="navbar"
    ref="navbar"
    class="relative z-10 flex items-center justify-between bg-neutral-800 p-4 py-2"
  >
    <router-link to="/">
      <NuxtImg
        src="adinq_vit.svg"
        alt="company logo"
        class="h-auto w-24 p-1 xl:w-32 xl:p-2"
      />
    </router-link>

    <Bars2Icon
      @click="showNavbar = !showNavbar"
      class="block h-8 w-8 cursor-pointer xl:hidden"
    />

    <div
      class="fixed top-0 right-0 bottom-0 left-0 flex flex-col items-center justify-center gap-5 p-4 pb-10 text-center xl:static xl:flex-row xl:bg-transparent xl:p-0"
      :class="showNavbar ? 'absolute xl:flex' : 'hidden xl:flex'"
    >
      <XMarkIcon
        v-if="showNavbar"
        @click="showNavbar = !showNavbar"
        class="absolute top-4 right-4 h-8 w-8 cursor-pointer"
      />

      <NavbarLink icon="HomeIcon" text="Hem" route="/"></NavbarLink>

      <NavbarLink
        icon="FilmIcon"
        text="Mediaproduktion"
        route="/media-produktion"
      ></NavbarLink>

      <NavbarLink
        icon="UserGroupIcon"
        text="Medarbetare"
        route="/medarbetare"
      ></NavbarLink>

      <NavbarLink
        icon="ChatBubbleOvalLeftEllipsisIcon"
        text="Kundutlåtanden"
        route="/kundutlatanden"
      ></NavbarLink>

      <NavbarLink
        icon="QuestionMarkCircleIcon"
        text="Varför oss"
        route="/varfor-oss"
      ></NavbarLink>

      <NavbarLink
        icon="CurrencyEuroIcon"
        text="Priser"
        route="/priser"
      ></NavbarLink>

      <div class="group relative">
        <Button
          @click="showNavbar = false"
          text="Kontakta oss"
          link="/kontakta-oss"
          type="button"
          styling="light"
          class="w-full opacity-90 transition-opacity duration-300 ease-in-out hover:opacity-100"
        />
        <div
          class="absolute inset-0 z-[-1] w-full rounded-full bg-gradient-to-r from-blue-500 to-green-500 opacity-0 blur-xl transition-all duration-300 ease-in-out group-hover:opacity-100"
          :class="[
            currentPath === '/kontakta-oss' &&
              'bg-gradient-to-r from-pink-500 to-purple-500 opacity-50',
          ]"
        />
      </div>
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

  mounted() {
    this.$emit("navbarHeight", this.$refs.navbar.offsetHeight);
  },
};
</script>
