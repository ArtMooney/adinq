<template>
  <router-link
    class="group flex items-center no-underline transition-transform duration-300 ease-in-out hover:scale-[1.03]"
    :to="{ path: path, hash: hash }"
  >
    <slot></slot>

    <div class="relative ml-2 h-5 w-5">
      <component
        :is="icon"
        class="absolute bottom-0 left-[-16%] right-0 top-[-9%] h-6 w-6 text-[#48b5f8] opacity-0 blur transition-opacity duration-300 ease-in-out group-hover:opacity-100"
      />
      <component
        :is="icon"
        class="absolute bottom-0 left-0 right-0 top-0 h-5 w-5 text-[#c2a66d] transition-opacity duration-300 ease-in-out"
      />
    </div>
  </router-link>
</template>

<script>
export default {
  name: "NavbarLink",

  props: {
    path: {
      type: String,
      required: true,
    },
    hash: {
      type: String,
      required: true,
    },
    icon: {
      type: Object,
      required: true,
    },
  },
};
</script>
