<script setup>
useSeoMeta({
  title: "",
  description: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  twitterCard: "",
  twitterTitle: "",
  twitterDescription: "",
  twitterImage: "",
});

definePageMeta({
  ssr: true,
});
</script>

<template>
  <div
    class="relative mx-[calc(-50vw+50%)] min-h-80 w-screen"
    :style="{
      height: `${windowHeight - navHeight}px`,
    }"
  >
    <NuxtImg
      src="priser-handslag.jpg"
      alt=""
      class="h-full w-full object-cover"
      sizes="1000px md:2000px"
      width="7360"
      height="4912"
      densities="x1"
      format="webp"
    />

    <div class="absolute inset-0 bg-[#2f3f4d]/50"></div>

    <div
      class="absolute inset-0 flex flex-col items-center justify-center text-center"
    >
      <h1 class="mx-10 mb-8 md:mx-30">Priser</h1>

      <NuxtLink
        :to="{ path: '/priser', hash: '#priser' }"
        class="absolute bottom-8 flex w-full items-center justify-center"
      >
        <Icon
          name="qlementine-icons:chevron-double-down-16"
          class="h-12 min-h-12 w-12 min-w-12 cursor-pointer opacity-70 hover:opacity-100"
        ></Icon>
      </NuxtLink>
    </div>
  </div>

  <div id="priser" class="mx-4 my-32 flex flex-col gap-8 sm:mx-8">
    <div
      class="mx-auto flex w-full flex-col items-center justify-center gap-8 text-center sm:max-w-lg lg:max-w-4xl"
    >
      <h3 class="text-center">Prisexempel</h3>

      <p>
        Priserna varierar beroende på flera faktorer såsom täckning och
        sändningstid så vi tillhandahåller endast några förslag för att ge
        exempel på vilka kostnadsnivåer ni kan förvänta er.
      </p>
    </div>

    <div class="relative mt-32 grid grid-cols-3 gap-8 p-8">
      <NuxtImg
        src="birmingham-museums-trust-BPWZ01FtySg-unsplash.jpg"
        alt=""
        class="absolute inset-0 h-full w-full object-cover opacity-15"
        sizes="1000px md:2000px"
        width="2483"
        height="3718"
        format="webp"
      />

      <PriceBlob
        icon="hugeicons:contact-01"
        icon-color="#6293a5"
        message="Kontakta oss för mer info"
        link="/kontakta-oss"
      ></PriceBlob>
    </div>
  </div>
</template>

<script>
export default {
  name: "Priser",

  inject: ["navbarHeight"],

  data() {
    return {
      windowHeight: 0,
    };
  },

  computed: {
    navHeight() {
      return this.navbarHeight();
    },
  },

  mounted() {
    this.windowHeight = window.innerHeight;
    window.addEventListener("resize", this.handleResize);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    handleResize() {
      this.windowHeight = window.innerHeight;
    },
  },
};
</script>
