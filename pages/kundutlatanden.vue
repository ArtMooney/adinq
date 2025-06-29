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

const { data: testimonials, error } = await useFetch("/api/get-testimonials", {
  method: "GET",
  headers: {
    Authorization:
      "Basic " + btoa(config.public.userName + ":" + config.public.userPass),
  },
  default: () => [],
});
</script>

<template>
  <div class="relative flex flex-col gap-8 px-4 pb-72 md:px-8">
    <div class="absolute inset-0 mx-[calc(-50vw+50%)] w-screen overflow-hidden">
      <NuxtImg
        src="philip-myrtorp-kWnVvnG30dQ-unsplash.jpg"
        sizes="1000px md:2000px"
        width="3863"
        height="5795"
        alt="in the city of gothenburg at night"
        class="parallax-background -mt-3 h-[200vh] transform-gpu object-cover saturate-90 will-change-transform backface-hidden"
        densities="x1"
      />

      <div class="absolute inset-0 bg-[#140a14]/65"></div>
    </div>

    <Heading>
      <template #heading-content>
        <div
          class="absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <h1
            class="mx-10 mb-8 text-3xl sm:text-4xl md:mx-20 md:text-5xl md:leading-12 lg:text-6xl lg:leading-16"
          >
            Vad säger våra kunder?
          </h1>

          <NuxtLink
            :to="{ path: '/kundutlatanden', hash: '#testimonials' }"
            class="absolute bottom-8 flex w-full items-center justify-center"
          >
            <Icon
              name="qlementine-icons:chevron-double-down-16"
              class="h-12 min-h-12 w-12 min-w-12 cursor-pointer opacity-70 hover:opacity-100"
            ></Icon>
          </NuxtLink>
        </div>
      </template>
    </Heading>

    <div
      id="testimonials"
      class="flex flex-col items-center gap-32 px-4 md:px-0"
    >
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
        class="parallax-clouds h-[300vh] w-full transform-gpu object-cover opacity-5 will-change-transform backface-hidden"
        sizes="1000px md:2000px"
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

  inject: ["navbarHeight", "footerHeight"],

  computed: {
    getNavbarHeight() {
      return this.navbarHeight();
    },

    getFooterHeight() {
      return this.footerHeight();
    },
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    handleScroll() {
      const scrolled = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const maxScroll = documentHeight - windowHeight;
      const scrollPercent = Math.min(scrolled / maxScroll, 1);
      const addedOffset = this.getFooterHeight + this.getNavbarHeight;

      const parallaxElements = document.querySelectorAll(
        ".parallax-background, .parallax-clouds",
      );

      parallaxElements.forEach(function (el, index) {
        const elementHeight = el.offsetHeight;
        const containerHeight = el.parentElement.offsetHeight + addedOffset;

        const maxTranslate = elementHeight - containerHeight;
        const translateY = -(scrollPercent * maxTranslate);

        el.style.transform = `translateY(${translateY}px)`;
      });
    },
  },
};
</script>
