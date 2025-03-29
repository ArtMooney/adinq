<template>
  <div class="text-sm text-black">
    <label v-if="labelText" :for="name">{{ labelText }}</label>

    <input
      v-if="type !== 'message'"
      class="my-2 w-full border border-solid border-black/25 px-4 py-3 placeholder:text-neutral-300"
      maxlength="256"
      :name="name"
      :type="type"
      :placeholder="placeholderText"
      :required="required"
      :value="modelValue"
      @input="$emit('updateValue', $event.target.value)"
    />

    <textarea
      v-if="type === 'message'"
      class="m-0 min-h-28 w-full border border-solid border-black/25 px-4 py-2 placeholder:text-neutral-300"
      maxlength="5000"
      :name="name"
      :placeholder="placeholderText"
      :required="required"
      :value="modelValue"
      @input="$emit('updateValue', $event.target.value)"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: "Input",

  props: {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    placeholderText: {
      type: String,
      default: "",
      required: false,
    },
    required: {
      type: Boolean,
      default: false,
      required: false,
    },
    labelText: {
      type: String,
      required: false,
    },
    modelValue: {
      type: String,
      required: false,
    },
  },

  emits: ["updateValue"],
};
</script>
