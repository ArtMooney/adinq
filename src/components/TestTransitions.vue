<script setup></script>

<template>
  <button
    style="background-color: coral"
    @click="showTransition = !showTransition"
  >
    KLICKA HÄR
  </button>
  <Transition name="testTransition">
    <div v-if="showTransition" class="default-style">HEJ</div>
  </Transition>
</template>

<script>
export default {
  name: "Home",

  data() {
    return {
      showTransition: false,
    };
  },

  methods: {},
};
</script>

<style>
.default-style {
  background-color: skyblue;
}

.testTransition-enter-active,
.testTransition-leave-active {
  transition: opacity 0.5s ease;
}

.testTransition-enter-from,
.testTransition-leave-to {
  opacity: 0;
}
</style>
