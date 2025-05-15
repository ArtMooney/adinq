<template>
  <div class="flex flex-col rounded border border-white/25 bg-neutral-800 p-8">
    <div class="relative mb-8">
      <div class="columns-1 gap-8 sm:columns-2 md:columns-3">
        <div
          v-if="galleryData"
          class="group relative mb-4 cursor-pointer"
          v-for="(qcard, index) of galleryData"
        >
          <div
            class="absolute inset-0 z-0 transform-gpu rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 blur-xl transition-opacity duration-300 ease-in-out group-hover:opacity-50"
          ></div>

          <img
            :src="qcard.screenshot[0]?.thumbnails?.card_cover?.url"
            @click="clickedQcard($event, index)"
            class="relative h-full w-full object-cover transition-[filter] duration-300 ease-in-out group-hover:brightness-80"
          />
        </div>
      </div>
    </div>

    <QcardLightbox
      v-if="showQcardLightbox"
      :lightboxUrl="lightboxUrl"
      @close="showQcardLightbox = false"
    ></QcardLightbox>
  </div>
</template>

<script>
export default {
  name: "QcardGallery",

  data() {
    const config = useRuntimeConfig();
    return {
      galleryData: null,
      userName: config.public.userName,
      userPass: config.public.userPass,
      error: false,
      showQcardLightbox: false,
      lightboxUrl: 0,
    };
  },

  async created() {
    try {
      this.galleryData = await $fetch("/api/get-mediaproduktioner", {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa(this.userName + ":" + this.userPass),
        },
      });

      console.log(this.galleryData);
    } catch (err) {
      this.error = true;
    }
  },

  methods: {
    clickedQcard(event, index) {
      this.lightboxUrl = this.galleryData[index]["q-card-link"];
      this.showQcardLightbox = true;
    },
  },
};
</script>
