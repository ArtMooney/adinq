<template>
  <div class="col-span-2 flex justify-between">
    <div class="flex cursor-pointer items-center gap-4">
      <!--      <ion-icon-->
      <!--        :icon="grid"-->
      <!--        class="dragdrop-handle h-6 w-6 shrink-0 cursor-grabbing text-white"-->
      <!--      ></ion-icon>-->

      <div
        class="word-break-all font-gunplay pointer-events-none mr-4 hyphens-auto"
        lang="sv"
      >
        {{ item.titel ? item.titel : item.name }}
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
        <!--        <ion-icon-->
        <!--          v-if="!saveAllFlag && (index !== showItem || !saveFlag)"-->
        <!--          :icon="chevronDownOutline"-->
        <!--          class="h-6 w-6 text-white transition-transform duration-300 ease-in-out"-->
        <!--          :class="[index === showItem && itemOpen ? 'rotate-180' : '']"-->
        <!--        ></ion-icon>-->

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
