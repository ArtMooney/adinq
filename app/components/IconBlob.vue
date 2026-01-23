<template>
  <NuxtLink
    :to="link"
    class="group relative min-h-52 cursor-pointer rounded border border-white/25"
  >
    <div
      class="absolute inset-0 z-0 transform-gpu rounded-xl bg-linear-to-r from-red-400 to-red-800 opacity-0 blur-xl transition-opacity duration-300 ease-in-out group-hover:opacity-60"
    ></div>

    <div class="relative h-full w-full rounded bg-neutral-900 p-4 pb-12 sm:p-8">
      <component
        v-if="iconComponent"
        :is="iconComponent"
        class="relative mb-3 h-10 max-h-10 min-h-10 w-10 max-w-10 min-w-10 text-zinc-500"
        :style="{ color: iconColor }"
      ></component>

      <div class="mb-6 h-px w-2/3 bg-white/25"></div>

      <h6 v-if="title" class="mb-3">{{ title }}</h6>

      <p v-if="message" v-html="formatText(message)"></p>
    </div>
  </NuxtLink>
</template>

<script>
import IconLaStore from "~icons/la/store";
import IconFluentProjectionScreen20Regular from "~icons/fluent/projection-screen-20-regular";
import IconSolarDiagramUpBold from "~icons/solar/diagram-up-bold";
import IconCilBuilding from "~icons/cil/building";
import IconPhMapPinLight from "~icons/ph/map-pin-light";
import IconStreamlineUltimateColorColorPalette from "~icons/streamline-ultimate-color/color-palette";
import IconStreamlineUltimateColorDesktopMonitorSmiley from "~icons/streamline-ultimate-color/desktop-monitor-smiley";
import IconEmojioneV1BullHorn from "~icons/emojione-v1/bull-horn";
import IconStreamlineUltimateColorScreenCurved from "~icons/streamline-ultimate-color/screen-curved";
import IconStreamlineUltimateColorBusinessDealHandshake1 from "~icons/streamline-ultimate-color/business-deal-handshake-1";
import IconFxemojiHousebuilding from "~icons/fxemoji/housebuilding";
import IconHugeiconscContact01 from "~icons/hugeicons/contact-01";
import IconPhFilmReelLight from "~icons/ph/film-reel-light";
import IconBiCameraReels from "~icons/bi/camera-reels";
import IconTeenyiconsHeadsetOutline from "~icons/teenyicons/headset-outline";
import IconStreamlineUltimateColorSavingMoneyFlower from "~icons/streamline-ultimate-color/saving-money-flower";
import IconStreamlineUltimateColorColorPalette2 from "~icons/streamline-ultimate-color/color-palette-2";

export default {
  name: "IconBlob",

  props: {
    title: {
      type: String,
      required: false,
    },
    message: {
      type: [String, Array],
      required: false,
    },
    icon: {
      type: String,
      required: false,
    },
    iconColor: {
      type: String,
      required: false,
    },
    link: {
      type: String,
      required: false,
    },
  },

  computed: {
    iconComponent() {
      return this.iconMap[this.icon] || null;
    },
  },

  data() {
    return {
      iconMap: {
        "la:store": IconLaStore,
        "fluent:projection-screen-20-regular":
          IconFluentProjectionScreen20Regular,
        "solar:diagram-up-bold": IconSolarDiagramUpBold,
        "cil:building": IconCilBuilding,
        "ph:map-pin-light": IconPhMapPinLight,
        "streamline-ultimate-color:color-palette":
          IconStreamlineUltimateColorColorPalette,
        "streamline-ultimate-color:desktop-monitor-smiley":
          IconStreamlineUltimateColorDesktopMonitorSmiley,
        "emojione-v1:bull-horn": IconEmojioneV1BullHorn,
        "streamline-ultimate-color:screen-curved":
          IconStreamlineUltimateColorScreenCurved,
        "streamline-ultimate-color:business-deal-handshake-1":
          IconStreamlineUltimateColorBusinessDealHandshake1,
        "fxemoji:housebuilding": IconFxemojiHousebuilding,
        "hugeicons:contact-01": IconHugeiconscContact01,
        "ph:film-reel-light": IconPhFilmReelLight,
        "bi:camera-reels": IconBiCameraReels,
        "teenyicons:headset-outline": IconTeenyiconsHeadsetOutline,
        "streamline-ultimate-color:saving-money-flower":
          IconStreamlineUltimateColorSavingMoneyFlower,
        "streamline-ultimate-color:color-palette-2":
          IconStreamlineUltimateColorColorPalette2,
      },
    };
  },

  methods: {
    formatText(text) {
      return text.replace(/\*/g, "•").replace(/\n/g, "<br>").trim();
    },
  },
};
</script>
