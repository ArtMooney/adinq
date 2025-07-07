<template>
  <NuxtLink
    to="/kontakta-oss"
    class="group relative min-h-52 cursor-pointer rounded border border-white/25"
  >
    <div
      class="absolute inset-0 z-0 transform-gpu rounded-xl bg-gradient-to-r from-red-400 to-red-800 opacity-0 blur-xl transition-opacity duration-300 ease-in-out group-hover:opacity-60"
    ></div>

    <div
      class="relative flex h-full w-full flex-col gap-2 rounded bg-neutral-900 p-8 pb-12"
    >
      <Icon
        v-if="iconOrder < 4"
        :name="
          iconOrder === 1
            ? 'emojione:money-bag'
            : iconOrder === 2
              ? 'emojione:handshake-medium-light-skin-tone'
              : 'streamline-kameleon-color:chart-pie'
        "
        class="relative mb-3 h-14 max-h-14 min-h-14 w-14 max-w-14 min-w-14"
        :style="{ color: '#6293a5' }"
      ></Icon>

      <div v-if="iconOrder < 4" class="mb-6 h-[1px] w-2/3 bg-white/25"></div>

      <p
        :class="[
          'bg-gradient-to-r to-transparent text-xl',
          iconOrder === 1 && 'from-red-400/75',
          iconOrder === 2 && 'from-yellow-400/75',
          iconOrder === 3 && 'from-blue-400/75',
          iconOrder > 3 && 'mb-2 underline',
        ]"
      >
        {{ data.title }}
      </p>
      <p>{{ data.monthly }}</p>
      <p>{{ data.total }}</p>

      <div v-if="iconOrder > 3" class="mt-6 h-[1px] w-2/3 bg-white/25"></div>

      <p class="mt-6 text-sm" v-html="formattedDetails"></p>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  name: "PriceBlob",

  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  computed: {
    formattedDetails() {
      return this.data.details.replace(/\n/g, "<br>");
    },

    iconOrder() {
      return Number(this.data.order);
    },
  },
};
</script>
