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
} from "@heroicons/vue/24/solid";
</script>

<template>
  <div
    id="navbar"
    class="relative z-10 flex items-center justify-between bg-neutral-900 p-4 py-2"
  >
    <router-link to="/">
      <NuxtImg
        src="adinq_vit.svg"
        alt="company logo"
        class="h-auto w-24 p-1 md:w-32 md:p-2"
      />
    </router-link>

    <Bars2Icon
      @click="showNavbar = !showNavbar"
      class="block h-8 w-8 cursor-pointer md:hidden"
    />

    <div
      class="fixed top-0 right-0 bottom-0 left-0 flex flex-col items-center justify-center gap-5 p-4 pb-10 text-center md:static md:flex-row md:bg-transparent md:p-0"
      :class="showNavbar ? 'absolute md:flex' : 'hidden md:flex'"
    >
      <XMarkIcon
        v-if="showNavbar"
        @click="showNavbar = !showNavbar"
        class="absolute top-4 right-4 h-8 w-8 cursor-pointer"
      />

      <div class="flex items-center gap-2">
        <HomeIcon
          class="h-7 min-h-7 w-7 min-w-7 rounded-full p-1.5 outline-2 outline-white/25"
        />
        <NuxtLink
          to="/"
          @click="showNavbar = false"
          class="hover:underline"
          :class="[currentPath === '/' && 'border-t-3 border-t-[#ffc000]']"
        >
          Hem
        </NuxtLink>
      </div>

      <div class="flex items-center gap-2">
        <FilmIcon
          class="h-7 min-h-7 w-7 min-w-7 rounded-full p-1.5 outline-2 outline-white/25"
        />
        <NuxtLink
          to="/tjanster"
          @click="showNavbar = false"
          class="hover:underline"
          :class="[
            currentPath === '/tjanster' && 'border-t-3 border-t-[#ffc000]',
          ]"
          >Mediaproduktion
        </NuxtLink>
      </div>

      <div class="flex items-center gap-2">
        <UserGroupIcon
          class="h-7 min-h-7 w-7 min-w-7 rounded-full p-1.5 outline-2 outline-white/25"
        />
        <NuxtLink
          to="/tjanster"
          @click="showNavbar = false"
          class="hover:underline"
          :class="[
            currentPath === '/tjanster' && 'border-t-3 border-t-[#ffc000]',
          ]"
          >Medarbetare
        </NuxtLink>
      </div>

      <div class="flex items-center gap-2">
        <ChatBubbleOvalLeftEllipsisIcon
          class="h-7 min-h-7 w-7 min-w-7 rounded-full p-1.5 outline-2 outline-white/25"
        />
        <NuxtLink
          to="/tjanster"
          @click="showNavbar = false"
          class="hover:underline"
          :class="[
            currentPath === '/tjanster' && 'border-t-3 border-t-[#ffc000]',
          ]"
          >Kundutlåtanden
        </NuxtLink>
      </div>

      <div class="flex items-center gap-2">
        <QuestionMarkCircleIcon
          class="h-7 min-h-7 w-7 min-w-7 rounded-full p-1.5 outline-2 outline-white/25"
        />
        <NuxtLink
          to="/tjanster"
          @click="showNavbar = false"
          class="whitespace-nowrap hover:underline"
          :class="[
            currentPath === '/tjanster' && 'border-t-3 border-t-[#ffc000]',
          ]"
          >Varför oss
        </NuxtLink>
      </div>

      <div class="flex items-center gap-2">
        <CurrencyEuroIcon
          class="h-7 min-h-7 w-7 min-w-7 rounded-full p-1.5 outline-2 outline-white/25"
        />
        <NuxtLink
          to="/tjanster"
          @click="showNavbar = false"
          class="hover:underline"
          :class="[
            currentPath === '/tjanster' && 'border-t-3 border-t-[#ffc000]',
          ]"
          >Priser
        </NuxtLink>
      </div>

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
