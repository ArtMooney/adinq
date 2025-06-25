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
  <div class="relative -my-12 flex flex-col gap-8 px-4 py-72 md:px-8">
    <div class="absolute inset-0 mx-[calc(-50vw+50%)] w-screen overflow-hidden">
      <NuxtImg
        src="jeremy-bishop-6Y1Cm5NJOJo-unsplash.jpg"
        width="2335"
        height="3500"
        alt="deep blue background from underneath the ocean"
        class="parallax-background -mt-3 h-full object-cover saturate-90"
        densities="x1"
      />

      <div class="absolute inset-0 bg-[#140a14]/50"></div>
    </div>

    <h1
      class="relative mt-32 mb-72 text-center text-3xl sm:text-4xl md:text-5xl md:leading-12 lg:text-6xl lg:leading-16"
    >
      Vad säger våra kunder?
    </h1>

    <div class="flex flex-col items-center gap-32">
      <TestimonialBlob
        v-for="testimonial in testimonials"
        :key="testimonial.id"
        :message="testimonial?.text"
        :logo="testimonial?.logo[0]"
        :att="testimonial?.att"
        :client="testimonial?.client"
        :link="testimonial?.link"
      ></TestimonialBlob>
    </div>

    <div
      class="pointer-events-none absolute inset-0 mx-[calc(-50vw+50%)] flex w-screen items-center overflow-hidden"
    >
      <NuxtImg
        src="flat_clouds.png"
        alt="flat and transparent background layer with clouds"
        class="parallax-clouds h-full w-full object-cover opacity-5"
        sizes="1500px md:3000px"
        width="3006"
        height="2000"
        densities="x1"
      />
    </div>
  </div>
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
      testimonials: [],
    };
  },

  async created() {
    try {
      this.testimonials = await $fetch("/api/get-testimonials", {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa(this.userName + ":" + this.userPass),
        },
      });
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
        const rate = index === 0 ? 0.8 : 0.4;
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
