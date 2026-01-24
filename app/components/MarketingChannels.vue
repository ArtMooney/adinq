<template>
  <h3 class="mt-32 text-center">
    {{ staticContent.title }}
  </h3>

  <div class="mt-4 grid gap-8 md:grid-cols-2">
    <IconBlob
      icon="la:store"
      icon-color="#6293a5"
      :message="formatText(staticContent.butiksTv)"
      link="/butiks-tv"
    ></IconBlob>

    <IconBlob
      icon="fluent:projection-screen-20-regular"
      icon-color="#b9a966"
      :message="formatText(staticContent.storbildsskarmar)"
      link="/storbildsskarmar"
    ></IconBlob>

    <IconBlob
      icon="solar:diagram-up-bold"
      icon-color="#a55c7c"
      :message="formatText(staticContent.mediebyraer)"
      link="/mediabyraer"
    ></IconBlob>

    <IconBlob
      icon="cil:building"
      icon-color="#5b9652"
      :message="formatText(staticContent.kommersialisera)"
      link="/kommersialisera"
    ></IconBlob>

    <IconBlob
      icon="ph:map-pin-light"
      icon-color="#605296"
      :message="formatText(staticContent.marknadsplatskarta)"
      link="/marknadsplatskarta"
    ></IconBlob>
  </div>
</template>

<script>
import { useStaticContentStore } from "~/stores/static-content.js";

export default {
  name: "MarketingChannels",

  computed: {
    staticContent() {
      return useStaticContentStore().getContentByTitle(
        "component - MarketingChannels",
      ).content;
    },
  },
};
</script>
