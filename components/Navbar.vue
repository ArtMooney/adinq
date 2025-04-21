<script setup>
import Button from "./elements/Button.vue";
import { Bars2Icon, XMarkIcon } from "@heroicons/vue/24/outline";
</script>

<template>
  <div
    id="navbar"
    ref="navbar"
    class="relative z-10 mx-[calc(-50vw+50%)] w-screen bg-neutral-950"
  >
    <div
      class="mx-auto flex w-full max-w-screen-2xl items-center justify-between p-4 py-2"
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

      <!--      <div-->
      <!--        class="fixed top-0 right-0 bottom-0 left-auto flex flex-col items-end justify-start gap-5 px-8 pt-24 pb-10 text-center transition-all duration-1000 ease-in-out xl:static xl:flex-row xl:items-center xl:bg-transparent xl:p-0"-->
      <!--        :class="-->
      <!--          showNavbar-->
      <!--            ? 'absolute translate-x-0 bg-neutral-950 xl:flex'-->
      <!--            : 'absolute translate-x-100 xl:flex'-->
      <!--        "-->
      <!--      >-->

      <div
        class="fixed top-0 right-0 bottom-0 left-auto flex flex-col items-end justify-start gap-5 px-8 pt-24 pb-10 text-center xl:static xl:flex-row xl:items-center xl:bg-transparent xl:p-0"
        :class="
          showNavbar ? 'absolute bg-neutral-950 xl:flex' : 'hidden xl:flex'
        "
      >
        <XMarkIcon
          v-if="showNavbar"
          @click="showNavbar = !showNavbar"
          class="absolute top-4 right-4 h-8 w-8 cursor-pointer"
        />

        <NavbarLink
          icon="HomeIcon"
          text="Hem"
          route="/"
          :class="showNavbar && 'flex-row-reverse'"
        ></NavbarLink>

        <NavbarLink
          icon="FilmIcon"
          text="Mediaproduktion"
          route="/media-produktion"
          :class="showNavbar && 'flex-row-reverse'"
        ></NavbarLink>

        <NavbarLink
          icon="UserGroupIcon"
          text="Medarbetare"
          route="/medarbetare"
          :class="showNavbar && 'flex-row-reverse'"
        ></NavbarLink>

        <NavbarLink
          icon="ChatBubbleOvalLeftEllipsisIcon"
          text="Kundutlåtanden"
          route="/kundutlatanden"
          :class="showNavbar && 'flex-row-reverse'"
        ></NavbarLink>

        <NavbarLink
          icon="QuestionMarkCircleIcon"
          text="Varför oss"
          route="/varfor-oss"
          :class="showNavbar && 'flex-row-reverse'"
        ></NavbarLink>

        <NavbarLink
          icon="CurrencyEuroIcon"
          text="Priser"
          route="/priser"
          :class="showNavbar && 'flex-row-reverse'"
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
    window.addEventListener("resize", this.onResize);
    this.onResize();
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },

  methods: {
    onResize() {
      this.$emit("navbarHeight", this.$refs.navbar.offsetHeight);
    },
  },
};
</script>
