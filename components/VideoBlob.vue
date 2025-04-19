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
    return {
      player: null,
      videoSrc: "",
    };
  },

  async mounted() {
    if (process.client) {
      this.$nextTick(() => {
        if (this.$refs.videoplayer) {
          this.$refs.videoplayer.src = this.videoLink;

          import("plyr").then(({ default: Plyr }) => {
            import("plyr/dist/plyr.css");
            this.player = new Plyr(this.$refs.videoplayer);
          });
        }
      });
    }
  },
};
</script>
