<script setup>
import { HeartIcon } from "@heroicons/vue/24/solid";
</script>

<template>
  <div class="relative flex flex-col items-center bg-neutral-950 pt-20 pb-12">
    <router-link to="/">
      <NuxtImg
        src="adinq_vit.svg"
        alt="footer logo"
        class="relative mr-2 mb-12 h-auto w-32"
      />
    </router-link>

    <div class="flex flex-wrap items-center justify-center gap-4">
      <NavbarLink text="Hem" route="/"></NavbarLink>
      <NavbarLink text="Mediaproduktion" route="/media-produktion"></NavbarLink>
      <NavbarLink text="Medarbetare" route="/medarbetare"></NavbarLink>
      <NavbarLink text="Kundutlåtanden" route="/kundutlatanden"></NavbarLink>
      <NavbarLink text="Varför oss" route="/varfor-oss"></NavbarLink>
      <NavbarLink text="Priser" route="/priser"></NavbarLink>
      <NavbarLink text="Kontakta oss" route="/kontakta-oss"></NavbarLink>
    </div>

    <p
      class="bottom-3 col-span-1 mt-10 flex max-w-xl flex-wrap justify-center text-center text-xs leading-5 opacity-40 md:col-span-3 lg:max-w-none"
    >
      <span>ADinQ AB</span>
      <span class="px-3 opacity-35">|</span>
      <span>Fabriksgatan 11, plan 3</span>
      <span class="px-3 opacity-35">|</span>
      <span>503 38 Borås</span>
      <span class="px-3 opacity-35">|</span>
      <a class="underline hover:opacity-50" href="tel:033-7222400"
        >Tel. 033-72 22 400</a
      >
      <span class="px-3 opacity-35">|</span>
      <a class="underline hover:opacity-50" href="mailto:info@adinq.se"
        >E-post: info@adinq.se</a
      >
    </p>

    <div class="my-4 w-1/3 border-t border-gray-300/40"></div>

    <a
      class="bottom-3 col-span-1 flex text-xs opacity-20 hover:text-white/75 md:col-span-3"
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
};
</script>
