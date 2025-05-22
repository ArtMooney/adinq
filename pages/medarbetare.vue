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
  <div class="relative mx-4 my-20 flex flex-col gap-8 sm:mx-8">
    <div class="absolute inset-0 flex items-center overflow-hidden">
      <NuxtImg
        src="teo-d-4op9_2Bt2Eg-unsplash.jpg"
        alt=""
        class="parallax-background h-full w-full object-cover"
        sizes="1000px md:2000px"
        width="3456"
        height="5184"
        densities="x1"
      />

      <div class="absolute inset-0 bg-[#365e80]/70"></div>
    </div>

    <div class="relative h-screen">HEJ</div>
  </div>
</template>

<script>
export default {
  name: "Medarbetare",

  methods: {
    handleScroll() {
      const scrolled = window.scrollY;
      const parallaxElements = document.querySelectorAll(
        ".parallax-background, .parallax-layer",
      );

      parallaxElements.forEach(function (el, index) {
        const rate = index === 0 ? 0.4 : 0.2;
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
