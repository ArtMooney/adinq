<template>
  <div class="flex flex-col">
    <div class="relative mb-8">
      <div class="columns-1 gap-4 sm:columns-2 md:columns-3">
        <div
          v-if="galleryData"
          class="mb-4 cursor-pointer"
          v-for="(qcard, index) of galleryData"
        >
          <img
            :src="qcard.screenshot[0]?.thumbnails?.card_cover?.url"
            @click="clickedQcard($event, index)"
            class="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-[1.01]"
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
