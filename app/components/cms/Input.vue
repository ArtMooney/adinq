<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import IconCloseCircleOutline from "~icons/ion/close-circle-outline";
</script>

<template>
  <input
    v-if="
      input.name !== 'index' &&
      getInputType(input.type) !== 'textarea' &&
      getInputType(input.type) !== 'file' &&
      getInputType(input.type) !== 'date' &&
      getInputType(input.type) !== 'select' &&
      !isToFromType(input.name)
    "
    @click.stop
    v-model="item[input.name]"
    :type="getInputType(input.type)"
    :class="[isEmailValid && 'error', isPhoneNumberValid && 'error']"
    :name="input.name"
    autocomplete="off"
  />

  <VueDatePicker
    v-if="
      input.name !== 'index' &&
      (getInputType(input.type) === 'date' || isToFromType(input.name))
    "
    v-model="item[input.name]"
    :format="'yyyy-MM-dd'"
    locale="sv"
    auto-apply=""
    :name="input.name"
    :range="isToFromType(input.name)"
    class="[&_div]:!font-body [&_input]:!font-body [&_button]:!p-0 [&_div]:!text-xs [&_input]:!border-white/25 [&_input]:!bg-transparent [&_input]:!py-3 [&_input]:!text-sm [&_input]:!text-white"
  >
  </VueDatePicker>

  <textarea
    v-if="input.name !== 'index' && getInputType(input.type) === 'textarea'"
    @click.stop
    v-model="item[input.name]"
    :name="input.name"
    autocomplete="off"
  ></textarea>

  <div
    v-if="input.name !== 'index' && getInputType(input.type) === 'file'"
    class="my-1 flex items-center gap-1 justify-self-start"
  >
    <input
      @click.stop
      @change="handleFileInput($event, input.name, item)"
      :id="`${input.name}-${index}`"
      :ref="`${input.name}-${index}`"
      class="hidden"
      :type="getInputType(input.type)"
      :name="`${input.name}`"
      :accept="isToFromType(input.name) ? '.jpg, .jpeg, .png' : ''"
      autocomplete="off"
    />

    <label
      @click.stop
      :for="`${input.name}-${index}`"
      class="m-0 cursor-pointer p-0 text-sm underline"
    >
      {{ displayFilename(item[input.name], input.name) }}
    </label>

    <IconCloseCircleOutline
      @click.stop="
        removeFile(item, index, `${input.name}-${index}`, input.name)
      "
      class="h-4 min-h-4 w-4 min-w-4 cursor-pointer px-0.5 text-red-500"
    ></IconCloseCircleOutline>
  </div>

  <select
    v-if="input.name !== 'index' && getInputType(input.type) === 'select'"
    :name="input.name"
    v-model="selectValue"
  >
    <option v-for="option in input.select_options" :value="option.value">
      {{ option.value }}
    </option>
  </select>
</template>

<script>
export default {
  name: "Input",

  emits: ["showItem", "saveFlag", "inputError"],

  props: {
    input: {
      type: Object,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
    itemOpen: {
      type: Boolean,
      required: false,
      default: false,
    },
    index: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      emailReg:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      internationalPhoneReg:
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    };
  },

  computed: {
    isEmailValid() {
      return (
        this.input.type === "email" &&
        !this.emailReg.test(this.item[this.input.name]) &&
        this.item[this.input.name] !== ""
      );
    },

    isPhoneNumberValid() {
      return (
        this.input.type === "phone_number" &&
        !this.internationalPhoneReg.test(this.item[this.input.name]) &&
        this.item[this.input.name] !== ""
      );
    },

    selectValue: {
      get() {
        return this.item[this.input.name]?.value || "";
      },
      set(newValue) {
        if (!this.item[this.input.name]) {
          this.item[this.input.name] = { value: newValue };
        } else {
          this.item[this.input.name].value = newValue;
        }
      },
    },
  },

  methods: {
    getInputType(type) {
      let inputType = "text";

      if (type === "long_text") {
        inputType = "textarea";
      } else if (type === "date") {
        inputType = "date";
      } else if (type === "boolean") {
        inputType = "checkbox";
      } else if (type === "file") {
        inputType = "file";
      } else if (type === "single_select") {
        inputType = "select";
      }

      return inputType;
    },

    isToFromType(inputName) {
      return !!(
        inputName.includes("|") && inputName.split("|")[1] === "to-from"
      );
    },

    isDocType(inputName) {
      return !!(inputName.includes("|") && inputName.split("|")[1] === "doc");
    },

    async handleFileInput(event, name, item) {
      if (!event.target.files[0].name) return;

      item[name] = [
        {
          name: event.target.files[0].name,
          file: await this.readEncodeFiles(event.target.files),
        },
      ];
    },

    readEncodeFiles(files) {
      return new Promise((resolve, reject) => {
        if (files.length > 0) {
          let selectedFile = files[0];
          let reader = new FileReader();

          reader.onload = function (e) {
            let base64Data = e.target.result.split(",")[1];
            resolve(base64Data);
          };

          reader.onerror = function (error) {
            reject(error);
          };

          // Read the file as a data URL, which will be Base64-encoded
          reader.readAsDataURL(selectedFile);
        } else {
          reject(new Error("No files to process."));
        }
      });
    },

    displayFilename(filename, inputName) {
      if (filename && filename.length > 0) {
        if (filename[0].visible_name) {
          return filename[0].visible_name;
        } else if (filename[0].name) {
          return filename[0].name;
        }
      }

      return this.isDocType(inputName)
        ? "Click here to choose a file."
        : "Click here to choose an image.";
    },

    removeFile(item, index, inputName, fieldName) {
      this.$refs[inputName].value = "";
      this.item[fieldName] = [];
    },
  },

  watch: {
    isEmailValid(newVal) {
      if (this.itemOpen) {
        this.$emit("inputError", this.isEmailValid);
      }
    },

    isPhoneNumberValid(newVal) {
      if (this.itemOpen) {
        this.$emit("inputError", this.isPhoneNumberValid);
      }
    },
  },
};
</script>
