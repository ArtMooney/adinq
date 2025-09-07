<script setup>
import IconFa7SolidGridVertical from "~icons/fa7-solid/grid-vertical";
import IconIonChevronDown from "~icons/ion/chevron-down";
</script>

<template>
  <div class="col-span-2 flex cursor-pointer justify-between">
    <div class="flex items-center gap-4">
      <IconFa7SolidGridVertical
        class="dragdrop-handle h-5 min-h-5 w-5 min-w-5 shrink-0 cursor-grabbing text-white"
      ></IconFa7SolidGridVertical>

      <div
        class="word-break-all font-gunplay pointer-events-none mr-4 hyphens-auto"
        lang="sv"
      >
        {{ item?.name ? item?.name : item?.title }}
      </div>
    </div>

    <div class="flex cursor-pointer gap-2">
      <CmsItemTitleButtons
        class="hidden sm:flex"
        :show-item="showItem"
        :index="index"
        :item="item"
        :item-open="itemOpen"
        :editing-new-item="editingNewItem"
        :input-error="inputError"
        @save-item="$emit('saveItem', index)"
        @cancel-item="$emit('cancelItem', index)"
        @delete-item="$emit('deleteItem', index)"
      />

      <div class="flex items-center gap-2">
        <IconIonChevronDown
          v-if="!saveAllFlag && (index !== showItem || !saveFlag)"
          class="h-6 min-h-6 w-6 min-w-6 text-white transition-transform duration-300 ease-in-out"
          :class="[index === showItem && itemOpen ? 'rotate-180' : '']"
        ></IconIonChevronDown>

        <CmsLoadingSpinner
          v-if="(index === showItem && saveFlag) || saveAllFlag"
          class="!h-5 !w-5"
          color="#fac725"
        />
      </div>
    </div>
  </div>

  <CmsItemTitleButtons
    v-if="index === showItem && itemOpen"
    class="mt-4 flex justify-self-start sm:hidden"
    :show-item="showItem"
    :index="index"
    :item="item"
    :item-open="itemOpen"
    :editing-new-item="editingNewItem"
    :input-error="inputError"
    @save-item="$emit('saveItem', index)"
    @cancel-item="$emit('cancelItem', index)"
    @delete-item="$emit('deleteItem', index)"
  />
</template>

<script>
export default {
  name: "CmsItemTitle",

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
    saveFlag: {
      type: Boolean,
      required: false,
      default: false,
    },
    saveAllFlag: {
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
};
</script>
