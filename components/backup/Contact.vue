<script setup>
import Button from "./elements/Button.vue";
import Input from "./elements/Input.vue";
import { requiredFields } from "../utils/requiredFields.js";
import { emailValidator } from "../utils/emailValidator.js";
import { formCollector } from "../utils/formCollector.js";
</script>

<template>
  <div>
    <div class="h-[30vh] min-h-96 w-full md:h-[40vh] lg:h-[60vh]">
      <NuxtImg
        src="portar.jpg"
        alt="an image of large scala garage doors made for industrial use"
        class="relative h-full w-full object-cover"
        sizes="1000px md:2000px"
        width="2000"
        height="1333"
      />
    </div>
  </div>

  <div id="contact" class="py-20 md:py-32">
    <h2 class="mb-24 w-full px-4 text-center text-4xl md:text-6xl lg:mb-32">
      Kontakta oss
    </h2>

    <div class="mx-4 p-4 sm:mx-8 md:mx-20 md:p-8 lg:text-center xl:mx-52">
      <h4 class="font-bold">
        Välkomna att kontakta oss för offert eller andra frågor.
      </h4>
      <p>Vi ser fram emot att höra från er.</p>
    </div>

    <form
      v-if="contactForm"
      @submit.prevent
      name="contact"
      class="mx-4 bg-gray-50 p-4 sm:mx-8 md:mx-20 md:p-8 xl:mx-52"
    >
      <Input
        name="company"
        type="text"
        placeholder-text="Företagsnamn"
        :required="true"
        autocomplete="company"
      />

      <Input
        name="email"
        type="email"
        placeholder-text="E-post"
        :required="true"
        autocomplete="email"
      />

      <Input
        name="phone"
        type="tel"
        placeholder-text="Telefon"
        :required="true"
        autocomplete="tel"
      />

      <Input
        name="message"
        type="message"
        placeholder-text="Meddelande"
        :required="true"
        auto-complete="off"
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
          data-wait="Vänta..."
        />
      </div>

      <p class="mt-6 max-w-2xl text-[12px] text-gray-300">
        * När du skickar detta formulär vidarebefordras dina uppgifter endast
        via e-post till Säkra besiktningar för att kunna svara på din förfrågan.
        Uppgifterna lagras inte på denna webbplats.
      </p>
    </form>

    <div class="mx-4 mt-8 grid gap-4 sm:mx-8 md:mx-20 md:grid-cols-2 xl:mx-52">
      <div
        class="flex h-full w-full flex-col bg-amber-200 p-4 sm:items-center md:p-8"
      >
        <p>Telefon:</p>
        <a class="underline" href="tel:0760-05 75 15">0760-05 75 15</a>
      </div>
      <div
        class="flex h-full w-full flex-col bg-amber-200 p-4 sm:items-center md:p-8"
      >
        <p>E-post:</p>
        <a class="underline" href="mailto:info@sakrabesiktningar.se"
          >info@sakrabesiktningar.se</a
        >
      </div>
      <div
        class="flex h-full w-full flex-col bg-amber-200 p-4 sm:items-center md:col-span-2 md:p-8"
      >
        <p>Adress:</p>
        <p>Varlabergsvägen 29</p>
        <p>434 39 Kungsbacka</p>
      </div>
    </div>

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
export default {
  name: "Contact",

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
      defaultEmailMessage: "Något gick fel när formuläret skulle skickas.",
      emailSuccessMessage: `Tack för ert meddelande! Vi återkommer till er snart!`,
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
    this.extraFields.clientip = ip.ip;
  },

  mounted() {
    this.extraFields.pageuri = window.location.href;
    this.extraFields.pagename = document.title;
  },

  methods: {
    async sendForm(event) {
      event.target.disabled = true;

      if (!emailValidator(event.target.form)) {
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
        requiredFields(event.target.form) &&
        emailValidator(event.target.form)
      ) {
        const { data: res, error } = await useLazyFetch("/api/contact", {
          method: "POST",
          headers: {
            Authorization: "Basic " + btoa(this.userName + ":" + this.userPass),
          },
          body: formCollector(event.target.form, this.extraFields),
        });

        if (error.value) {
          this.errorMessage = true;
        } else if (res.value && res.value.status === "ok") {
          const savedText = this.buttonText;
          this.buttonText = event.target.dataset.wait;

          setTimeout(() => {
            this.contactForm = false;
            this.successMessage = true;
            this.buttonText = savedText;

            this.$router.push({
              hash: "#contact",
            });
          }, 1500);
        }
      } else {
        event.target.disabled = false;
      }
    },
  },
};
</script>
