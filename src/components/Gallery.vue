<script setup>
import { Vue3Lottie } from "vue3-lottie";
import loading from "../assets/loading.json";
import ChevronLeft from "../assets/ChevronLeft.vue";
import ChevronRight from "../assets/ChevronRight.vue";
import Xmark from "../assets/Xmark.vue";
</script>

<template>
  <div class="flex flex-col">
    <div v-if="galleryLoader" class="flex justify-center">
      <Vue3Lottie
        ref="lottieSandwich"
        :animationData="loading"
        :width="150"
        :height="150"
      />
    </div>

    <div
      v-if="galleryLightbox"
      class="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black/75"
    >
      <div class="relative flex content-center justify-center object-contain">
        <img
          v-if="imageOrVideo"
          class="relative flex items-center justify-center object-contain p-0 transition-transform duration-300 ease-in-out hover:scale-[1.01] sm:p-20"
          :src="imageLightbox"
        />
        <div
          v-if="!imageOrVideo"
          class="relative flex items-center justify-center object-contain p-0 transition-transform duration-300 ease-in-out hover:scale-[1.01] sm:p-20"
        >
          <video ref="videoplayer" muted playsinline autoplay>
            <source :src="imageLightbox" />
          </video>
        </div>
      </div>
      <div
        class="absolute bottom-0 left-0 right-auto top-0 flex items-center justify-center p-4"
      >
        <div
          class="flex h-12 w-12 cursor-pointer items-center rounded-full border-2 border-solid border-white p-4 hover:opacity-75"
          @click="leftArrow"
        >
          <ChevronLeft style="width: 3rem; height: 3rem" />
        </div>
      </div>
      <div
        class="absolute bottom-0 left-auto right-0 top-0 flex items-center justify-center p-4"
      >
        <div
          class="flex h-12 w-12 cursor-pointer items-center rounded-full border-2 border-solid border-white p-4 hover:opacity-75"
          @click="rightArrow"
        >
          <ChevronRight style="width: 3rem; height: 3rem" />
        </div>
      </div>
      <div class="absolute bottom-auto left-auto right-4 top-4 cursor-pointer">
        <div class="w- inline-block h-6 w-6 hover:opacity-75">
          <Xmark @click="galleryClose" />
        </div>
      </div>
    </div>

    <div class="relative mb-8">
      <div
        v-show="displayGallery"
        class="columns-1 gap-4 sm:columns-2 md:columns-3"
      >
        <div class="mb-4 cursor-pointer" v-for="(image, index) of images">
          <img
            :src="`${thumbsBaseUrl}${image.thumbname}?${getRandomNumber}`"
            @click="showItem($event, index)"
            @load="galleryItemLoaded"
            class="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-[1.01]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Plyr from "plyr";

export default {
  name: "Gallery",

  data() {
    return {
      images: [],
      galleryLightbox: false,
      displayGallery: false,
      imageLightbox: "",
      galleryLoader: true,
      imageOrVideo: true,
      imageIndex: 0,
      loadedThumbs: 0,
      thumbsBaseUrl: `${import.meta.env.VITE_THUMBSBASEURL}`,
      lightboxBaseUrl: `${import.meta.env.VITE_LIGHTBOXBASEURL}`,
      userName: `${import.meta.env.VITE_USERNAME}`,
      userPass: `${import.meta.env.VITE_USERPASS}`,
    };
  },

  async created() {
    this.images = await this.getImageData;
  },

  computed: {
    async getImageData() {
      const url = "/api/gallery";
      const res = await fetch(url, {
        headers: {
          Authorization: "Basic " + btoa(this.userName + ":" + this.userPass),
        },
      });
      return await res.json();
    },

    getRandomNumber() {
      return Math.floor(Math.random() * 9999999999);
    },
  },

  methods: {
    showItem(image, index) {
      const images = JSON.parse(JSON.stringify(this.images));
      if (index < 0) index = images.length - 1;
      if (index > images.length - 1) index = 0;
      this.imageLightbox = `${this.lightboxBaseUrl}${images[index].name}`;

      if (
        images[index].contenttype === "image/jpeg" ||
        images[index].contenttype === "image/png"
      ) {
        if (image) {
          // when image is opened from gallery list
          this.imageOrVideo = true;
          this.galleryLightbox = !this.galleryLightbox;
        } else {
          // when jumping between images in gallery
          this.imageOrVideo = true;
        }
      } else if (images[index].contenttype === "video/mp4") {
        if (image) {
          // when video is opened from gallery list
          this.imageOrVideo = false;
          this.galleryLightbox = !this.galleryLightbox;

          this.$nextTick(() => {
            const player = new Plyr(this.$refs.videoplayer);
            player.muted = true;
            player.play();
          });
        } else {
          // when jumping between videos in gallery
          this.imageOrVideo = false;

          this.$nextTick(() => {
            const player = new Plyr(this.$refs.videoplayer);
            player.muted = true;
            player.play();
          });
        }
      }

      this.imageIndex = index;
    },

    galleryClose() {
      this.galleryLightbox = false;
    },

    leftArrow() {
      this.showItem(null, this.imageIndex - 1);
    },

    rightArrow() {
      this.showItem(null, this.imageIndex + 1);
    },

    galleryItemLoaded(event) {
      this.loadedThumbs = this.loadedThumbs + 1;
      if (this.loadedThumbs === this.images.length) {
        this.displayGallery = true;
        this.galleryLoader = false;
      }
    },
  },
};
</script>

<style scoped>
@import "https://cdn.plyr.io/3.7.8/plyr.css";
</style>
