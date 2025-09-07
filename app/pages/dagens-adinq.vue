<script setup>
import IconQlementineIconsChevronDoubleDown16 from "~icons/qlementine-icons/chevron-double-down-16";

useSeoMeta({
  title: "Om Adinq - Vårt team | Digital marknadsföring och DOOH",
  description:
    "Träffa teamet bakom Adinq - experter inom digital marknadsföring och DOOH media. Företagsledning, försäljning, produktion och marknadsföring som hjälper er nå ut digitalt.",
  ogTitle: "Om Adinq - Vårt team",
  ogDescription:
    "Träffa teamet bakom Adinq som hjälper företag nå ut digitalt lokalt, regionalt och rikstäckande genom DOOH media.",
  ogImage: "https://www.adinq.se/sky-full-of-stars.jpg",
  twitterCard: "summary_large_image",
  twitterTitle: "Om Adinq - Vårt team",
  twitterDescription:
    "Träffa teamet bakom Adinq - experter inom digital marknadsföring och DOOH media.",
  twitterImage: "https://www.adinq.se/sky-full-of-stars.jpg",
});

definePageMeta({
  ssr: true,
});

const config = useRuntimeConfig();

const { data: colleagues, error } = await useFetch("/api/team", {
  method: "GET",
  headers: {
    Authorization:
      "Basic " + btoa(config.public.userName + ":" + config.public.userPass),
  },
  default: () => [],
});

const colleaguesManagement = colleagues?.value.filter(
  (colleague) => colleague?.department?.value === "management",
);

const colleaguesSales = colleagues?.value.filter(
  (colleague) => colleague?.department?.value === "sales",
);

const colleaguesProduction = colleagues?.value.filter(
  (colleague) => colleague?.department?.value === "production",
);
</script>

<template>
  <div class="relative px-4 pb-32 md:px-8">
    <div class="absolute inset-0 mx-[calc(-50vw+50%)] w-screen overflow-hidden">
      <NuxtImg
        src="sky-full-of-stars.jpg"
        sizes="1000px md:2000px"
        width="4000"
        height="6000"
        class="parallax-background h-[200vh] transform-gpu object-cover opacity-40 will-change-transform backface-hidden"
        :style="{ marginTop: `-${getNavbarHeight}px` }"
        densities="x1"
        format="webp"
      />
    </div>

    <Heading>
      <template #heading-content>
        <div
          class="absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <h1 class="mx-10 mb-8 md:mx-30">
            Dagens
            <span>
              <router-link to="/">
                <NuxtImg
                  src="adinq_vit.svg"
                  class="mt-2 mb-12 inline h-auto w-44 max-w-44 sm:mt-0 sm:ml-2 sm:w-64 sm:max-w-64"
                  alt="company logo"
                ></NuxtImg> </router-link
            ></span>
          </h1>

          <NuxtLink
            :to="{ path: '/dagens-adinq', hash: '#medarbetare' }"
            class="absolute bottom-8 flex w-full items-center justify-center"
          >
            <IconQlementineIconsChevronDoubleDown16
              class="h-12 min-h-12 w-12 min-w-12 cursor-pointer opacity-70 hover:opacity-100"
            ></IconQlementineIconsChevronDoubleDown16>
          </NuxtLink>
        </div>
      </template>
    </Heading>

    <div
      id="medarbetare"
      class="relative mt-32 transform-gpu rounded border border-white/25 px-4 py-32 backdrop-blur-[2px] will-change-transform backface-hidden sm:px-12"
    >
      <NuxtImg
        src="underwater-light-streaks.jpg"
        alt=""
        class="absolute inset-0 h-full w-full object-cover opacity-50 saturate-25"
        sizes="1000px md:2000px"
        width="6000"
        height="4000"
        format="webp"
      />

      <h3 v-if="colleaguesManagement.length > 0" class="relative text-center">
        Företagsledning och administration
      </h3>

      <div class="flex flex-wrap justify-center gap-x-4 gap-y-8">
        <ColleagueCard
          v-for="colleague in colleaguesManagement"
          :key="colleague.id"
          :colleague="colleague"
          class="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.333rem)] xl:w-[calc(25%-1.5rem)]"
        />
      </div>
    </div>

    <div
      class="relative mt-32 transform-gpu rounded border border-white/25 px-4 py-32 backdrop-blur-[2px] will-change-transform backface-hidden sm:px-12"
    >
      <NuxtImg
        src="underwater-light-streaks.jpg"
        alt=""
        class="absolute inset-0 h-full w-full object-cover opacity-50 saturate-25"
        sizes="1000px md:2000px"
        width="6000"
        height="4000"
        format="webp"
      />

      <h3 v-if="colleaguesSales.length > 0" class="relative text-center">
        Försäljning
      </h3>

      <div class="flex flex-wrap justify-center gap-x-4 gap-y-8">
        <ColleagueCard
          v-for="colleague in colleaguesSales"
          :key="colleague.id"
          :colleague="colleague"
          class="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.333rem)] xl:w-[calc(25%-1.5rem)]"
        />
      </div>
    </div>

    <div
      class="relative mt-32 transform-gpu rounded border border-white/25 px-4 py-32 backdrop-blur-[2px] will-change-transform backface-hidden sm:px-12"
    >
      <NuxtImg
        src="underwater-light-streaks.jpg"
        alt=""
        class="absolute inset-0 h-full w-full object-cover opacity-50 saturate-25"
        sizes="1000px md:2000px"
        width="6000"
        height="4000"
        format="webp"
      />

      <h3 v-if="colleaguesProduction.length > 0" class="relative text-center">
        Produktion och marknadsföring
      </h3>

      <div class="flex flex-wrap justify-center gap-x-4 gap-y-8">
        <ColleagueCard
          v-for="colleague in colleaguesProduction"
          :key="colleague.id"
          :colleague="colleague"
          class="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.333rem)] xl:w-[calc(25%-1.5rem)]"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DagensAdinq",

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
