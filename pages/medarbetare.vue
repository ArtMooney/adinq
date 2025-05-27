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
  <div class="relative my-0 flex flex-col gap-8">
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

    <div class="relative grid h-auto grid-cols-4 gap-x-8 gap-y-12 px-32 py-8">
      <ColleagueCard
        v-for="colleague in colleaguesManagement"
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
