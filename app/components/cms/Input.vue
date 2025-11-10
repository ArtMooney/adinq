<script setup>
import { VueDatePicker } from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import sv from "date-fns/locale/sv";
import IconCloseCircleOutline from "~icons/ion/close-circle-outline";
</script>

<template>
  <div v-if="neverVisibleFields" class="flex flex-col gap-1">
    <p class="font-semibold text-white/50 italic">
      {{ input.name.includes("|") ? input.name.split("|")[0] : input.name }}
    </p>

    <input
      v-if="
        neverVisibleFields &&
        input.type.value !== 'textarea' &&
        input.type.value !== 'file' &&
        input.type.value !== 'fileImg' &&
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
        neverVisibleFields &&
        (input.type.value === 'date' || input.type.value === 'dateToFrom')
      "
      v-model="item[input.name]"
      :formats="{ input: 'yyyy-MM-dd' }"
      :locale="sv"
      auto-apply
      :input-attrs="{ name: input.name }"
      :range="input.type.value === 'dateToFrom'"
      class="[&_div]:!font-body [&_input]:!font-body [&_button]:!p-0 [&_div]:!text-xs [&_input]:!border-white/25 [&_input]:!bg-transparent [&_input]:!py-3 [&_input]:!text-sm [&_input]:!text-white"
    >
    </VueDatePicker>

    <textarea
      v-if="neverVisibleFields && input.type.value === 'textarea'"
      @click.stop
      v-model="item[input.name]"
      :name="input.name"
      autocomplete="off"
    ></textarea>

    <div
      v-if="
        neverVisibleFields &&
        (input.type.value === 'file' || input.type.value === 'fileImg')
      "
      class="my-1 flex items-center justify-between gap-1 justify-self-start"
    >
      <input
        @click.stop
        @change="handleFileInput($event, input.name, item)"
        :id="`${input.name}-${index}`"
        :ref="`${input.name}-${index}`"
        class="hidden"
        type="file"
        :name="`${input.name}`"
        :accept="input.type.value === 'fileImg' ? '.jpg, .jpeg, .png' : ''"
        autocomplete="off"
      />

      <label
        @click.stop
        :for="`${input.name}-${index}`"
        class="relative m-0 cursor-pointer p-0 text-sm underline"
      >
        <span
          v-if="
            (!item[input.name]?.length || !item[input.name][0]?.name) &&
            typeof item[input?.name] !== 'string'
          "
        >
          {{ chooseFilenameText(input.type.value) }}
        </span>

        <span v-if="typeof item[input?.name] === 'object'">
          {{ item[input?.name]?.[0]?.name }}
        </span>

        <NuxtImg
          v-if="
            typeof item[input?.name] === 'string' &&
            item[input?.name]?.length > 0
          "
          :src="`cms-images/${item[input?.name]}`"
          alt="an image slot with an image selected by the user"
          class="h-20 min-h-20 w-20 min-w-20 object-cover"
          sizes="80px"
          densities="x1"
          format="webp"
        />

        <IconCloseCircleOutline
          v-if="
            item[input?.name]?.length > 0 && !item[input?.name][0]?.backupName
          "
          @click.stop.prevent="removeFile(`${input.name}-${index}`, input.name)"
          class="absolute -top-3 -right-6 h-6 min-h-6 w-6 min-w-6 cursor-pointer px-0.5 text-white"
        ></IconCloseCircleOutline>
      </label>
    </div>

    <select
      v-if="neverVisibleFields && input.type.value === 'select'"
      :name="input.name"
      v-model="selectValue"
    >
      <option v-for="option in input.type.select_options" :value="option.value">
        {{ option.value }}
      </option>
    </select>
  </div>
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
    index: {
      type: Number,
      required: true,
    },
  },

  computed: {
    neverVisibleFields() {
      return (
        this.input.name !== "id" &&
        this.input.name !== "sortOrder" &&
        this.input.name !== "createdAt" &&
        this.input.name !== "updatedAt"
      );
    },

    selectValue: {
      get() {
        return this.item[this.input.name] || "";
      },
      set(newValue) {
        this.item[this.input.name] = newValue;
      },
    },
  },

  data() {
    return {
      itemBackup: null,
    };
  },

  mounted() {
    this.itemBackup = JSON.parse(JSON.stringify(this.item));
  },

  methods: {
    async handleFileInput(event, name, item) {
      if (!event.target.files[0].name) return;

      const { base64, contentType } = await this.readEncodeFiles(
        event.target.files,
      );

      item[name] = [
        {
          name: event.target.files[0].name,
          backupName: this.itemBackup[name] || "",
          file: base64,
          contentType,
        },
      ];
    },

    readEncodeFiles(files) {
      return new Promise((resolve, reject) => {
        if (files.length > 0) {
          let selectedFile = files[0];
          let reader = new FileReader();

          reader.onload = function (e) {
            let dataUrl = e.target.result;
            let contentType = dataUrl.split(";")[0].split(":")[1];
            let base64Data = dataUrl.split(",")[1];
            resolve({ base64: base64Data, contentType });
          };

          reader.onerror = function (error) {
            reject(error);
          };

          reader.readAsDataURL(selectedFile);
        } else {
          reject(new Error("No files to process."));
        }
      });
    },

    chooseFilenameText(inputType) {
      return inputType === "file"
        ? "Click here to choose a file."
        : "Click here to choose an image.";
    },

    removeFile(inputName, fieldName) {
      this.$refs[inputName].value = "";
      this.item[fieldName] = [
        {
          backupName: this.itemBackup[this.input?.name] || "",
        },
      ];
    },
  },
};
</script>
