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
  ssr: true,
});
</script>

<template>
  <div
    class="relative mx-[calc(-50vw+50%)] min-h-80 w-screen"
    :style="{
      height: `${windowHeight - navHeight}px`,
    }"
  >
    <NuxtImg
      src="krakenimages-Y5bvRlcCx8k-unsplash.jpg"
      alt=""
      class="h-full w-full object-cover"
      sizes="1000px md:2000px"
      width="6336"
      height="9504"
      densities="x1"
      format="webp"
    />

    <div class="absolute inset-0 bg-[#2f3f4d]/50"></div>

    <div
      class="absolute inset-0 flex flex-col items-center justify-center text-center"
    >
      <h1 class="mx-10 mb-8 md:mx-30">Kontakta oss</h1>

      <NuxtLink
        :to="{ path: '/kontakta-oss', hash: '#kontakta-oss' }"
        class="absolute bottom-8 flex w-full items-center justify-center"
      >
        <Icon
          name="qlementine-icons:chevron-double-down-16"
          class="h-12 min-h-12 w-12 min-w-12 cursor-pointer opacity-70 hover:opacity-100"
        ></Icon>
      </NuxtLink>
    </div>
  </div>

  <div
    id="kontakta-oss"
    class="my-32 flex max-w-5xl flex-col gap-8 px-4 sm:px-8 lg:mx-auto"
  >
    <h3 class="text-center sm:px-8 md:px-12">
      Välkomna att kontakta oss för offert eller andra frågor.
    </h3>

    <p class="mb-12 text-center sm:px-16 md:px-32">
      Vi som svarar i telefon eller på mejlen sitter i Borås, där ADinQ har sitt
      hjärta. Vi gör allt vi kan för att hjälpa dig med din förfrågan snabbt och
      enkelt.
    </p>

    <form v-if="contactForm" @submit.prevent name="contact">
      <Input
        name="name"
        type="text"
        placeholder-text="Namn"
        :required="true"
        auto-complete="name"
      />

      <Input
        name="email"
        type="email"
        placeholder-text="E-post"
        :required="true"
        auto-complete="email"
      />

      <Input
        name="company"
        type="text"
        placeholder-text="Företagsnamn"
        :required="true"
        auto-complete="organization"
      />

      <Input
        name="phone"
        type="tel"
        placeholder-text="Telefon"
        :required="true"
        auto-complete="tel"
      />

      <Input
        name="city"
        type="text"
        placeholder-text="Stad"
        :required="true"
        auto-complete="address-level2"
      />

      <Input
        name="message"
        type="message"
        placeholder-text="Meddelande"
        :required="true"
      />

      <div class="hidden">
        <Input
          name="clientip"
          type="text"
          placeholder-text="clientip"
          :required="false"
          label-text=""
          v-model="extraFields.clientip"
        />

        <Input
          name="pageuri"
          type="text"
          placeholder-text="pageuri"
          :required="false"
          label-text=""
          v-model="extraFields.pageuri"
        />

        <Input
          name="pagename"
          type="text"
          placeholder-text="pagename"
          :required="false"
          label-text=""
          v-model="extraFields.pagename"
        />

        <Input
          name="amex"
          type="text"
          placeholder-text="amex"
          :required="false"
          label-text=""
          v-model="extraFields.amex"
        />
      </div>

      <div class="flex justify-start pt-8">
        <Button
          @click="sendForm"
          :text="buttonText"
          link=""
          hash=""
          type="submit"
          styling="light"
        />
      </div>

      <p class="mt-6 max-w-2xl text-[12px] text-gray-300">
        * När du skickar detta formulär vidarebefordras dina uppgifter endast
        via e-post till ADinQ AB för att kunna svara på din förfrågan.
        Uppgifterna lagras inte på denna webbplats.
      </p>
    </form>

    <div v-if="successMessage">
      <div class="mx-4 my-20 mt-8 bg-blue-200 p-8 sm:mx-8 md:mx-20 xl:mx-52">
        {{ emailSuccessMessage }}
      </div>
    </div>

    <div
      v-if="errorMessage"
      class="mx-4 my-20 mt-8 bg-pink-100 p-8 sm:mx-8 md:mx-20 xl:mx-52"
    >
      <p>{{ defaultEmailMessage }}</p>
    </div>
  </div>
