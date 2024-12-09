<script setup>
import { Vue3Lottie } from "vue3-lottie";
import NavbarLink from "../elements/NavbarLink.vue";
import Cube from "../assets/Cube.vue";
import MugHot from "../assets/MugHot.vue";
import sandwich from "../assets/burger-menu.json";
import Button from "../elements/Button.vue";
</script>

<template>
  <div
    id="navbar"
    class="relative z-10 mb-4 mt-0 grid grid-cols-2 items-stretch justify-stretch justify-items-stretch gap-4 overflow-visible pb-0 pt-4 sm:grid-cols-[0.5fr,1fr] md:grid-cols-[0.25fr,1fr]"
  >
    <a
      href="/"
      class="flex w-[86%] items-center transition-all duration-500 ease-in-out hover:m-2"
      ><img
        src="../assets/Framecore_color.svg"
        alt=""
        class="h-full w-full object-contain"
    /></a>

    <div
      class="absolute bottom-auto left-auto justify-items-end gap-4 bg-[#444442] px-6 py-10 transition-all duration-200 ease-in-out lg:static lg:grid lg:grid-flow-col lg:content-end lg:items-stretch lg:justify-end lg:bg-transparent lg:p-0"
      :class="[
        navbarClicked ? 'opacity-100' : 'opacity-0 lg:opacity-100',
        navbarClicked ? 'right-6 top-14' : 'right-2 top-0',
        hideMobileNav ? 'hidden' : 'grid',
      ]"
    >
      <NavbarLink
        path="/"
        hash="#services"
        :icon="Cube"
        @click="closeMobileMenu"
        >Tjänster
      </NavbarLink>
      <NavbarLink path="/case" hash="" :icon="MugHot" @click="closeMobileMenu"
        >Kunder &amp; Case
      </NavbarLink>
      <Button
        text="Kontakta oss"
        link="/contact"
        type="button"
        data-wait=""
        @click="closeMobileMenu"
      />
    </div>

    <div
      class="relative block h-8 w-8 cursor-pointer select-none items-center justify-self-end invert hover:opacity-75 sm:h-10 sm:w-10 lg:hidden"
      @click="mobileMenu"
    >
      <Vue3Lottie
        ref="lottieSandwich"
        :animationData="sandwich"
        :autoPlay="false"
        :loop="false"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",

  data() {
    return {
      navbarClicked: false,
      hideMobileNav: true,
    };
  },

  methods: {
    mobileMenu() {
      if (!this.navbarClicked) {
        this.$refs.lottieSandwich.setSpeed(2);
        this.$refs.lottieSandwich.playSegments([7, 25], true);
      } else {
        this.$refs.lottieSandwich.setSpeed(2);
        this.$refs.lottieSandwich.playSegments([25, 7], true);
      }

      if (this.hideMobileNav) {
        this.hideMobileNav = false;

        setTimeout(() => {
          this.navbarClicked = !this.navbarClicked;
        }, 1);
      } else {
        this.navbarClicked = !this.navbarClicked;
        this.hideMobileNav = !this.hideMobileNav;
      }
    },

    closeMobileMenu() {
      this.navbarClicked = false;
      this.hideMobileNav = true;
      this.$refs.lottieSandwich.setSpeed(2);
      this.$refs.lottieSandwich.playSegments([25, 7], true);
    },
  },
};
</script>
