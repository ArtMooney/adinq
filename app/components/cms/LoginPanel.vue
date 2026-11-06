<template>
  <div class="flex flex-col items-center px-4 py-12 md:px-8">
    <form
      @submit.prevent="loginForm"
      class="grid w-full gap-2 sm:w-2/3 md:w-1/2"
      name="login"
    >
      <div>Login</div>

      <input
        v-model="loginEmail"
        name="email"
        type="email"
        placeholder="Enter email address"
        required
        autocomplete="email"
        class="text-base"
      />

      <input
        v-model="loginPassword"
        name="password"
        type="password"
        placeholder="Enter password"
        autocomplete="current-password"
        required
        class="text-base"
      />

      <button
        type="submit"
        data-wait="Please wait..."
        :disabled="loginStore.pending"
        class="mt-4 bg-[#548b63]! text-white hover:bg-[#6bad7d]!"
      >
        {{ buttonText }}
      </button>

      <div
        @click="$emit('resetPasswordSwitch')"
        class="flex cursor-pointer justify-self-start text-sm underline hover:text-neutral-400"
      >
        Forgot your password?
      </div>
    </form>

    <div
      v-if="showStatusMessage"
      class="mt-12 w-full bg-orange-400/70 p-4 text-base text-black sm:w-2/3 md:w-1/2"
    >
      {{ statusMessage }}
    </div>
  </div>
</template>

<script>
import { useLoginStore } from "~/components/cms/stores/loginStore";

export default {
  name: "LoginPanel",

  data() {
    return {
      loginEmail: "",
      loginPassword: "",
      showStatusMessage: false,
      statusMessage: "",
      buttonText: "Login",
    };
  },

  computed: {
    loginStore() {
      return useLoginStore();
    },
  },

  methods: {
    async loginForm(event) {
      if (this.loginStore.pending) return;

      const form = event.currentTarget;

      if (!emailValidator(form)) {
        this.statusMessage =
          "One or more email addresses that you have provided do not appear to have a correct format.";
        this.showStatusMessage = true;

        this.clearErrorWhenClicked();
      }

      if (requiredFields(form) && emailValidator(form)) {
        const savedText = this.buttonText;
        this.buttonText = "Please wait...";

        try {
          await this.loginStore.login(this.loginEmail, this.loginPassword);
          this.showStatusMessage = false;
        } catch (err) {
          this.statusMessage =
            err.statusMessage || "Something went wrong. Please try again.";
          this.showStatusMessage = true;
          this.clearErrorWhenClicked();
        } finally {
          this.loginPassword = "";
          this.buttonText = savedText;
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
