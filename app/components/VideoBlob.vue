<template>
  <ClientOnly>
    <video
      v-if="!errorLoading"
      ref="videoplayer"
      :src="videoSrc"
      :poster="poster"
      class="aspect-video w-full rounded"
      playsinline
      preload="none"
    ></video>
  </ClientOnly>

  <div v-if="errorLoading" class="w-full bg-[#5e4878]/90 p-8 text-center">
    Videon kunde inte laddas
  </div>
</template>

<script>
export default {
  name: "VideoBlob",

  props: {
    videoLink: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: false,
      default: "",
    },
  },

  data() {
    const config = useRuntimeConfig();
    return {
      userName: config.public.userName,
      userPass: config.public.userPass,
      player: null,
      videoSrc: "",
      errorLoading: false,
    };
  },

  async mounted() {
    this.videoSrc = await this.getQcardVideo();

    if (!this.videoSrc) this.errorLoading = true;

    if (this.$refs.videoplayer) {
      this.$refs.videoplayer.src = this.videoSrc;
      import("plyr").then(({ default: Plyr }) => {
        import("plyr/dist/plyr.css");
        this.player = new Plyr(this.$refs.videoplayer);
      });
    }
  },

  methods: {
    async getQcardVideo() {
      try {
        return await $fetch(
          `/api/qcard?url=${encodeURIComponent(this.videoLink)}`,
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
  },
};
</script>
