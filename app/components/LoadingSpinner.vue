<template>
  <div
    class="spinner h-10 w-10 animate-[spin_0.6s_linear_infinite] rounded-full border-[3px] border-white/20 border-t-white"
  ></div>
</template>

<script>
export default {
  name: "LoadingSpinner",
};
</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
