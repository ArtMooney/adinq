<template>
  <div class="group relative h-fit w-full bg-pink-500 p-3">
    <div
      class="absolute inset-0 z-0 transform-gpu rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 blur-xl transition-opacity duration-300 ease-in-out group-hover:opacity-50"
    ></div>

    <div class="relative flex h-full w-full flex-col items-center bg-[skyblue]">
      <NuxtImg
        :src="getImageUrl"
        class="h-96 max-h-96 w-full object-cover"
        :alt="`bild på vår kollega ${colleague.name}`"
      />

      <div>{{ colleague.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ColleagueCard",

  props: {
    colleague: {
      type: Object,
      required: false,
      default: {},
    },
  },

  computed: {
    getImageUrl() {
      return this.colleague?.photo[0]?.url || "silhouette.jpg";
    },
  },

  data() {
    return {
      frameColors: ["#ff0000", "#00ff00", "#0000ff"],
    };
  },

  mounted() {
    console.log(this.colleague);
  },
};
</script>
