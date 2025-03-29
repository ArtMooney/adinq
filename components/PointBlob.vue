<template>
  <div class="flex text-left sm:px-0">
    <div class="flex flex-col gap-2 bg-white p-8 sm:max-w-[95%]">
      <h4 v-if="title" class="font-bold">{{ title }}</h4>

      <ul v-if="pointLines" class="flex flex-col space-y-4 leading-normal">
        <li v-for="line in pointLines">{{ line }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "PointBlob",

  props: {
    title: {
      type: String,
      required: false,
    },
    pointLines: {
      type: Array,
      required: false,
    },
  },
};
</script>
