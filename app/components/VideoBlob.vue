<template>
  <ClientOnly>
    <video
      v-if="!errorLoading"
      :src="videoSrc"
      :poster="poster"
      class="aspect-video w-full rounded"
      controls
      aria-label="Videospelare"
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
      videoSrc: "",
      errorLoading: false,
    };
  },

  async mounted() {
    this.videoSrc = (await this.getQcardVideo()) || "";
    this.errorLoading = !this.videoSrc;
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
