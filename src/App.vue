<script setup>
import TopMenu from "./components/TopMenu.vue";
import HeroSection from "./components/HeroSection.vue";
import ContactForm from "./components/ContactForm.vue";
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <TopMenu />
    <HeroSection />
    <ContactForm />
  </div>
</template>

<script>
export default {
  name: "ADinQ",
};
</script>
