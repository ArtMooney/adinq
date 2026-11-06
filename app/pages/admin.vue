<script setup>
useNoIndexSeo("Admin");

definePageMeta({
  ssr: false,
});
</script>

<template>
  <div class="flex w-full grow items-center justify-center">
    <CmsLoadingSpinner v-if="restoringSession" class="my-32" />
    <div v-else-if="sessionError" class="my-32 text-center">
      <p>{{ sessionError }}</p>
      <button type="button" @click="restoreSession">Försök igen</button>
    </div>
    <CmsLogin
      v-else-if="passwordReset || !loginStore.isValid"
      class="mx-auto w-full max-w-7xl"
    />
    <CmsMain v-else />
  </div>
</template>

<script>
import { useLoginStore } from "~/components/cms/stores/loginStore";

export default {
  name: "Admin",

  data() {
    return {
      restoringSession: true,
      sessionError: "",
      passwordReset: false,
    };
  },

  computed: {
    loginStore() {
      return useLoginStore();
    },
  },

  watch: {
    "loginStore.user"(user) {
      if (user && !this.restoringSession) this.passwordReset = false;
    },
  },

  async mounted() {
    this.passwordReset = new URLSearchParams(window.location.search).has(
      "validation",
    );
    await this.restoreSession();
  },

  methods: {
    async restoreSession() {
      this.restoringSession = true;
      this.sessionError = "";

      try {
        await this.loginStore.initialize();
        await this.$nextTick();
      } catch {
        this.sessionError = "Det gick inte att kontrollera din inloggning.";
      } finally {
        this.restoringSession = false;
      }
    },
  },
};
</script>
