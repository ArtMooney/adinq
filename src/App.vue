<script setup>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div
    class="flex min-h-screen flex-col flex-nowrap items-stretch justify-between"
  >
    <div
      class="grid-rows-auto mx-auto grid w-full max-w-screen-2xl grid-cols-1 px-4 sm:px-4"
    >
      <Navbar />
    </div>

    <router-view />

    <div
      class="grid-rows-auto mx-auto grid w-full max-w-screen-2xl grid-cols-1 px-4 sm:px-4"
    >
      <Footer />
    </div>
  </div>
</template>

<script>
export default {
  name: "Framecore",
};
</script>
