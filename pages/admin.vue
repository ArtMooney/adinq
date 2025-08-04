<script setup>
useSeoMeta({
  title: "",
  description: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  twitterCard: "",
  twitterTitle: "",
  twitterDescription: "",
  twitterImage: "",
});

definePageMeta({
  ssr: false,
});
</script>

<template>
  <div class="flex h-full w-full grow items-center justify-center">
    <CmsLogin
      v-if="panel === 'login'"
      @status="handleLoginStatus"
      class="mx-auto w-full max-w-screen-xl"
    />
    <!--    <CmsMain v-if="panel === 'cms'" />-->
  </div>
</template>

<script>
export default {
  name: "Admin",

  data() {
    return {
      panel: "login",
    };
  },

  created() {
    if (getLocalStorage("adinq-cms")) {
      this.panel = "cms";
    }
  },

  methods: {
    handleLoginStatus(status) {
      if (status === "ok") {
        this.panel = "cms";
      } else {
        this.panel = "login";
      }
    },
  },
};
</script>
