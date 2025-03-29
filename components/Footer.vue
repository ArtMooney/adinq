<script setup>
import { HeartIcon } from "@heroicons/vue/24/solid";
import imageLogo from "assets/images/sakra-logo.png";
</script>

<template>
  <div class="relative m-6 flex flex-col items-center">
    <router-link to="/">
      <img
        :src="imageLogo"
        alt="footer logo"
        class="relative mr-2 mb-4 h-auto w-32"
      />
    </router-link>

    <div class="flex items-center gap-4">
      <router-link
        to="/"
        class="pt-0.5 hover:underline"
        :class="[currentPath === '/' && 'border-t-3 border-t-[#ffc000]']"
        >Hem
      </router-link>
      <router-link
        to="/tjanster"
        class="pt-0.5 hover:underline"
        :class="[
          currentPath === '/tjanster' && 'border-t-3 border-t-[#ffc000]',
        ]"
        >Tjänster
      </router-link>
      <router-link
        to="/kontakta-oss"
        class="pt-0.5 hover:underline"
        :class="[
          currentPath === '/kontakta-oss' && 'border-t-3 border-t-[#ffc000]',
        ]"
        >Kontakta oss
      </router-link>
    </div>

    <p
      class="bottom-3 col-span-1 mt-10 flex max-w-xl flex-wrap justify-center text-center text-xs leading-5 opacity-40 md:col-span-3 lg:max-w-none"
    >
      <span>Säkra besiktningar Sverige AB</span>
      <span class="px-3 opacity-35">|</span>
      <span>Varlabergsvägen 29</span>
      <span class="px-3 opacity-35">|</span>
      <span>434 39 Kungsbacka</span>
      <span class="px-3 opacity-35">|</span>
      <a class="underline hover:opacity-50" href="tel:0760-05 75 15"
        >Tel. 0760-05 75 15</a
      >
      <span class="px-3 opacity-35">|</span>
      <a
        class="underline hover:opacity-50"
        href="mailto:info@sakrabesiktningar.se"
        >E-post: info@sakrabesiktningar.se</a
      >
    </p>

    <div class="my-4 w-1/3 border-t border-gray-300"></div>

    <a
      class="bottom-3 col-span-1 flex text-xs opacity-20 hover:text-black/75 md:col-span-3"
      href="https://www.framecore.se"
      target="_blank"
    >
      Powered by
      <span><HeartIcon class="h-4 w-4 px-0.5 text-red-600"></HeartIcon></span>
      FrameCore
    </a>
  </div>
</template>

<script>
export default {
  name: "Footer",

  computed: {
    currentPath() {
      return this.$route.path;
    },
  },
};
</script>
