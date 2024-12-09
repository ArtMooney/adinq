<script setup>
import House from "../assets/House.vue";
import Star from "../assets/Star.vue";
import Heart from "../assets/Heart.vue";
import ArrowUp from "../assets/ArrowUp.vue";
</script>

<template>
  <div
    class="relative mb-8 mt-4 grid grid-cols-1 gap-4 bg-footer-gradient py-20"
  >
    <a
      class="w-32 justify-self-center pb-4 duration-500 ease-in-out hover:scale-[1.02] md:w-44"
      href="/"
    >
      <img src="../assets/Framecore-light-gray.svg" alt="" />
    </a>
    <div class="flex flex-col items-center justify-self-center">
      <router-link
        class="mb-3 text-neutral-400 no-underline hover:text-neutral-300"
        :to="{ path: '/', hash: '#services' }"
      >
        Tjänster
      </router-link>
      <a
        class="mb-3 text-neutral-400 no-underline hover:text-neutral-300"
        href="/case"
        >Kunder & Case</a
      >
      <a
        class="mb-3 text-neutral-400 no-underline hover:text-neutral-300"
        href="/contact"
        >Kontakta oss</a
      >
    </div>
    <div
      class="mb-8 mt-4 h-0.5 w-2/3 justify-self-center bg-neutral-500/75"
    ></div>
    <div
      class="grid grid-flow-col justify-start gap-1 justify-self-center duration-500 ease-in-out hover:gap-3"
    >
      <router-link
        to="/"
        class="h-5 w-5 text-neutral-400 duration-500 ease-in-out hover:text-neutral-300"
      >
        <House />
      </router-link>

      <div class="group">
        <Star
          class="h-5 w-5 text-neutral-400 duration-500 ease-in-out hover:text-neutral-300"
        />
        <div
          class="absolute bottom-7 left-auto right-auto top-auto -ml-12 hidden rounded bg-black/55 px-3 py-1.5 text-sm opacity-0 duration-300 ease-in-out group-hover:ml-0 group-hover:opacity-100 md:flex"
        >
          You are amazing!
        </div>
      </div>

      <div class="group">
        <Heart
          class="h-5 w-5 text-neutral-400 duration-500 ease-in-out hover:text-neutral-300"
        />
        <div
          class="absolute bottom-7 left-auto right-auto top-auto -ml-12 hidden items-center rounded bg-black/55 px-3 py-1.5 text-sm opacity-0 duration-300 ease-in-out group-hover:ml-0 group-hover:opacity-100 md:flex"
        >
          This website was made with
          <Heart class="mx-1 h-4 w-5 text-red-500" />
          by FrameCore 2024
        </div>
      </div>

      <router-link
        class="h-4 w-4 text-neutral-400 duration-500 ease-in-out hover:text-neutral-300"
        :to="{ hash: '#navbar' }"
      >
        <ArrowUp />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>
