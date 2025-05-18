<template>
  <div
    class="flex min-h-screen flex-col flex-nowrap items-stretch justify-between"
  >
    <Navbar @navbarHeight="navbarHeight = $event" />
    <div class="flex flex-grow flex-col bg-neutral-900">
      <slot />
      <div class="mt-auto">
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navbarHeight: 0,
    };
  },

  provide() {
    return {
      navbarHeight: () => this.navbarHeight,
    };
  },
};
</script>
