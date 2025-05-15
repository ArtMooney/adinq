<template>
  <div class="fixed inset-0 z-100 flex items-center justify-center bg-black/75">
    <div v-if="videoUrl === ''" class="bg-[#5e4878]/90 p-8">
      Något gick tyvärr fel när videon skulle visas
    </div>

    <Icon
      name="heroicons:x-mark-20-solid"
      @click="handleClose"
      class="absolute top-0 right-0 h-8 min-h-8 w-8 min-w-8 bg-[skyblue]"
    />
  </div>
</template>

<script>
export default {
  name: "QcardLightbox",

  props: {
    lightboxUrl: {
      type: String,
      required: false,
      default: null,
    },
  },

  data() {
    return {
      scrollY: 0,
      originalPaddingRight: 0,
    };
  },

  computed: {
    videoUrl() {
      return this.lightboxUrl;
    },
  },

  mounted() {
    this.stopScrolling();

    console.log("HEJ", this.videoUrl);
  },

  methods: {
    handleClose() {
      this.$emit("close");
      this.startScrolling();
    },

    stopScrolling() {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      this.scrollY = window.scrollY;
      this.originalPaddingRight = document.body.style.paddingRight;

      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.position = "fixed";
      document.body.style.top = `-${this.scrollY}px`;
      document.body.style.width = "100%";
    },

    startScrolling() {
      this.$nextTick(() => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        document.body.style.paddingRight = this.originalPaddingRight;

        window.scrollTo(0, this.scrollY);
      });
    },
  },
};
</script>
