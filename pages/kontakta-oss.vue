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

  <div id="kontakta-oss" class="mx-4 my-32 flex flex-col gap-8 sm:mx-8">
    <div
      class="mx-auto flex w-full flex-col items-center justify-center gap-8 text-center sm:max-w-lg lg:max-w-4xl"
    >
      <h3 class="text-center">Prisexempel</h3>

      <p>
        Priserna varierar beroende på flera faktorer såsom täckning och
        sändningstid så vi tillhandahåller endast några förslag för att ge
        exempel på vilka kostnadsnivåer ni kan förvänta er.
      </p>
    </div>

    <div
      class="relative mt-32 grid gap-8 px-4 py-8 sm:px-8 lg:grid-cols-2 xl:grid-cols-3"
    >
      <NuxtImg
        src="birmingham-museums-trust-BPWZ01FtySg-unsplash.jpg"
        alt=""
        class="absolute inset-0 h-full w-full object-cover opacity-15"
        sizes="1000px md:2000px"
        width="2483"
        height="3718"
        format="webp"
      />

      <p class="my-12 text-center lg:col-span-2 xl:col-span-3">
        Det finns inga prisexempel att visa för tillfället.
      </p>
    </div>

    <div
      class="relative mt-32 grid gap-8 px-4 py-8 sm:px-8 lg:grid-cols-2 xl:grid-cols-3"
    >
      <h3 class="my-12 text-center lg:col-span-2 xl:col-span-3">
        Fler prisexempel
      </h3>

      <NuxtImg
        src="birmingham-museums-trust-BPWZ01FtySg-unsplash.jpg"
        alt=""
        class="absolute inset-0 h-full w-full object-cover opacity-15"
        sizes="1000px md:2000px"
        width="2483"
        height="3718"
        format="webp"
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
        via e-post till ADinQ AB för att kunna svara på din förfrågan.
        Uppgifterna lagras inte på denna webbplats.
      </p>
    </form>

    <div class="mx-4 mt-8 grid gap-4 sm:mx-8 md:mx-20 md:grid-cols-2 xl:mx-52">
      <div
        class="flex h-full w-full flex-col bg-amber-200 p-4 sm:items-center md:p-8"
      >
        <p>Telefon:</p>
        <a class="underline" href="tel:033-72 22 400">033-72 22 400</a>
      </div>
      <div
        class="flex h-full w-full flex-col bg-amber-200 p-4 sm:items-center md:p-8"
      >
        <p>E-post:</p>
        <a class="underline" href="mailto:info@adinq.se">info@adinq.se</a>
      </div>
      <div
        class="flex h-full w-full flex-col bg-amber-200 p-4 sm:items-center md:col-span-2 md:p-8"
      >
        <p>Adress:</p>
        <p>Fabriksgatan 11, Plan 3</p>
        <p>503 32 Borås</p>
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
import Button from "../components/elements/Button.vue";
import Input from "../components/elements/Input.vue";
import { requiredFields } from "../utils/requiredFields.js";
import { emailValidator } from "../utils/emailValidator.js";
import { formCollector } from "../utils/formCollector.js";

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
