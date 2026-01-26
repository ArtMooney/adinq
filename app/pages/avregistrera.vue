<script setup>
useNoIndexSeo("Avregistrera");

definePageMeta({
  ssr: true,
});
</script>

<template>
  <div class="flex h-full w-full grow flex-col items-center justify-center">
    <div class="mx-4 my-20 flex flex-col gap-8 sm:mx-8">
      <h4 v-if="!successMessage" class="text-left">
        {{ staticContent.form.title }}
      </h4>

      <form
        v-if="!successMessage"
        @submit.prevent
        name="contact"
        class="flex flex-col items-stretch justify-start gap-4"
      >
        <input
          name="email"
          type="email"
          :placeholder="staticContent.form.input"
          v-model="formData.email"
          required
          autocomplete="email"
        />

        <div class="hidden">
          <input
            name="clientip"
            type="text"
            placeholder="clientip"
            v-model="formData.clientip"
          />

          <input
            name="pageuri"
            type="text"
            placeholder="pageuri"
            v-model="formData.pageuri"
          />

          <input
            name="pagename"
            type="text"
            placeholder="pagename"
            v-model="formData.pagename"
          />

          <input
            name="amex"
            type="text"
            placeholder="amex"
            v-model="formData.amex"
          />
        </div>

        <div class="flex justify-start pt-8">
          <button @click="sendForm" type="submit" class="white text-black!">
            {{ buttonText }}
          </button>
        </div>

        <p class="mt-2 max-w-2xl text-[12px] text-gray-300">
          * När du skickar din email till oss tas du bort från vår maillista.
          Inga uppgifter lagras på denna webbplats.
        </p>
      </form>

      <div v-if="successMessage">
        <div class="my-12 w-full bg-green-900 p-8 text-center">
          {{ emailSuccessMessage }}
        </div>
      </div>

      <div v-if="errorMessage" class="my-12 w-full bg-red-800 p-8 text-center">
        <p>{{ defaultEmailMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useStaticContentStore } from "~/stores/static-content.js";

export default {
  name: "Avregistrera",

  computed: {
    staticContent() {
      return useStaticContentStore().getContentByTitle("page - Avregistrera")
        .content;
    },
  },

  data() {
    const config = useRuntimeConfig();

    return {
      userName: config.public.userName,
      userPass: config.public.userPass,
      formData: {
        email: "",
        subject: "avregistrera",
        clientip: "",
        pageuri: "",
        pagename: "",
        amex: "",
      },
      buttonText: "Skicka",
      buttonTextWait: "Vänta...",
      defaultEmailMessage:
        "Något gick fel när avregistreringen skulle skickas.",
      emailSuccessMessage: `Ni kommer nu att tas bort från vår maillista.`,
      emailErrorMessage:
        "En eller flera emailadresser som ni har angett tycks inte ha ett korrekt format.",
      contactForm: true,
      successMessage: false,
      errorMessage: false,
    };
  },

  async created() {
    const res = await fetch("https://api.ipify.org?format=json");
    const ip = await res.json();
    this.formData.clientip = ip.ip;
  },

  mounted() {
    this.formData.pageuri = window.location.href;
    this.formData.pagename = document.title;
  },

  methods: {
    async sendForm(event) {
      event.target.disabled = true;

      if (!this.emailValidator(event.target.form)) {
        const savedErrorMessage = this.defaultEmailMessage;
        this.defaultEmailMessage = this.emailErrorMessage;
        this.errorMessage = true;

        setTimeout(() => {
          window.addEventListener(
            "click",
            () => {
              this.errorMessage = false;
              this.defaultEmailMessage = savedErrorMessage;
            },
            { once: true },
          );
        }, 500);
      }

      if (
        this.requiredFields(event.target.form) &&
        this.emailValidator(event.target.form)
      ) {
        let res = null;
        let error = null;

        try {
          res = await $fetch("/api/unsubscribe", {
            method: "POST",
            headers: {
              Authorization:
                "Basic " + btoa(this.userName + ":" + this.userPass),
            },
            body: this.objectToFormData(this.formData),
          });
        } catch (err) {
          error = err;
          this.errorMessage = true;
        }

        if (error) {
          this.errorMessage = true;
        } else if (res.success) {
          const savedText = this.buttonText;
          this.buttonText = this.buttonTextWait;

          this.$router.push({
            hash: "#kontakta-oss",
          });

          setTimeout(() => {
            this.contactForm = false;
            this.successMessage = true;
            this.buttonText = savedText;
          }, 1500);
        }
      } else {
        event.target.disabled = false;
      }
    },

    emailValidator(form) {
      const emailReg =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;

      let emailVerificationError = true;
      const inputs = form.querySelectorAll("input");

      for (const input of inputs) {
        if (input.type === "email" && !emailReg.test(input.value)) {
          emailVerificationError = false;
        }
      }

      return emailVerificationError;
    },

    requiredFields(form) {
      const inputs = form.querySelectorAll("input");
      const textareas = form.querySelectorAll("textarea");
      const selectors = form.querySelectorAll("select");
      let requiredFilled = true;
      let radioButtonNames = [];

      for (const input of inputs) {
        if (input.required) {
          if (!input.value) requiredFilled = false;
          if (input.type === "checkbox" && !input.checked)
            requiredFilled = false;
          if (input.type === "radio") radioButtonNames.push(input.dataset.name); // push to list with radiobutton groups
        }
      }

      radioButtonNames = [...new Set(radioButtonNames)]; // removes duplicates

      for (const name of radioButtonNames) {
        let radioButtonCleared = 0;
        for (const input of inputs) {
          if (input.type === "radio" && input.dataset.name === name) {
            if (input.checked) radioButtonCleared++;
          }
        }
        if (!radioButtonCleared) requiredFilled = false;
      }

      for (const input of textareas) {
        if (input.required) {
          if (!input.value) requiredFilled = false;
        }
      }

      for (const input of selectors) {
        if (input.required) {
          if (!input.value) requiredFilled = false;
        }
      }

      return requiredFilled;
    },

    objectToFormData(obj) {
      const formData = new FormData();
      Object.keys(obj).forEach((key) => {
        formData.append(key, obj[key]);
      });

      return formData;
    },
  },
};
</script>
