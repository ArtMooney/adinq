<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import IconCloseCircleOutline from "~icons/ion/close-circle-outline";
</script>

<template>
  <input
    v-if="
      input.name !== 'id' &&
      input.name !== 'sortOrder' &&
      input.type.value !== 'textarea' &&
      input.type.value !== 'fileImg' &&
      input.type.value !== 'fileDoc' &&
      input.type.value !== 'date' &&
      input.type.value !== 'dateToFrom' &&
      input.type.value !== 'select'
    "
    @click.stop
    v-model="item[input.name]"
    :type="input.type.value"
    :name="input.name"
    autocomplete="off"
  />

  <VueDatePicker
    v-if="
      input.name !== 'id' &&
      input.name !== 'sortOrder' &&
      (input.type.value === 'date' || input.type.value === 'dateToFrom')
    "
    v-model="item[input.name]"
    :format="'yyyy-MM-dd'"
    locale="sv"
    auto-apply
    :name="input.name"
    :range="input.type.value === 'dateToFrom'"
    class="[&_div]:!font-body [&_input]:!font-body [&_button]:!p-0 [&_div]:!text-xs [&_input]:!border-white/25 [&_input]:!bg-transparent [&_input]:!py-3 [&_input]:!text-sm [&_input]:!text-white"
  >
  </VueDatePicker>

  <textarea
    v-if="
      input.name !== 'id' &&
      input.name !== 'sortOrder' &&
      input.type.value === 'textarea'
    "
    @click.stop
    v-model="item[input.name]"
    :name="input.name"
    autocomplete="off"
  ></textarea>

  <div
    v-if="
      input.name !== 'id' &&
      input.name !== 'sortOrder' &&
      (input.type.value === 'fileImg' || input.type.value === 'fileDoc')
    "
    class="my-1 flex items-center gap-1 justify-self-start"
  >
    <input
      @click.stop
      @change="handleFileInput($event, input.name, item)"
      :id="`${input.name}-${index}`"
      :ref="`${input.name}-${index}`"
      class="hidden"
      type="file"
      :name="`${input.name}`"
      :accept="
        input.type.value === 'fileImg'
          ? '.jpg, .jpeg, .png'
          : input.type.value === 'fileDoc'
            ? '.pdf'
            : ''
      "
      autocomplete="off"
    />

    <label
      @click.stop
      :for="`${input.name}-${index}`"
      class="m-0 cursor-pointer p-0 text-sm underline"
    >
      {{ displayFilename(item[input.name], input.type.value) }}
    </label>

    <IconCloseCircleOutline
      v-if="item[input.name]?.length > 0"
      @click.stop="removeFile(`${input.name}-${index}`, input.name)"
      class="h-4 min-h-4 w-4 min-w-4 cursor-pointer px-0.5 text-red-500"
    ></IconCloseCircleOutline>
  </div>

  <select
    v-if="
      input.name !== 'id' &&
      input.name !== 'sortOrder' &&
      input.type.value === 'select'
    "
    :name="input.name"
    v-model="selectValue"
  >
    <option v-for="option in input.type.select_options" :value="option.value">
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

  computed: {
    selectValue: {
      get() {
        return this.item[this.input.name] || "";
      },
      set(newValue) {
        this.item[this.input.name] = newValue;
      },
    },
  },

  methods: {
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

    displayFilename(filename, inputType) {
      if (filename?.length > 0) {
        return filename;
      }

      return inputType === "fileDoc"
        ? "Click here to choose a file."
        : "Click here to choose an image.";
    },

    removeFile(inputName, fieldName) {
      this.$refs[inputName].value = "";
      this.item[fieldName] = [];
    },
  },
};
</script>
