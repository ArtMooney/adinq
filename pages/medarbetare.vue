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
  <div class="relative px-4 pb-32 md:px-8">
    <div class="absolute inset-0 mx-[calc(-50vw+50%)] w-screen overflow-hidden">
      <NuxtImg
        src="guillaume-le-louarn-uC21aXJ7yQs-unsplash.jpg"
        sizes="1000px md:2000px"
        width="4000"
        height="6000"
        class="parallax-background h-[200vh] transform-gpu object-cover opacity-40 will-change-transform backface-hidden"
        :style="{ marginTop: `-${getNavbarHeight}px` }"
        densities="x1"
      />
    </div>

    <Heading>
      <template #heading-content>
        <div
          class="absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <h1
            class="mx-10 mb-8 text-3xl sm:text-4xl md:mx-20 md:text-5xl md:leading-12 lg:text-6xl lg:leading-16"
          >
            Dagens ADinQ
          </h1>

          <NuxtLink
            :to="{ path: '/medarbetare', hash: '#medarbetare' }"
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
      id="medarbetare"
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
        if (el.classList.contains("parallax-background")) {
          const elementHeight = el.offsetHeight;
          const containerHeight = el.parentElement.offsetHeight + addedOffset;

          const maxTranslate = elementHeight - containerHeight;
          const translateY = -(scrollPercent * maxTranslate);

          el.style.transform = `translateY(${translateY}px)`;
        }
      });
    },
  },
};
</script>
