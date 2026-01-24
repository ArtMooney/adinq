<template>
  <div
    ref="companyInfo"
    class="flex w-2/3 flex-wrap justify-center gap-x-3 gap-y-2 justify-self-center text-xs md:col-span-3 [&>a]:underline [&>a]:opacity-40 [&>a]:hover:opacity-50 [&>p]:opacity-40"
  >
    <p>{{ staticContent.company }}</p>
    <p>{{ staticContent.address }}</p>
    <p>{{ staticContent.address2 }}</p>
    <a :href="`tel:${staticContent.phone}`">Tel. {{ staticContent.phone }}</a>
    <a :href="`mailto:${staticContent.email}`"
      >E-post: {{ staticContent.email }}</a
    >
  </div>
</template>

<script>
import { useStaticContentStore } from "~/stores/static-content.js";

export default {
  name: "CompanyInfo",

  computed: {
    staticContent() {
      return useStaticContentStore().getContentByTitle(
        "component - CompanyInfo",
      ).content;
    },
  },

  mounted() {
    this.addSeparators();
    window.addEventListener("resize", this.addSeparators);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.addSeparators);
  },

  methods: {
    addSeparators() {
      const infoElements = this.$refs.companyInfo.querySelectorAll("a, p");

      for (const [index, infoElement] of infoElements.entries()) {
        if (
          index > 0 &&
          infoElement.offsetTop === infoElements[index - 1].offsetTop
        ) {
          infoElement.classList.add("border-l", "border-white", "pl-3");
        } else {
          infoElement.classList.remove("border-l", "border-white", "pl-3");
        }
      }
    },
  },
};
</script>
