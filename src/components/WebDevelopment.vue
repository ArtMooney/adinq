<script setup>
import Button from "../elements/Button.vue";
</script>

<template>
  <div
    class="my-4 grid min-h-[35rem] grid-cols-1 content-center bg-neutral-800 px-8 pb-12 pt-8 text-white md:grid-cols-slim md:px-0"
  >
    <div class="col-start-2 col-end-2 flex flex-col items-start">
      <h4 class="text-3xl md:text-4xl">Webbutveckling</h4>
      <p class="pb-8">
        Webbappar är den ultimata lösningen för företag som vill automatisera
        och förenkla sina processer. De hjälper till att hålla kunddata
        organiserad, spara tid på tidrapportering och projekt, automatisera
        fakturering och mycket mer. Dessutom kan de enkelt samarbeta och
        integreras med andra verktyg och tjänster, vilket gör det enklare än
        någonsin att hantera och automatisera verksamhetsprocesser. Gör livet
        enklare och öka produktiviteten och lönsamheten med webbappar.
      </p>

      <Button
        text="Kontakta oss"
        link="/contact"
        hash=""
        type="button"
        data-wait=""
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "WebDevelopment",
};
</script>
