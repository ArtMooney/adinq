<template>
  <ClientOnly>
    <video
      ref="videoplayer"
      :src="videoSrc"
      class="aspect-video w-full rounded"
      muted
      playsinline
      preload="none"
    ></video>
  </ClientOnly>
</template>

<script>
export default {
  name: "VideoBlob",

  props: {
    videoLink: {
      type: String,
      required: true,
    },
  },

  data() {
    const config = useRuntimeConfig();
    return {
      userName: config.public.userName,
      userPass: config.public.userPass,
      player: null,
      videoSrc: "",
    };
  },

  async mounted() {
    this.videoSrc = await this.getQcardVideo();

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
