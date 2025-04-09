<script setup>
import Button from "./elements/Button.vue";
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
  <div
    id="navbar"
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

      <div class="group relative flex cursor-pointer items-center gap-2">
        <HomeIcon
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

      <div class="group relative flex cursor-pointer items-center gap-2">
        <FilmIcon
          class="h-7 min-h-7 w-7 min-w-7 rounded-full bg-neutral-800 p-1 outline-2 outline-white/15"
        />
        <div
          class="absolute inset-0 z-[-1] h-7 min-h-7 w-7 min-w-7 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 blur-xl transition-opacity duration-300 ease-in-out group-hover:opacity-100"
          :class="[currentPath === '/media-produktion' && 'opacity-100']"
        />

        <NuxtLink
          to="/media-produktion"
          @click="showNavbar = false"
          class="opacity-80 transition-opacity duration-300 ease-in-out hover:opacity-100"
          >Mediaproduktion
        </NuxtLink>
      </div>

      <div class="group relative flex cursor-pointer items-center gap-2">
        <UserGroupIcon
          class="h-7 min-h-7 w-7 min-w-7 rounded-full bg-neutral-800 p-1 outline-2 outline-white/15"
        />
        <div
          class="absolute inset-0 z-[-1] h-7 min-h-7 w-7 min-w-7 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 blur-xl transition-opacity duration-300 ease-in-out group-hover:opacity-100"
          :class="[currentPath === '/medarbetare' && 'opacity-100']"
        />

        <NuxtLink
          to="/medarbetare"
          @click="showNavbar = false"
          class="opacity-80 transition-opacity duration-300 ease-in-out hover:opacity-100"
          >Medarbetare
        </NuxtLink>
      </div>

      <div class="group relative flex cursor-pointer items-center gap-2">
        <ChatBubbleOvalLeftEllipsisIcon
          class="h-7 min-h-7 w-7 min-w-7 rounded-full bg-neutral-800 p-1 outline-2 outline-white/15"
        />
        <div
          class="absolute inset-0 z-[-1] h-7 min-h-7 w-7 min-w-7 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 blur-xl transition-opacity duration-300 ease-in-out group-hover:opacity-100"
          :class="[currentPath === '/kundutlatanden' && 'opacity-100']"
        />

        <NuxtLink
          to="/kundutlatanden"
          @click="showNavbar = false"
          class="opacity-80 transition-opacity duration-300 ease-in-out hover:opacity-100"
          >Kundutlåtanden
        </NuxtLink>
      </div>

      <div class="group relative flex cursor-pointer items-center gap-2">
        <QuestionMarkCircleIcon
          class="h-7 min-h-7 w-7 min-w-7 rounded-full bg-neutral-800 p-1 outline-2 outline-white/15"
        />
        <div
          class="absolute inset-0 z-[-1] h-7 min-h-7 w-7 min-w-7 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 blur-xl transition-opacity duration-300 ease-in-out group-hover:opacity-100"
          :class="[currentPath === '/varfor-oss' && 'opacity-100']"
        />

        <NuxtLink
          to="/varfor-oss"
          @click="showNavbar = false"
          class="whitespace-nowrap opacity-80 transition-opacity duration-300 ease-in-out hover:opacity-100"
          >Varför oss
        </NuxtLink>
      </div>

      <div class="group relative flex cursor-pointer items-center gap-2">
        <CurrencyEuroIcon
          class="h-7 min-h-7 w-7 min-w-7 rounded-full bg-neutral-800 p-1 outline-2 outline-white/15"
        />
        <div
          class="absolute inset-0 z-[-1] h-7 min-h-7 w-7 min-w-7 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 blur-xl transition-opacity duration-300 ease-in-out group-hover:opacity-100"
          :class="[currentPath === '/priser' && 'opacity-100']"
        />

        <NuxtLink
          to="/priser"
          @click="showNavbar = false"
          class="opacity-80 transition-opacity duration-300 ease-in-out hover:opacity-100"
          >Priser
        </NuxtLink>
      </div>

      <Button
        @click="showNavbar = false"
        text="Kontakta oss"
        link="/kontakta-oss"
        type="button"
        styling="light"
        class="w-full opacity-90 transition-opacity duration-300 ease-in-out hover:opacity-100"
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
