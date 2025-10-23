<template>
  <div class="flex flex-col rounded border border-white/25 bg-neutral-800 p-8">
    <div class="relative">
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        <div
          v-if="galleryData"
          class="group relative mb-6 cursor-pointer"
          v-for="(qcard, index) of galleryData"
        >
          <div
            class="absolute inset-0 z-0 transform-gpu rounded-xl bg-gradient-to-r from-red-400 to-red-800 opacity-0 blur-xl transition-opacity duration-300 ease-in-out group-hover:opacity-60"
          ></div>

          <NuxtImg
            :src="`cms-images/${qcard?.screenshot}`"
            @click="clickedQcard($event, index)"
            class="relative h-full w-full object-cover transition-[filter] duration-300 ease-in-out group-hover:brightness-80"
            sizes="520px sm:300px md:450px"
            densities="x1"
            format="webp"
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

  props: {
    galleryData: {
      type: Array,
      required: false,
      default: [],
    },
  },

  data() {
    return {
      showQcardLightbox: false,
      lightboxUrl: 0,
    };
  },

  methods: {
    clickedQcard(event, index) {
      const link = this.galleryData[index]?.qCardLink;

      if (link) {
        this.lightboxUrl = link;
        this.showQcardLightbox = true;
      }
    },
  },
};
</script>
