<!--<script setup>-->
<!--import { IonIcon } from "@ionic/vue";-->
<!--import { home, cog } from "ionicons/icons";-->
<!--import { deleteLocalStorage } from "~/utils/deleteLocalStorage.js";-->
<!--</script>-->

<template>
  <div class="flex justify-between px-2 py-3 text-base">
    <!--    <ion-icon-->
    <!--      :icon="home"-->
    <!--      @click="backHomepage"-->
    <!--      class="h-7 w-7 shrink-0 cursor-pointer hover:text-white/75"-->
    <!--    ></ion-icon>-->

    <div class="flex flex-col items-center gap-2 text-center sm:flex-row">
      <h1 class="mb-0 text-2xl sm:text-4xl">{{ cmsName }}</h1>
      <div class="text-xs">by FrameCore</div>
    </div>

    <div class="relative">
      <!--      <ion-icon-->
      <!--        :icon="cog"-->
      <!--        @click="cmsSettingsMenu = !cmsSettingsMenu"-->
      <!--        class="h-8 w-8 shrink-0 cursor-pointer hover:text-white/75"-->
      <!--      ></ion-icon>-->

      <div
        v-if="cmsSettingsMenu"
        @click="cmsSettingsMenu = false"
        class="fixed inset-0 z-0 bg-transparent"
      ></div>

      <div
        v-show="cmsSettingsMenu"
        class="absolute right-2 mt-4 min-w-40 bg-black/90 p-4"
      >
        <div
          @click="logOut"
          class="cursor-pointer text-center hover:text-white/50"
        >
          Log out
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",

  data() {
    return {
      cmsSettingsMenu: false,
      cmsName: "{{ simple }} CMS",
    };
  },

  methods: {
    backHomepage() {
      const protocol = window.location.protocol + "//";
      const siteDomain = window.location.host;

      window.location.href = protocol + siteDomain;
    },

    logOut() {
      deleteLocalStorage("adinq-cms");
      location.reload();
    },
  },
};
</script>
