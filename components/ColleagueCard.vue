<template>
  <div class="group relative">
    <div
      class="absolute inset-0 transform-gpu rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 blur-xl transition-opacity duration-300 ease-in-out group-hover:opacity-50"
    ></div>

    <div class="relative h-full w-full bg-white/10 p-0.5 shadow-2xl">
      <div class="flex h-full w-full flex-col items-center bg-black/70">
        <NuxtImg
          :src="getImageUrl"
          class="aspect-square w-full border-b border-b-white/15 object-cover saturate-70"
          :alt="`bild på vår kollega ${colleague.name}`"
        />

        <div
          class="my-3 flex h-full flex-col items-center justify-center gap-0.5 p-2 text-center text-sm"
        >
          <p class="mb-1 font-bold">{{ colleague.name }}</p>
          <p>{{ colleague.title }}</p>
          <a
            v-if="colleague?.phone"
            :href="`tel:${colleague.phone}`"
            class="flex items-center gap-1"
          >
            <Icon
              name="fluent:phone-48-filled"
              class="h-4.5 min-h-4.5 w-4.5 min-w-4.5"
            ></Icon>

            <span class="underline">{{ colleague.phone }}</span></a
          >
          <a
            v-if="colleague?.email"
            :href="`mailto:${colleague.email}`"
            class="flex items-center gap-1"
          >
            <Icon
              name="streamline:send-email-solid"
              class="h-3 min-h-3 w-3 min-w-3"
            ></Icon>

            <span class="underline">{{ colleague.email }}</span></a
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
};
</script>
