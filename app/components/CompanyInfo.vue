<template>
  <div
    ref="companyInfo"
    class="mt-12 flex w-2/3 flex-wrap justify-center gap-x-3 gap-y-2 justify-self-center text-xs md:col-span-3 md:mt-20 [&>a]:underline [&>a]:opacity-40 [&>a]:hover:opacity-50 [&>p]:opacity-40"
  >
    <p>ADinQ AB</p>
    <p>Fabriksgatan 11, plan 3</p>
    <p>503 38 Borås</p>
    <a href="tel:033-7222400">Tel. 033-72 22 400</a>
    <a href="mailto:info@adinq.se">E-post: info@adinq.se</a>
  </div>
</template>

<script>
export default {
  name: "CompanyInfo",

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
