<script setup>
import Button from "./elements/Button.vue";
</script>

<template>
  <div
    id="navbar"
    ref="navbar"
    class="relative z-10 mx-[calc(-50vw+50%)] w-screen bg-neutral-950"
  >
    <div
      v-if="showNavbar"
      @click="showNavbar = false"
      class="fixed inset-0"
    ></div>

    <div
      class="mx-auto flex w-full max-w-screen-2xl items-center justify-between p-4 py-2"
    >
      <router-link to="/">
        <NuxtImg
          src="adinq_vit.svg"
          alt="company logo"
          class="h-auto w-24 p-1 xl:w-32 xl:p-2"
          :class="currentPath === '/dagens-adinq' && 'opacity-0'"
        />
      </router-link>

      <Icon
        name="heroicons:bars-2"
        @click="showNavbar = !showNavbar"
        class="block h-8 min-h-8 w-8 min-w-8 cursor-pointer xl:!hidden"
      />

      <div
        class="fixed top-0 right-0 bottom-0 left-auto flex flex-col items-end justify-start gap-5 px-8 pt-24 pb-10 text-center transition-all duration-300 ease-in-out xl:static xl:flex-row xl:items-center xl:bg-transparent xl:p-0"
        :class="[
          showNavbar
            ? 'absolute overflow-auto bg-neutral-950 xl:flex'
            : 'absolute translate-x-100 xl:flex xl:translate-x-0',
          resizing && 'transition-none',
        ]"
      >
        <Icon
          v-if="showNavbar"
          @click="showNavbar = !showNavbar"
          name="iconoir:xmark"
          class="absolute top-4 right-4 h-8 min-h-8 w-8 min-w-8 cursor-pointer"
          :class="[showNavbar && 'xl:!hidden']"
        />

        <NavbarLink
          @click="showNavbar = false"
          icon="heroicons:home"
          text="Hem"
          route="/"
        ></NavbarLink>

        <NavbarLink
          @click="showNavbar = false"
          icon="ph:film-slate-light"
          text="Mediaproduktion"
          route="/media-produktion"
        ></NavbarLink>

        <NavbarLink
          @click="showNavbar = false"
          icon="fluent:people-32-regular"
          text="Dagens ADinQ"
          route="/dagens-adinq"
        ></NavbarLink>

        <NavbarLink
          @click="showNavbar = false"
          icon="famicons:chatbubble-ellipses-outline"
          text="Kundutlåtanden"
          route="/kundutlatanden"
        ></NavbarLink>

        <NavbarLink
          @click="showNavbar = false"
          icon="proicons:chat-question"
          text="Varför oss"
          route="/varfor-oss"
        ></NavbarLink>

        <NavbarLink
          @click="showNavbar = false"
          icon="hugeicons:money-bag-01"
          text="Priser"
          route="/priser"
        ></NavbarLink>

        <div class="group relative">
          <Button
            @click="showNavbar = false"
            text="Kontakta oss"
            link="/kontakta-oss"
            type="button"
            styling="light"
            class="w-full opacity-90 transition-opacity duration-300 ease-in-out hover:opacity-100"
          />
          <div
            class="absolute inset-0 z-[-1] w-full rounded-full bg-gradient-to-r from-red-400 to-red-800 opacity-0 blur-xl transition-all duration-300 ease-in-out group-hover:opacity-90"
            :class="[currentPath === '/kontakta-oss' && 'opacity-60']"
          />
        </div>

        <SocialMediaIcons
          v-if="showNavbar"
          class="mt-4"
          :class="[showNavbar && 'xl:!hidden']"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",

  data() {
    return {
      showNavbar: false,
      resizing: false,
      resizeTimeout: null,
      scrollY: 0,
      originalPaddingRight: 0,
    };
  },

  computed: {
    currentPath() {
      return this.$route.path;
    },
  },

  mounted() {
    window.addEventListener("resize", this.onResize);
    this.onResize();
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },

  methods: {
    onResize() {
      this.$emit("navbarHeight", this.$refs.navbar.offsetHeight);
      this.resizing = true;

      if (this.resizeTimeout) {
        clearTimeout(this.resizeTimeout);
      }

      this.resizeTimeout = setTimeout(() => {
        this.resizing = false;
      }, 300);
    },

    stopScrolling() {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      this.scrollY = window.scrollY;
      this.originalPaddingRight = document.body.style.paddingRight;

      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.position = "fixed";
      document.body.style.top = `-${this.scrollY}px`;
      document.body.style.width = "100%";
    },

    startScrolling() {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.body.style.paddingRight = this.originalPaddingRight;

      window.scrollTo(0, this.scrollY);
    },
  },

  watch: {
    showNavbar(newValue) {
      if (newValue) {
        this.stopScrolling();
      } else {
        this.startScrolling();
      }
    },
  },
};
</script>
