<template>
  <div class="relative min-h-screen">
    <video
      :src="videoSource"
      ref="backgroundVideo"
      class="absolute top-0 left-0 w-full h-full object-cover"
      muted
      autoplay
      loop
      playsinline
    ></video>

    <div
      class="relative z-10 flex flex-col items-center justify-center min-h-screen text-white text-center px-4"
    >
      <h1 class="text-5xl md:text-6xl font-bold mb-4">
        Vi hjälper er att nå ut digitalt!
      </h1>
      <h2 class="text-2xl md:text-3xl mb-8">
        Lokalt, regionalt eller rikstäckande - just DOOH* it!
      </h2>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full">
        <MarketingButton
          v-for="button in marketingButtons"
          :key="button.text"
          :icon="button.icon"
          :text="button.text"
          :link="button.link"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MarketingButton from "./MarketingButton.vue";
import desktopVideo from "../assets/videos/folkmassa.mp4";
import mobileVideo from "../assets/videos/folkmassa_mob.mp4";

export default {
  components: { MarketingButton },
  data() {
    return {
      isMobile: window.innerWidth < 768,
      marketingButtons: [
        {
          text: "BUTIKS-TV",
          icon: "tv",
          link: "/butiks-tv",
        },
        {
          text: "STORBILDSSKÄRMAR",
          icon: "monitor",
          link: "/storbildsskarmar",
        },
        {
          text: "MEDIABYRÅER",
          icon: "eye",
          link: "/mediabyraer",
        },
        {
          text: "FÖR FASTIGHETSÄGARE",
          icon: "building",
          link: "/kommersialisera",
        },
      ],
    };
  },

  computed: {
    videoSource() {
      return this.isMobile ? mobileVideo : desktopVideo;
    },
  },

  mounted() {
    window.addEventListener("resize", this.checkMobile);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.checkMobile);
  },

  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth < 768;
    },
  },
};
</script>
