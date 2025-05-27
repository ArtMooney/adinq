<template>
  <div class="group relative">
    <div
      class="absolute inset-0 transform-gpu rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 blur-xl transition-opacity duration-300 ease-in-out group-hover:opacity-75"
    ></div>

    <div class="relative h-full w-full bg-white p-1.5">
      <div class="flex h-full w-full flex-col items-center bg-neutral-800">
        <NuxtImg
          :src="getImageUrl"
          class="aspect-square w-full object-cover saturate-70"
          :alt="`bild på vår kollega ${colleague.name}`"
        />

        <div class="my-3 flex flex-col items-center text-center text-sm">
          <p class="mb-1 font-bold">{{ colleague.name }}</p>
          <p>{{ colleague.title }}</p>
          <a :href="`tel:${colleague.phone}`"
            >Telefon: <span class="underline">{{ colleague.phone }}</span></a
          >
          <a :href="`mailto:${colleague.email}`"
            >Email: <span class="underline">{{ colleague.email }}</span></a
          >
        </div>
      </div>
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
