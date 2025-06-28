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

const config = useRuntimeConfig();

const { data: colleagues, error } = await useFetch("/api/get-medarbetare", {
  method: "GET",
  headers: {
    Authorization:
      "Basic " + btoa(config.public.userName + ":" + config.public.userPass),
  },
  default: () => [],
});

const colleaguesManagement = colleagues.value.filter(
  (colleague) => colleague.department.value === "management",
);

const colleaguesSales = colleagues.value.filter(
  (colleague) => colleague.department.value === "sales",
);

const colleaguesProduction = colleagues.value.filter(
  (colleague) => colleague.department.value === "production",
);
</script>

<template>
  <div class="relative -my-12 flex flex-col gap-8 px-4 py-32 md:px-8">
    <div class="absolute inset-0 overflow-hidden">
      <NuxtImg
        src="guillaume-le-louarn-uC21aXJ7yQs-unsplash.jpg"
        width="4000"
        height="6000"
        class="parallax-background transform-gpu object-cover opacity-25 will-change-transform backface-hidden"
        densities="x1"
      />
    </div>

    <h1
      class="relative my-52 text-center text-3xl sm:text-4xl md:text-5xl md:leading-12 lg:text-6xl lg:leading-16"
    >
      Dagens ADinQ
    </h1>

    <div
      class="relative mt-32 rounded border border-white/25 py-32 backdrop-blur-[2px]"
    >
      <NuxtImg
        src="jeremy-bishop-6Y1Cm5NJOJo-unsplash.jpg"
        alt=""
        class="absolute inset-0 h-full w-full object-cover opacity-50 saturate-25"
        sizes="1000px md:2000px"
        width="6000"
        height="4000"
      />

      <h3 v-if="colleaguesManagement.length > 0" class="relative text-center">
        Företagsledning och administration
      </h3>

      <div
        class="relative grid h-auto gap-x-8 gap-y-12 px-4 py-8 sm:grid-cols-2 sm:px-12 lg:grid-cols-3 xl:grid-cols-4"
      >
        <ColleagueCard
          v-for="colleague in colleaguesManagement"
          :key="colleague.id"
          :colleague="colleague"
        />
      </div>
    </div>

    <div
      class="relative mt-32 rounded border border-white/25 py-32 backdrop-blur-[2px]"
    >
      <NuxtImg
        src="jeremy-bishop-6Y1Cm5NJOJo-unsplash.jpg"
        alt=""
        class="absolute inset-0 h-full w-full object-cover opacity-50 saturate-25"
        sizes="1000px md:2000px"
        width="6000"
        height="4000"
      />

      <h3 v-if="colleaguesSales.length > 0" class="relative text-center">
        Försäljning
      </h3>

      <div
        class="relative grid h-auto gap-x-8 gap-y-12 px-4 py-8 sm:grid-cols-2 sm:px-12 lg:grid-cols-3 xl:grid-cols-4"
      >
        <ColleagueCard
          v-for="colleague in colleaguesSales"
          :key="colleague.id"
          :colleague="colleague"
        />
      </div>
    </div>

    <div
      class="relative mt-32 rounded border border-white/25 py-32 backdrop-blur-[2px]"
    >
      <NuxtImg
        src="jeremy-bishop-6Y1Cm5NJOJo-unsplash.jpg"
        alt=""
        class="absolute inset-0 h-full w-full object-cover opacity-50 saturate-25"
        sizes="1000px md:2000px"
        width="6000"
        height="4000"
      />

      <h3 v-if="colleaguesProduction.length > 0" class="relative text-center">
        Produktion och marknadsföring
      </h3>

      <div
        class="relative grid h-auto gap-x-8 gap-y-12 px-4 py-8 sm:grid-cols-2 sm:px-12 lg:grid-cols-3 xl:grid-cols-4"
      >
        <ColleagueCard
          v-for="colleague in colleaguesProduction"
          :key="colleague.id"
          :colleague="colleague"
        />
      </div>
    </div>
  </div>

  <NuxtImg
    src="silhouette.jpg"
    class="hidden"
    alt="gömd bild på en siluett till nuxtimg"
  />
</template>

<script>
export default {
  name: "Medarbetare",

  methods: {
    handleScroll() {
      const scrolled = window.scrollY;
      const parallaxElements = document.querySelectorAll(
        ".parallax-background, .parallax-clouds",
      );

      parallaxElements.forEach(function (el, index) {
        const rate = index === 0 || index === 1 ? 0.7 : 0.4;
        const translateY = scrolled * rate;
        el.style.transform = `translateY(${translateY}px)`;
      });
    },
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
