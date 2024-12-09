<script setup>
import Button from "../elements/Button.vue";
import Input from "../elements/Input.vue";
</script>

<template>
  <div
    class="relative mb-16 mt-4 grid min-h-0 grid-cols-1 py-12 md:grid-cols-slim"
  >
    <div class="col-span-1 md:col-start-2 md:col-end-2">
      <form
        v-if="contactForm"
        class="grid grid-cols-1 gap-4 text-white md:grid-cols-2"
        name="kontakta-oss"
      >
        <div class="col-span-1 md:col-span-2">
          <h4 class="text-3xl md:text-4xl">Hör av er!</h4>
          <p>
            Som en liten leverantör erbjuder vi kreativa lösningar för att
            förbättra din kunds upplevelse. Vi arbetar tillsammans med dig för
            att skapa en långsiktig relation och hjälpa dig att nå dina mål.<br /><br />
          </p>
        </div>

        <Input
          name="firstname"
          type="text"
          placeholder-text=""
          :required="true"
          label-text="Förnamn:"
        />

        <Input
          name="lastname"
          type="text"
          placeholder-text=""
          :required="true"
          label-text="Efternamn:"
        />

        <Input
          name="email"
          type="email"
          placeholder-text=""
          :required="true"
          label-text="Email:"
        />

        <Input
          name="phone"
          type="tel"
          placeholder-text=""
          :required="true"
          label-text="Telefon:"
        />

        <Input
          name="company"
          type="text"
          placeholder-text=""
          :required="true"
          label-text="Företag:"
        />

        <Input
          class="col-span-1 md:col-span-2"
          name="message"
          type="message"
          placeholder-text=""
          :required="true"
          label-text="Meddelande:"
        />

        <div class="hidden">
          <Input
            name="clientip"
            type="text"
            placeholder-text="clientip"
            :required="false"
            label-text=""
            :value="extraFields.clientip"
          />

          <Input
            name="pageuri"
            type="text"
            placeholder-text="pageuri"
            :required="false"
            label-text=""
            :value="extraFields.pageuri"
          />

          <Input
            name="pagename"
            type="text"
            placeholder-text="pagename"
            :required="false"
            label-text=""
            :value="extraFields.pagename"
          />

          <Input
            name="hubspotutk"
            type="text"
            placeholder-text="hubspotutk"
            :required="false"
            label-text=""
            :value="extraFields.hubspotutk"
          />

          <Input
            name="amex"
            type="text"
            placeholder-text="amex"
            :required="false"
            label-text=""
            :value="extraFields.amex"
          />
        </div>

        <div class="flex items-start pt-8">
          <Button
            @click="sendForm"
            :text="buttonText"
            link=""
            hash=""
            type="submit"
            data-wait="Vänta..."
          />
        </div>
      </form>

      <div v-if="successMessage">
        <div>
          Tack för ert meddelande!<br /><br />Vi återkommer till er snart!<br /><br /><br /><br /><br />‍
        </div>
      </div>

      <div v-if="errorMessage" class="bg-pink-100 p-4 text-black">
        <p>{{ defaultEmailMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Contact",

  data() {
    return {
      extraFields: {
        clientip: "",
        pageuri: window.location.href,
        pagename: document.title,
        hubspotutk: this.getCookie("hubspotutk"),
        amex: "",
      },
      userName: `${import.meta.env.VITE_USERNAME}`,
      userPass: `${import.meta.env.VITE_USERPASS}`,
      formWebhook: "/api/contact",
      defaultEmailMessage: "Oj! Något gick fel när formuläret skulle skickas.",
      emailErrorMessage:
        "En eller flera emailadresser som ni har angett tycks inte ha ett korrekt format.",
      emailReg:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      contactForm: true,
      successMessage: false,
      errorMessage: false,
      buttonText: "Skicka",
    };
  },

  async created() {
    const res = await fetch("https://api.ipify.org?format=json");
    const ip = await res.json();
    this.extraFields.clientip = ip.ip;
  },

  methods: {
    async sendForm(event) {
      event.target.disabled = true;

      if (this.requiredFields(event.target.form)) {
        let res;
        const savedText = this.buttonText;
        this.buttonText = event.target.dataset.wait;

        try {
          res = await fetch(this.formWebhook, {
            method: "POST",
            headers: {
              Authorization:
                "Basic " + btoa(this.userName + ":" + this.userPass),
            },
            body: this.formCollector(event.target.form),
            redirect: "follow",
          });

          const jsonResponse = await res.json();

          if (!res.ok || jsonResponse.error) {
            throw new Error("Request failed");
            this.errorMessage = true;
          } else {
            console.log("success");

            setTimeout(() => {
              this.contactForm = false;
              this.successMessage = true;
              this.buttonText = savedText;
            }, 1500);
          }
        } catch (error) {
          console.error("An error occurred:", error);
          this.errorMessage = true;
          this.buttonText = savedText;
        }
      } else {
        event.target.disabled = false;
      }
    },

    requiredFields(form) {
      const inputs = form.querySelectorAll("input");
      const textareas = form.querySelectorAll("textarea");
      const selectors = form.querySelectorAll("select");
      let requiredFilled = true;
      let emailVerificationError = false;
      let radioButtonNames = [];

      // check inputs
      for (const input of inputs) {
        if (input.required) {
          if (!input.value) requiredFilled = false;
          if (input.type === "checkbox" && !input.checked)
            requiredFilled = false;
          if (input.type === "radio") radioButtonNames.push(input.dataset.name); // push to list with radiobutton groups
          if (input.type === "email" && !this.emailReg.test(input.value)) {
            requiredFilled = false;
            emailVerificationError = true;
          }
        }
      }

      // handle radiobuttons
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

      // check textareas
      for (const input of textareas) {
        if (input.required) {
          if (!input.value) requiredFilled = false;
        }
      }

      // check selectors
      for (const input of selectors) {
        if (input.required) {
          if (!input.value) requiredFilled = false;
        }
      }

      if (emailVerificationError) this.emailError(form);

      return requiredFilled;
    },

    emailError(form) {
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
    },

    formCollector(form) {
      let formData = new FormData();
      formData.append("form-name", form.name);

      // append all inputs except submit-button
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
            item.name !== "hubspotutk" &&
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

      // append all textareas
      for (const item of form.querySelectorAll("textarea")) {
        formData.append(item.name, item.value);
      }

      // Get all relevant selectors
      for (const item of form.querySelectorAll("select")) {
        formData.append(item.name, item.value);
      }

      // add the extra-fields
      for (const [key, value] of Object.entries(this.extraFields)) {
        formData.append(key, value);
      }

      return formData;
    },

    getCookie(name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length === 2) {
        return parts.pop().split(";").shift();
      }
    },
  },
};
</script>
