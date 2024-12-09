<template>
  <button
    @click="$router.push({ path: link, hash: hash })"
    class="min-w-40 rounded bg-white/95 px-6 py-3 text-center font-exo text-base text-black no-underline duration-500 ease-in-out hover:-translate-x-2 hover:bg-neutral-200 hover:text-black/75"
    :type="type"
    :data-wait="dataWait"
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
  },
};
</script>
