<template>
  <ClientOnly>
    <div ref="player">
      <iframe
        src="https://youtu.be/nqwAykRr6hY"
        allowfullscreen
        allowtransparency
        allow="autoplay"
      ></iframe>
    </div>
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

      this.player = new Plyr(this.$refs.player);

      // Valfria konfigurationer
      // this.player.muted = true;
      // this.player.play();
    }
  },
};
</script>
