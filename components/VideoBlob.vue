<template>
  <ClientOnly>
    <video ref="videoplayer" class="rounded" muted playsinline preload="none">
      <source src="../assets/videos/ADinQ-RiksSWE.mp4" />
    </video>
  </ClientOnly>
</template>

<script>
export default {
  name: "VideoBlob",

  props: {},

  computed: {},

  data() {
    return {
      player: null,
    };
  },

  async mounted() {
    if (process.client) {
      const { default: Plyr } = await import("plyr");
      await import("plyr/dist/plyr.css");

      this.player = new Plyr(this.$refs.videoplayer);
    }
  },
};
</script>
