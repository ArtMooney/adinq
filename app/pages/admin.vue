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
      v-if="panel === 'login' && !hasLogin"
      @status="handleLoginStatus"
      class="mx-auto w-full max-w-screen-xl"
    />

    <CmsMain v-if="panel === 'cms' && hasLogin" :login="login" />
  </div>
</template>

<script>
export default {
  name: "Admin",

  data() {
    return {
      panel: "",
      login: {},
    };
  },

  computed: {
    hasLogin() {
      return Object.keys(this.login).length > 0;
    },
  },

  mounted() {
    this.checkLogin();
  },

  methods: {
    handleLoginStatus(status) {
      if (status === "ok") {
        this.checkLogin();
        this.panel = "cms";
      } else {
        this.login = {};
        this.panel = "login";
      }
    },

    checkLogin() {
      if (getLocalStorage("adinq-cms")) {
        this.panel = "cms";
        this.login = getLocalStorage("adinq-cms");
      } else {
        this.panel = "login";
      }
    },
  },
};
</script>
