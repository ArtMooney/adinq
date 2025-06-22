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
  <div class="relative -my-12 flex flex-col gap-8 px-4 py-32 md:px-8">
    <div class="absolute inset-0 mx-[calc(-50vw+50%)] w-screen overflow-hidden">
      <NuxtImg
        src="teo-d-4op9_2Bt2Eg-unsplash.jpg"
        width="768"
        height="5184"
        class="parallax-background h-full saturate-50 md:hidden"
        densities="x1"
      />

      <NuxtImg
        src="teo-d-4op9_2Bt2Eg-unsplash.jpg"
        width="3456"
        height="5184"
        class="parallax-background hidden h-full saturate-50 md:block"
        densities="x1"
      />

      <div class="absolute inset-0 bg-[#140a14]/85"></div>
    </div>

    <h1
      class="relative my-52 text-center text-3xl sm:text-4xl md:text-5xl md:leading-12 lg:text-6xl lg:leading-16"
    >
      Vad säger våra kunder?
    </h1>

    <div>HEJ</div>

    <div
      class="pointer-events-none absolute inset-0 mx-[calc(-50vw+50%)] flex w-screen items-center overflow-hidden"
    >
      <NuxtImg
        src="flat_clouds.png"
        alt=""
        class="parallax-clouds h-full w-full object-cover opacity-10"
        sizes="1500px md:3000px"
        width="3006"
        height="2000"
        densities="x1"
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
  name: "Kundutlatanden",

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
        ".parallax-background, .parallax-clouds",
      );

      parallaxElements.forEach(function (el, index) {
        const rate = index === 0 || index === 1 ? 0.7 : 0.4;
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
