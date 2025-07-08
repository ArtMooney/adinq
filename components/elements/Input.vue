<template>
  <div class="text-sm text-white">
    <label v-if="labelText" :for="name">{{ labelText }}</label>

    <input
      v-if="type !== 'message'"
      class="my-2 w-full rounded border border-white/25 px-4 py-3 placeholder:text-neutral-600 focus:border-white/50 focus:outline-none"
      maxlength="256"
      :name="name"
      :type="type"
      :placeholder="placeholderText"
      :required="required"
      :value="modelValue"
      :autocomplete="autoComplete"
      @input="$emit('updateValue', $event.target.value)"
    />

    <textarea
      v-if="type === 'message'"
      class="my-2 min-h-28 w-full rounded border border-white/25 px-4 py-2 placeholder:text-neutral-600 focus:border-white/50 focus:outline-none"
      maxlength="5000"
      :name="name"
      :placeholder="placeholderText"
      :required="required"
      :value="modelValue"
      :autocomplete="autoComplete"
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
    autoComplete: {
      type: String,
      required: false,
      default: "off",
    },
  },

  emits: ["updateValue"],
};
</script>
