<script setup>
import IconQlementineIconsChevronDoubleDown16 from "~icons/qlementine-icons/chevron-double-down-16";

const config = useRuntimeConfig();
const imageBaseUrl = config.public.imageBaseUrl;

useSeoMeta({
  title: "Kontakta oss - Adinq | Digital marknadsföring & DOOH i Borås",
  description:
    "Få personlig hjälp från vårt team i Borås. Kontakta oss för frågor om digital marknadsföring, DOOH, butiks-TV och kommersialisering av fastigheter. Vi svarar snabbt!",
  ogTitle: "Kontakta Adinq - Personlig hjälp från vårt team i Borås",
  ogDescription:
    "Få personlig hjälp från vårt team i Borås. Kontakta oss för frågor om digital marknadsföring och DOOH.",
  ogImage: `${imageBaseUrl}/hands-holding-each-others-arms.jpg`,
  twitterCard: "summary_large_image",
  twitterTitle: "Kontakta Adinq - Personlig hjälp från vårt team i Borås",
  twitterDescription:
    "Få personlig hjälp från vårt team i Borås. Kontakta oss för digital marknadsföring och DOOH.",
  twitterImage: `${imageBaseUrl}/hands-holding-each-others-arms.jpg`,
});

definePageMeta({
  ssr: true,
});
</script>

<template>
  <Heading>
    <template #heading-content>
      <NuxtImg
        src="hands-holding-each-others-arms.jpg"
        alt=""
        class="h-full w-full object-cover"
        sizes="500px sm:640px md:768px lg:1024px xl:1280px 2xl:1536px"
        width="2000"
        height="3000"
        densities="x1"
        format="webp"
      />

      <div class="absolute inset-0 bg-[#2f3f4d]/50"></div>

      <div
        class="absolute inset-0 flex flex-col items-center justify-center text-center"
      >
        <h1 class="mx-10 mb-8 md:mx-30">{{ staticContent.header.title }}</h1>

        <NuxtLink
          :to="{ path: '/kontakta-oss', hash: '#kontakta-oss' }"
          class="absolute bottom-8 flex w-full items-center justify-center"
        >
          <IconQlementineIconsChevronDoubleDown16
            class="h-12 min-h-12 w-12 min-w-12 cursor-pointer opacity-70 hover:opacity-100"
          ></IconQlementineIconsChevronDoubleDown16>
        </NuxtLink>
      </div>
    </template>
  </Heading>

  <div
    id="kontakta-oss"
    class="my-32 flex max-w-5xl flex-col gap-8 px-4 sm:px-8 lg:mx-auto"
  >
    <h3 class="text-center sm:px-8 md:px-12">
      {{ staticContent.header.title }}
    </h3>

    <p
      class="mb-12 text-center sm:px-16 md:px-32"
      v-html="formatText(staticContent.contactForm.text)"
    ></p>

    <form
      v-if="contactForm"
      @submit.prevent
      name="contact"
      class="flex flex-col items-stretch justify-start gap-4"
    >
      <input
        name="name"
        type="text"
        placeholder="Namn"
        v-model="formData.name"
        required
        autocomplete="name"
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        v-model="formData.email"
        required
        autocomplete="email"
      />

      <input
        name="company"
        type="text"
        placeholder="Företagsnamn"
        v-model="formData.company"
        required
        autocomplete="organization"
      />

      <input
        name="phone"
        type="tel"
        placeholder="Telefon"
        v-model="formData.phone"
        required
        autocomplete="tel"
      />

      <input
        name="city"
        type="text"
        placeholder="Stad"
        v-model="formData.city"
        required
        autocomplete="address-level2"
      />

      <textarea
        name="message"
        type="message"
        placeholder="Meddelande"
        v-model="formData.message"
        required
        maxlength="5000"
        class="message"
      ></textarea>

      <label class="flex items-center gap-2">
        <input
          type="radio"
          name="subject"
          value="allmanna-fragor"
          v-model="formData.subject"
          required
        />
        <span>Allmänna frågor</span>
      </label>
      <label class="flex items-center gap-2">
        <input
          type="radio"
          name="subject"
          value="ekonomi-fragor"
          v-model="formData.subject"
          required
        />
        <span>Ekonomi frågor</span>
      </label>

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
        <button @click="sendForm" type="submit" class="white !text-black">
          {{ buttonText }}
        </button>
      </div>

      <p class="mt-6 max-w-2xl text-[12px] text-gray-300">
        * När du skickar detta formulär vidarebefordras dina uppgifter endast
        via e-post till ADinQ AB för att kunna svara på din förfrågan.
        Uppgifterna lagras inte på denna webbplats.
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

  <div class="mx-4 my-20 flex flex-col gap-8 sm:mx-8">
    <MarketingChannels></MarketingChannels>
  </div>
</template>

<script>
import { useStaticContentStore } from "~/stores/static-content.js";

export default {
  name: "KontaktaOss",

  computed: {
    staticContent() {
      return useStaticContentStore().getContentByTitle("page - Kontakta oss")
        .content;
    },
  },

  data() {
    const config = useRuntimeConfig();

    return {
      userName: config.public.userName,
      userPass: config.public.userPass,
      formData: {
        name: "",
        email: "",
        company: "",
        phone: "",
        city: "",
        message: "",
        subject: "allmanna-fragor",
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
          res = await $fetch("/api/contact", {
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

    formatText(text) {
      return text.replace(/\*/g, "•").replace(/\n/g, "<br>").trim();
    },
  },
};
</script>
