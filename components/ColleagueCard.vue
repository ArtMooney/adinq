<template>
  <div class="group relative h-[30rem] w-full bg-pink-500 p-3">
    <div
      class="absolute inset-0 z-0 transform-gpu rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 blur-xl transition-opacity duration-300 ease-in-out group-hover:opacity-50"
    ></div>

    <div class="relative h-full w-full">
      <img :src="colleague.photo[0].url" class="h-full w-full object-cover" />

      {{ colleague.name }}
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
