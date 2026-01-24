<script setup>
import IconHeroiconsXMark20Solid from "~icons/heroicons/x-mark-20-solid";
</script>

<template>
  <div class="fixed inset-0 z-10 flex items-center justify-center bg-black/90">
    <ClientOnly>
      <video
        v-if="videoUrl !== ''"
        ref="qcardVideo"
        autoplay
        disablepictureinpicture
        playsinline
        preload="auto"
        class="h-full w-full object-contain p-4 md:p-8"
        @ended="handleClose"
      >
        <source :src="videoUrl" />
      </video>
    </ClientOnly>

    <div v-if="loadingError" class="bg-[#5e4878]/90 p-8">
      Något gick tyvärr fel när videon skulle visas
    </div>

    <IconHeroiconsXMark20Solid
      @click="handleClose"
      class="absolute top-3 right-4 h-8 min-h-8 w-8 min-w-8 cursor-pointer"
    />
  </div>
</template>

<script>
export default {
  name: "QcardLightbox",

  props: {
    lightboxUrl: {
      type: String,
      required: false,
      default: null,
    },
  },

  data() {
    const config = useRuntimeConfig();
    return {
      userName: config.public.userName,
      userPass: config.public.userPass,
      scrollY: 0,
      originalPaddingRight: 0,
      videoUrl: "",
      loadingError: false,
    };
  },

  async created() {
    this.stopScrolling();
    this.videoUrl = await this.getQcardVideo();
    if (this.videoUrl === "") this.loadingError = true;
  },

  methods: {
    async getQcardVideo() {
      try {
        return await $fetch(
          `/api/qcard?url=${encodeURIComponent(this.lightboxUrl)}`,
          {
            method: "GET",
            headers: {
              Authorization:
                "Basic " + btoa(this.userName + ":" + this.userPass),
            },
          },
        );
      } catch (err) {
        console.error("Failed to fetch Q-card video:", err);
      }
    },

    handleClose() {
      this.$emit("close");
      this.startScrolling();
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
      this.$nextTick(() => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        document.body.style.paddingRight = this.originalPaddingRight;

        window.scrollTo(0, this.scrollY);
      });
    },
  },
};
</script>
