<template>
  <button
    @click="navigateTo({ path: link, hash: hash })"
    class="min-w-40 rounded px-6 py-3 text-center text-sm text-black no-underline duration-200"
    :class="[
      styling === 'dark' ? 'bg-neutral-800 text-white' : 'bg-white/95',
      outline
        ? styling === 'dark'
          ? 'border-2 border-white'
          : 'border-2 border-neutral-900'
        : '',
    ]"
    :type="type"
    :data-wait="dataWait"
    text=""
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "Button",

  props: {
    text: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: false,
    },
    hash: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: true,
    },
    dataWait: {
      type: String,
      required: false,
      default: "",
    },
    styling: {
      type: String,
      required: false,
      default: "dark",
    },
    outline: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>
