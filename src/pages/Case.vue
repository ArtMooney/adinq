<script setup>
import Gallery from "../components/Gallery.vue";
</script>

<template>
  <div
    class="grid-rows-auto mx-auto grid w-full max-w-screen-2xl grid-cols-1 px-4 sm:px-4"
  >
    <Gallery />
  </div>
</template>

<script>
export default {
  name: "Case",
  head: {
    title: "Galleri - Webb- och 3D-Animationstjänster | FrameCore 2024",
    meta: [
      {
        name: "keywords",
        content:
          "webb- och 3D-animation, galleri, bilder, animationer, portfolio, FrameCore 2024",
      },
      { name: "robots", content: "index, follow" },
      {
        name: "description",
        content:
          "Utforska vårt galleri av inspirerande webb- och 3D-animationer. Upptäck vår portfolio med kreativa lösningar för ditt företag. Drivs av FrameCore 2024.",
      },
      {
        property: "og:title",
        content: "Galleri - Webb- och 3D-Animationstjänster | FrameCore 2024",
      },
      {
        property: "og:description",
        content:
          "Utforska vårt galleri av inspirerande webb- och 3D-animationer. Upptäck vårt portfolio med kreativa lösningar för ditt företag. Drivs av FrameCore 2024.",
      },
      {
        property: "og:image",
        content:
          "https://filedn.com/lODGkE8bRyjVm8tpT986SXj/framecore/dev/thumbs/MysticalJungleRide_1500px_post.jpg",
      },
    ],
  },
};
</script>
