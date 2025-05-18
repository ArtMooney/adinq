<script setup>
import { ChevronDownIcon } from "@heroicons/vue/24/solid";
</script>

<template>
  <div class="relative my-8 w-full border-neutral-200 px-4">
    <div class="flex flex-col bg-neutral-100 p-8 px-8 shadow-md">
      <div class="flex cursor-pointer items-center justify-between">
        <h4 v-if="title" class="mt-2 font-bold">{{ title }}</h4>
      </div>

      <template v-for="(line, index) in pointLines" :key="index">
        <template v-if="line?.accordionTitle && line?.accordionLines">
          <div
            class="flex cursor-pointer items-center justify-between sm:justify-start"
            @click="toggleAccordion(index)"
          >
            <div v-html="line?.accordionTitle"></div>

            <ChevronDownIcon
              class="ml-2 h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out"
              :class="[accordionOpen && clickedIndex === index && 'rotate-180']"
            />
          </div>

          <ul
            class="flex max-h-0 origin-top flex-col overflow-hidden leading-normal"
            :class="[accordionOpen && clickedIndex === index && 'max-h-fit']"
          >
            <li
              v-for="(accordionLine, accordionIndex) in line?.accordionLines"
              :key="accordionIndex"
              v-html="accordionLine"
            ></li>
          </ul>
        </template>

        <ul v-else class="flex flex-col space-y-4 leading-normal">
          <li v-html="line"></li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "PointBlock",

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

  data() {
    return {
      accordionOpen: false,
      clickedIndex: 0,
    };
  },

  methods: {
    toggleAccordion(index) {
      this.accordionOpen = !(this.accordionOpen && this.clickedIndex === index);
      this.clickedIndex = index;
    },
  },
};
</script>
