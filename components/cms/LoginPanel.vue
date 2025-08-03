<!--<script setup>-->
<!--import Button from "../../elements/Button.vue";-->
<!--import Input from "../../elements/Input.vue";-->
<!--import { requiredFields } from "~/utils/requiredFields.js";-->
<!--import { emailValidator } from "~/utils/emailValidator.js";-->
<!--</script>-->

<template>
  <div class="flex flex-col items-center px-4 py-12 md:px-8">
    <form
      @submit.prevent
      class="grid w-full gap-2 sm:w-2/3 md:w-1/2"
      name="login"
    >
      <div>Login</div>

      <CmsInput
        v-model="loginEmail"
        @update-value="loginEmail = $event"
        name="email"
        type="email"
        placeholder-text="Enter email address"
        :required="true"
        autocomplete="email"
      />

      <CmsInput
        v-model="loginPassword"
        @update-value="loginPassword = $event"
        name="password"
        type="password"
        placeholder-text="Enter password"
        autocomplete="current-password"
      />

      <CmsButton
        @click="loginForm"
        :text="buttonText"
        link=""
        hash=""
        type="submit"
        data-wait="Please wait..."
        class="mt-4 !bg-[#548b63] text-white hover:!bg-[#6bad7d]"
      />

      <div
        @click="$emit('resetPasswordPanel')"
        class="flex cursor-pointer justify-self-start text-sm underline hover:text-white/75"
      >
        Forgot your password?
      </div>
    </form>

    <div
      v-if="showStatusMessage"
      class="mt-12 w-full bg-[#a38373] p-4 text-base text-black sm:w-2/3 md:w-1/2"
    >
      {{ statusMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPanel",

  data() {
    return {
      userName: `${import.meta.env.VITE_USERNAME}`,
      userPass: `${import.meta.env.VITE_USERPASS}`,
      loginEmail: "",
      loginPassword: "",
      showStatusMessage: false,
      statusMessage: "",
      buttonText: "Login",
    };
  },

  methods: {
    setLocalStorage(name, value, ttl) {
      const now = new Date();
      const item = {
        value: value,
        expiry: now.getTime() + ttl,
      };
      localStorage.setItem(name, JSON.stringify(item));
    },

    async loginForm(event) {
      if (!emailValidator(event.target.parentElement)) {
        this.statusMessage =
          "One or more email addresses that you have provided do not appear to have a correct format.";
        this.showStatusMessage = true;

        this.clearErrorWhenClicked();
      }

      if (
        requiredFields(event.target.parentElement) &&
        emailValidator(event.target.parentElement)
      ) {
        const savedText = this.buttonText;
        this.buttonText = event.target.dataset.wait;

        const res = await fetch("/login", {
          method: "POST",
          headers: {
            Authorization: "Basic " + btoa(`${this.userName}:${this.userPass}`),
          },
          body: JSON.stringify({
            email: this.loginEmail,
            password: this.loginPassword,
          }),
        });

        const jsonResponse = await res.json();

        if (jsonResponse === "ok") {
          this.showStatusMessage = false;

          this.setLocalStorage(
            "borashv-cms",
            { email: this.loginEmail, password: this.loginPassword },
            1000 * 60 * 43200,
          );

          this.buttonText = savedText;
          this.$emit("status", "ok");
        } else if (jsonResponse === "error") {
          this.statusMessage =
            "Your email or password was not correct, please try again.";
          this.showStatusMessage = true;
          this.buttonText = savedText;

          this.clearErrorWhenClicked();
        } else {
          this.statusMessage =
            "Something went wrong while logging in, please try again.";
          this.showStatusMessage = true;
          this.buttonText = savedText;

          this.clearErrorWhenClicked();
        }
      }
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
