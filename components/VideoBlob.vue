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
      const videoModule = await import(this.videoLink);
      this.$refs.videoplayer.src = videoModule.default;

      const { default: Plyr } = await import("plyr");
      await import("plyr/dist/plyr.css");

      this.player = new Plyr(this.$refs.videoplayer);
    }
  },
};
</script>