</template>

<script>
import Button from "../components/elements/Button.vue";
import Input from "../components/elements/Input.vue";

export default {
  name: "KontaktaOss",

  components: {
    Button,
    Input,
  },

  inject: ["navbarHeight"],

  data() {
    const config = useRuntimeConfig();

    return {
      userName: config.public.userName,
      userPass: config.public.userPass,
      extraFields: {
        clientip: "",
        pageuri: "",
        pagename: "",
        amex: "",
      },
      buttonText: "Skicka",
      buttonTextWait: "Vänta...",
      defaultEmailMessage: "Något gick fel när formuläret skulle skickas.",
      emailSuccessMessage: `Tack för ert meddelande! Vi återkommer till er snart!`,
      emailErrorMessage:
        "En eller flera emailadresser som ni har angett tycks inte ha ett korrekt format.",
      contactForm: true,
      successMessage: false,
      errorMessage: false,
      windowHeight: 0,
    };
  },

  computed: {
    navHeight() {
      return this.navbarHeight();
    },
  },

  async created() {
    const res = await fetch("https://api.ipify.org?format=json");
    const ip = await res.json();
    this.extraFields.clientip = ip.ip;
  },

  mounted() {
    this.windowHeight = window.innerHeight;
    window.addEventListener("resize", this.handleResize);

    this.extraFields.pageuri = window.location.href;
    this.extraFields.pagename = document.title;
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    handleResize() {
      this.windowHeight = window.innerHeight;
    },

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
          res = await $fetch("/api/contact", {
            method: "POST",
            headers: {
              Authorization:
                "Basic " + btoa(this.userName + ":" + this.userPass),
            },
            body: this.formCollector(event.target.form, this.extraFields),
          });
        } catch (err) {
          error = err;
          this.errorMessage = true;
        }

        if (error) {
          this.errorMessage = true;
        } else if (res.success) {
          console.log(res, error);

          const savedText = this.buttonText;
          this.buttonText = this.buttonTextWait;

          setTimeout(() => {
            this.contactForm = false;
            this.successMessage = true;
            this.buttonText = savedText;

            this.$router.push({
              hash: "#kontakta-oss",
            });
          }, 1500);
        }
      } else {
        event.target.disabled = false;
      }
    },

    emailValidator(form) {
      const emailReg =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;

      let emailVerificationError = false;
      const inputs = form.querySelectorAll("input");

      for (const input of inputs) {
        if (input.type === "email" && emailReg.test(input.value)) {
          emailVerificationError = true;
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

    formCollector(form, extraFields) {
      let formData = new FormData();
      formData.append("form-name", form.name);

      for (const item of form.querySelectorAll("input")) {
        if (item.type !== "submit") {
          if (item.type === "file") {
            if (item.files[0]) {
              for (const file of item.files) {
                formData.append(item.name, file, file.name);
              }
            }
          } else if (
            item.name !== "gdpr-confirm" &&
            item.name !== "clientip" &&
            item.name !== "pageuri" &&
            item.name !== "pagename" &&
            item.name !== "amex"
          ) {
            if (item.type === "checkbox") {
              formData.append(item.name, item.checked);
            } else if (item.type === "radio") {
              formData.append(item.name, item.checked);
            } else {
              formData.append(item.name, item.value);
            }
          }
        }
      }

      for (const item of form.querySelectorAll("textarea")) {
        formData.append(item.name, item.value);
      }

      for (const item of form.querySelectorAll("select")) {
        formData.append(item.name, item.value);
      }

      if (extraFields) {
        for (const [key, value] of Object.entries(extraFields)) {
          formData.append(key, value);
        }
      }

      return formData;
    },
  },
};
</script>
