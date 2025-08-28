<template>
  <div class="col-span-2 flex justify-end gap-2">
    <div class="flex items-center gap-2">
      <div
        v-if="showItem !== index || !editingNewItem"
        @click.stop="$emit('deleteItem', index)"
        class="rounded border border-white/25 bg-[#8a548b] px-2 py-0.5 text-sm hover:bg-[#b280b4]"
      >
        Delete
      </div>
    </div>

    <div
      v-if="index === showItem && itemOpen"
      @click.stop="saveItem(index)"
      class="rounded border border-white/25 bg-[#8a548b] px-2 py-0.5 text-sm hover:bg-[#b280b4]"
      :class="[inputError ? 'opacity-50' : '']"
    >
      Save
    </div>

    <div
      v-if="index === showItem && itemOpen"
      @click.stop="$emit('cancelItem', index)"
      class="rounded border border-white/25 bg-[#8a548b] px-2 py-0.5 text-sm hover:bg-[#b280b4]"
    >
      Cancel
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemTitleButtons",

  emits: ["saveItem", "cancelItem", "deleteItem"],

  props: {
    item: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    showItem: {
      type: Number,
      required: false,
      default: 0,
    },
    itemOpen: {
      type: Boolean,
      required: false,
      default: false,
    },
    editingNewItem: {
      type: Boolean,
      required: false,
      default: false,
    },
    inputError: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  methods: {
    saveItem(index) {
      if (!this.inputError) {
        this.$emit("saveItem", index);
      }
    },
  },
};
</script>
