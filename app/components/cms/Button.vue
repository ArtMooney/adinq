<template>
  <button
    @click="$router.push({ path: link, hash: hash })"
    class="min-w-40 rounded px-6 py-3 text-center font-gunplay text-sm uppercase text-black no-underline duration-200 hover:scale-[1.02]"
    :class="[
      styling === 'dark' ? 'bg-[#5e5e5e] text-white' : 'bg-white/95',
      outline
        ? styling === 'dark'
          ? 'border-2 border-white'
          : 'border-2 border-[#5e5e5e]'
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
      required: true,
    },
    styling: {
      type: String,
      required: false,
      default: "light",
    },
    outline: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>
