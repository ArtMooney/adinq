<template>
  <div class="py-32">
    <CmsLoginPanel
      v-if="panel === 'login'"
      @reset-password-panel="resetPasswordSwitch"
      @status="$emit('status', $event)"
    />

    <CmsResetPasswordPanel
      v-if="panel === 'resetPassword'"
      @login-switch="loginSwitch"
    />

    <CmsNewPasswordPanel
      v-if="panel === 'newPassword'"
      :validation="validationCode"
      @login-switch="loginSwitch"
    />

    <CmsLoadingSpinner v-if="panel === 'loading'" class="justify-self-center" />

    <div class="flex flex-col items-center px-4 md:px-8">
      <div
        v-if="showStatusMessage"
        class="w-full justify-self-center bg-[#a38373] p-4 text-base text-black sm:w-2/3 md:w-1/2"
      >
        {{ statusMessage }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",

  data() {
    const config = useRuntimeConfig();

    return {
      panel: "login",
      userName: config.public.userName,
      userPass: config.public.userPass,
      validationCode: "",
      showStatusMessage: false,
      statusMessage: "Couldn't validate your code, rerouted to the login page.",
    };
  },

  async mounted() {
    await this.loginHandler();
  },

  methods: {
    async loginHandler() {
      const hrefCheck = window.location.href.split("?");
      let isPasswordSwitch = false;

      if (hrefCheck.length > 1) {
        const varCheck = hrefCheck[1].split("=");

        if (varCheck[0] === "validation" && varCheck[1]) {
          this.panel = "loading";

          try {
            const res = await $fetch("/api/cms/validate", {
              method: "POST",
              headers: {
                Authorization:
                  "Basic " + btoa(this.userName + ":" + this.userPass),
              },
              body: JSON.stringify({
                validation: varCheck[1],
              }),
            });

            isPasswordSwitch = true;
            this.validationCode = varCheck[1];
          } catch (err) {
            this.showStatusMessage = true;
            this.clearErrorWhenClicked();
          }
        }
      }

      if (isPasswordSwitch) {
        this.newPasswordSwitch();
      } else if (!getLocalStorage("adinq-cms")) {
        this.loginSwitch();
      }
    },

    loginSwitch() {
      this.panel = "login";

      const urlWithoutQueryString = window.location.href.split("?")[0];
      history.replaceState({}, document.title, urlWithoutQueryString);
    },

    resetPasswordSwitch() {
      this.panel = "resetPassword";

      const urlWithoutQueryString = window.location.href.split("?")[0];
      history.replaceState({}, document.title, urlWithoutQueryString);
    },

    newPasswordSwitch() {
      this.panel = "newPassword";

      const urlWithoutQueryString = window.location.href.split("?")[0];
      history.replaceState({}, document.title, urlWithoutQueryString);
    },

    clearErrorWhenClicked() {
      setTimeout(() => {
        window.addEventListener(
          "click",
          () => {
            this.showStatusMessage = false;
          },
          { once: true },
        );
      }, 500);
    },
  },
};
</script>
