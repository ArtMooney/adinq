<template>
  <div class="group relative">
    <div
      class="absolute inset-0 transform-gpu rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 blur-xl transition-opacity duration-300 ease-in-out group-hover:opacity-50"
    ></div>

    <div class="relative h-full w-full bg-white/10 p-0.5 shadow-2xl">
      <div
        class="flex h-full w-full flex-col items-center overflow-hidden bg-black/70"
      >
        <div
          class="relative w-full overflow-hidden border-b border-b-white/15 pb-[100%]"
        >
          <div
            class="absolute inset-0 h-full w-full saturate-50"
            :style="{
              backgroundImage: `url(${colleague?.photo[0]?.url})`,
              ...imageTransformStyle,
            }"
            role="img"
            :aria-label="`bild på vår kollega ${colleague.name}`"
          ></div>
        </div>

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
    imageTransformStyle() {
      const adjustX = Number(this.colleague?.adjustx) || 0;
      const adjustY = Number(this.colleague?.adjusty) || 0;
      const zoom = Number(this.colleague?.zoom) || 1;

      const posX = 50 + adjustX;
      const posY = 50 + adjustY;

      return {
        backgroundPosition: `${posX}% ${posY}%`,
        backgroundSize: zoom > 1 ? `${zoom * 100}%` : "cover",
        backgroundRepeat: "no-repeat",
      };
    },
  },
};
</script>
