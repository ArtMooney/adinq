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
  <div class="relative -my-12 flex flex-col gap-8 py-32">
    <div class="absolute inset-0 flex items-center overflow-hidden">
      <NuxtImg
        src="teo-d-4op9_2Bt2Eg-unsplash.jpg"
        alt=""
        class="parallax-background h-full w-full object-cover saturate-50"
        sizes="1000px md:2000px"
        width="3456"
        height="5184"
        densities="x1"
      />

      <div class="absolute inset-0 bg-[#140a14]/85"></div>
    </div>

    <h1
      class="relative my-52 text-center text-3xl sm:text-4xl md:text-5xl md:leading-12 lg:text-6xl lg:leading-16"
    >
      Vi hjälper er att nå ut digitalt!
    </h1>

    <h3
      v-if="colleaguesManagement.length > 0"
      class="relative mt-32 text-center"
    >
      Företagsledning och administration
    </h3>

    <div class="relative grid h-auto grid-cols-4 gap-x-8 gap-y-12 px-32 py-8">
      <ColleagueCard
        v-for="colleague in colleaguesManagement"
        :key="colleague.id"
        :colleague="colleague"
      />
    </div>

    <h3 v-if="colleaguesSales.length > 0" class="relative mt-32 text-center">
      Försäljning
    </h3>

    <div class="relative grid h-auto grid-cols-4 gap-x-8 gap-y-12 px-32 py-8">
      <ColleagueCard
        v-for="colleague in colleaguesSales"
        :key="colleague.id"
        :colleague="colleague"
      />
    </div>

    <h3
      v-if="colleaguesProduction.length > 0"
      class="relative mt-32 text-center"
    >
      Produktion och marknadsföring
    </h3>

    <div class="relative grid h-auto grid-cols-4 gap-x-8 gap-y-12 px-32 py-8">
      <ColleagueCard
        v-for="colleague in colleaguesProduction"
        :key="colleague.id"
        :colleague="colleague"
      />
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

  data() {
    const config = useRuntimeConfig();
    return {
      userName: config.public.userName,
      userPass: config.public.userPass,
      error: false,
      colleaguesManagement: [],
      colleaguesSales: [],
      colleaguesProduction: [],
    };
  },

  async created() {
    try {
      const colleagues = await $fetch("/api/get-medarbetare", {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa(this.userName + ":" + this.userPass),
        },
      });

      this.colleaguesManagement = colleagues.filter(
        (colleague) => colleague.department.value === "management",
      );

      this.colleaguesSales = colleagues.filter(
        (colleague) => colleague.department.value === "sales",
      );

      this.colleaguesProduction = colleagues.filter(
        (colleague) => colleague.department.value === "production",
      );
    } catch (err) {
      this.error = true;
    }
  },

  methods: {
    handleScroll() {
      const scrolled = window.scrollY;
      const parallaxElements = document.querySelectorAll(
        ".parallax-background, .parallax-layer",
      );

      parallaxElements.forEach(function (el, index) {
        const rate = index === 0 ? 0.5 : 0.2;
        const translateY = scrolled * rate;
        el.style.transform = `translateY(${translateY}px)`;
      });
    },
  },

  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
