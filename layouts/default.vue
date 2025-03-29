<template>
  <div
    class="flex min-h-screen flex-col flex-nowrap items-stretch justify-between"
  >
    <Navbar />
    <div class="flex flex-grow flex-col">
      <slot />
      <div class="mt-auto">
        <Footer />
      </div>
    </div>
  </div>
</template>
