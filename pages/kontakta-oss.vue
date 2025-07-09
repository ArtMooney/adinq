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
      Få personlig hjälp från vårt team i Borås
    </h3>

    <p class="mb-12 text-center sm:px-16 md:px-32">
      Vårt team i Borås är redo att hjälpa dig. Vi svarar snabbt på telefon och
      mejl, och ser till att du får den hjälp du behöver.
    </p>

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
          value="ekonomi"
          v-model="formData.subject"
          required
        />
        <span>Ekonomi</span>
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
        <button @click="sendForm" type="submit" class="white">
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
      <div class="my-12 w-full bg-green-900 p-8">
        {{ emailSuccessMessage }}
      </div>
    </div>

    <div v-if="errorMessage" class="my-12 w-full bg-red-800 p-8">
      <p>{{ defaultEmailMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "KontaktaOss",

  inject: ["navbarHeight"],

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
    this.formData.clientip = ip.ip;
  },

  mounted() {
    this.windowHeight = window.innerHeight;
    window.addEventListener("resize", this.handleResize);

    this.formData.pageuri = window.location.href;
    this.formData.pagename = document.title;
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
