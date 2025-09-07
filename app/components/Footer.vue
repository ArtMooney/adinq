<script setup>
import IconEmojioneGrowingHeart from "~icons/emojione-v1/growing-heart";
</script>

<template>
  <div
    ref="footer"
    class="relative mx-[calc(-50vw+50%)] grid w-screen bg-neutral-950"
  >
    <div
      class="mx-auto grid w-full max-w-screen-2xl items-start justify-items-center px-12 pt-20 pb-12 md:grid-cols-[0.5fr_1fr_0.5fr] md:justify-items-start"
    >
      <NuxtLink to="/">
        <NuxtImg
          src="adinq_vit.svg"
          alt="footer logo"
          class="relative mb-12 h-auto w-32 min-w-32 opacity-90 transition-opacity duration-300 ease-in-out hover:opacity-100 md:w-26 md:min-w-26"
        />
      </NuxtLink>

      <div
        class="mt-4 flex flex-col flex-wrap items-center justify-center gap-x-4 gap-y-2 justify-self-center sm:mx-12 md:mx-0 lg:flex-row"
      >
        <NavbarLink text="Hem" route="/"></NavbarLink>
        <NavbarLink
          text="Mediaproduktion"
          route="/media-produktion"
        ></NavbarLink>
        <NavbarLink text="Dagens ADinQ" route="/dagens-adinq"></NavbarLink>
        <NavbarLink text="Kundutlåtanden" route="/kundutlatanden"></NavbarLink>
        <NavbarLink text="Varför oss" route="/varfor-oss"></NavbarLink>
        <NavbarLink text="Priser" route="/priser"></NavbarLink>
        <NavbarLink text="Kontakta oss" route="/kontakta-oss"></NavbarLink>
        <NavbarLink text="Admin" route="/admin"></NavbarLink>
      </div>

      <SocialMediaIcons
        class="row-start-3 my-12 md:col-start-3 md:col-end-4 md:row-start-auto md:mt-3 md:justify-self-end"
      />

      <div
        class="mt-8 mb-12 flex w-full items-center justify-center gap-8 md:col-span-3"
      >
        <NuxtImg
          src="creditsafe-adinq.png"
          class="h-auto w-36 max-w-36 min-w-36"
        ></NuxtImg>
        <NuxtImg
          src="gasell-logo-inv-2024.png"
          class="h-auto w-40 max-w-40 min-w-40"
        ></NuxtImg>
      </div>

      <CompanyInfo />

      <div
        class="col-span-1 my-4 h-px w-2/3 justify-self-center bg-gray-200/30 md:col-span-3 xl:w-1/3"
      ></div>

      <a
        class="flex justify-self-center text-xs opacity-20 hover:opacity-30 md:col-span-3"
        href="https://www.framecore.se"
        target="_blank"
      >
        Powered by
        <span
          ><IconEmojioneGrowingHeart class="h-4 min-h-4 w-4 min-w-4 px-3"
        /></span>
        FrameCore
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",

  mounted() {
    window.addEventListener("resize", this.onResize);
    this.onResize();
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },

  methods: {
    onResize() {
      this.$emit("footerHeight", this.$refs.footer.offsetHeight);
    },
  },
};
</script>
