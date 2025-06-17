<template>
  <div class="relative mx-[calc(-50vw+50%)] grid w-screen bg-neutral-950">
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

      <SocialMediaIcons
        class="row-start-3 my-12 md:col-start-3 md:col-end-4 md:row-start-auto md:mt-3 md:justify-self-end"
      />

      <div
        class="flex flex-col flex-wrap items-center justify-center gap-x-4 gap-y-2 justify-self-center sm:mx-12 md:col-span-3 md:mx-0 lg:-mt-8 lg:flex-row"
      >
        <NavbarLink text="Hem" route="/"></NavbarLink>
        <NavbarLink
          text="Mediaproduktion"
          route="/media-produktion"
        ></NavbarLink>
        <NavbarLink text="Medarbetare" route="/medarbetare"></NavbarLink>
        <NavbarLink text="Kundutlåtanden" route="/kundutlatanden"></NavbarLink>
        <NavbarLink text="Varför oss" route="/varfor-oss"></NavbarLink>
        <NavbarLink text="Priser" route="/priser"></NavbarLink>
        <NavbarLink text="Kontakta oss" route="/kontakta-oss"></NavbarLink>
      </div>

      <p
        class="mt-12 flex flex-wrap justify-center text-xs leading-5 sm:mx-12 md:col-span-3 md:mt-20 md:justify-self-center"
      >
        <span class="opacity-40">ADinQ AB</span>
        <span class="px-3 opacity-35">|</span>
        <span class="opacity-40">Fabriksgatan 11, plan 3</span>
        <span class="px-3 opacity-35">|</span>
        <span class="opacity-40">503 38 Borås</span>
        <span class="px-3 opacity-35">|</span>
        <a class="underline opacity-40 hover:opacity-50" href="tel:033-7222400"
          >Tel. 033-72 22 400</a
        >
        <span class="px-3 opacity-35">|</span>
        <a
          class="underline opacity-40 hover:opacity-50"
          href="mailto:info@adinq.se"
          >E-post: info@adinq.se</a
        >
      </p>

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
          ><Icon
            name="emojione-v1:growing-heart"
            class="h-4 min-h-4 w-4 min-w-4 px-3"
        /></span>
        FrameCore
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>
