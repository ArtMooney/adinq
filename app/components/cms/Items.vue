<script setup>
import { VueDraggableNext } from "vue-draggable-next";
</script>

<template>
  <div
    class="mx-auto mt-8 max-w-screen-md justify-center gap-4"
    id="items-list-top"
  >
    <CmsLoadingSpinner
      v-if="loadingFlag"
      size="large"
      class="mx-auto justify-self-center"
    />

    <div v-if="!items.length && !loadingFlag" class="py-16 text-center">
      No items found
    </div>

    <VueDraggableNext
      v-model="localItems"
      :delay="dragDelay"
      :animation="200"
      handle=".dragdrop-handle"
      @end="saveAllItems"
    >
      <div
        v-for="(item, index) of localItems"
        @click="handleClick($event, item, index)"
        class="mb-4 grid grid-cols-2 rounded bg-black/25 p-4 shadow-[3px_4px_12px_rgba(0,0,0,0.22)] hover:bg-[#242424]"
        v-show="!loadingFlag"
        :ref="`list-item-${index}`"
        :id="`list-item-${index}`"
        :key="item"
      >
        <CmsItemTitle
          :item="item"
          :index="index"
          :show-item="showItem"
          :item-open="itemOpen"
          :save-flag="saveFlag"
          :save-all-flag="saveAllFlag"
          :editing-new-item="editingNewItem"
          :input-error="inputError"
          @save-item="saveItem($event)"
          @cancel-item="cancelItem($event)"
          @delete-item="deleteItem($event)"
        />

        <div
          class="col-span-2 flex flex-col gap-3 text-sm"
          v-show="itemOpen && showItem === index"
          @click.stop
        >
          <div class="my-4 h-px w-full bg-white/25"></div>

          <template v-for="(input, inputIndex) of schema">
            <CmsInput
              v-if="input.name !== 'index'"
              :input="input"
              :item="item"
              :index="index"
              @show-item="$emit('showItem', $event)"
              @save-flag="$emit('saveFlag', $event)"
              @input-error="handleInputError($event, inputIndex)"
            />
          </template>
        </div>
      </div>
    </VueDraggableNext>
  </div>
</template>

<script>
export default {
  name: "CmsItems",

  emits: [
    "loadingFlag",
    "saveFlag",
    "items",
    "showItem",
    "itemOpen",
    "editingNewItem",
    "saveNewItemOrder",
  ],

  props: {
    login: {
      type: Object,
      required: true,
    },
    schema: {
      type: Array,
      required: false,
      default: [],
    },
    tableId: {
      type: String,
      required: true,
    },
    loadingFlag: {
      type: Boolean,
      required: false,
      default: false,
    },
    saveFlag: {
      type: Boolean,
      required: false,
      default: false,
    },
    editingNewItem: {
      type: Boolean,
      required: false,
      default: false,
    },
    items: {
      type: Array,
      required: false,
      default: [],
    },
    showItem: {
      type: Number,
      required: false,
    },
    itemOpen: {
      type: Boolean,
      required: false,
    },
    saveNewItemOrder: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data() {
    const config = useRuntimeConfig();

    return {
      userName: config.public.userName,
      userPass: config.public.userPass,
      localItems: [],
      dragDelay: 0,
      dragVibration: 100,
      editingItem: false,
      itemCopy: null,
      inputError: false,
      inputErrorIndex: [],
      saveAllFlag: false,
    };
  },

  async mounted() {
    await this.loadData();
  },

  methods: {
    async loadData() {
      this.$emit("loadingFlag", true);

      if (this.schema.length > 0) {
        let items = await this.listRows(this.tableId);

        // parse to-from date-fields to json array
        for (const item of items) {
          for (const field of Object.entries(item)) {
            if (field[0].includes("|") && field[0].includes("to-from")) {
              if (item[field[0]]) {
                item[field[0]] = JSON.parse(item[field[0]]);
              }
            }
          }
        }

        this.$emit("items", JSON.parse(JSON.stringify(items)));
        this.$emit("loadingFlag", false);
      }
    },

    async listRows(tableid) {
      try {
        return await $fetch("/api/cms/rows", {
          method: "POST",
          headers: {
            Authorization: "Basic " + btoa(this.userName + ":" + this.userPass),
          },
          body: JSON.stringify({
            email: this.login.email,
            password: this.login.password,
            table_id: tableid,
            asc: true,
            order_by: "sortOrder",
          }),
        });
      } catch (err) {
        console.log(err);
      }
    },

    handleClick(event, item, index) {
      if (this.editingItem) return;

      this.itemCopy = JSON.parse(JSON.stringify(item));

      if (this.showItem === index) {
        this.$emit("showItem", index);
        this.$emit("itemOpen", !this.itemOpen);
      } else {
        this.$emit("showItem", index);
        this.$emit("itemOpen", true);
      }
    },

    async saveAllItems() {
      this.$emit("saveFlag", true);
      this.saveAllFlag = true;
      const items = JSON.parse(JSON.stringify(this.localItems));

      for (let [index, item] of items.entries()) {
        item.sortOrder = index.toString();
        item = this.processDateFormats(item);
      }

      try {
        const res = await $fetch("/api/cms/save-all-items", {
          method: "POST",
          headers: {
            Authorization: "Basic " + btoa(this.userName + ":" + this.userPass),
          },
          body: JSON.stringify({
            email: this.login.email,
            password: this.login.password,
            items: items,
            schema: this.schema,
            table_id: this.tableId,
          }),
        });

        this.$emit("itemOpen", false);
        this.$emit("saveFlag", false);
        this.saveAllFlag = false;
      } catch (err) {
        console.log(err);

        this.$emit("saveFlag", false);
        this.saveAllFlag = false;
      }
    },

    async saveItem(index) {
      if (index === this.showItem) {
        this.$emit("saveFlag", true);
        const item = this.processDateFormats(
          JSON.parse(JSON.stringify(this.localItems[index])),
        );

        try {
          const res = await $fetch(
            !this.editingNewItem ? "/api/cms/save-item" : "/api/cms/add-item",
            {
              method: "POST",
              headers: {
                Authorization:
                  "Basic " + btoa(this.userName + ":" + this.userPass),
              },
              body: JSON.stringify({
                email: this.login.email,
                password: this.login.password,
                item: item,
                schema: this.schema,
                table_id: this.tableId,
              }),
            },
          );

          const items = JSON.parse(JSON.stringify(this.localItems));
          items[index] = res;

          this.$emit("items", items);
          this.$emit("itemOpen", false);
          this.$emit("saveFlag", false);
          this.$emit("editingNewItem", false);
          this.editingItem = false;
        } catch (err) {
          console.log(err);
          this.$emit("saveFlag", false);
        }
      }
    },

    cancelItem(index) {
      if (this.editingNewItem) {
        const items = JSON.parse(JSON.stringify(this.localItems));
        items.pop();

        this.$emit("items", JSON.parse(JSON.stringify(items)));
        this.$emit("itemOpen", false);
        this.$emit("editingNewItem", false);
        this.editingItem = false;
      } else if (index === this.showItem) {
        const items = JSON.parse(JSON.stringify(this.localItems));
        items[index] = this.itemCopy;

        this.$emit("itemOpen", false);
        this.$emit("items", JSON.parse(JSON.stringify(items)));
        this.editingItem = false;
      }
    },

    async deleteItem(index) {
      this.$emit("saveFlag", true);

      try {
        const res = await $fetch("/api/cms/delete-item", {
          method: "POST",
          headers: {
            Authorization: "Basic " + btoa(this.userName + ":" + this.userPass),
          },
          body: JSON.stringify({
            email: this.login.email,
            password: this.login.password,
            item: this.localItems[index],
            schema: this.schema,
            table_id: this.tableId,
          }),
        });

        const items = JSON.parse(JSON.stringify(this.localItems));
        items.splice(index, 1);
        this.editingItem = false;
        this.$emit("itemOpen", false);
        this.$emit("items", JSON.parse(JSON.stringify(items)));
        this.$emit("saveFlag", false);
      } catch (err) {
        console.log(err);

        this.$emit("saveFlag", false);
      }
    },

    processDateFormats(item) {
      for (const field of this.schema) {
        if (field.type === "date") {
          item[field.name] = this.convertDateToIso(item[field.name]);
        }

        if (field.name.includes("|") && field.name.includes("to-from")) {
          item[field.name] = JSON.stringify(item[field.name]);
        }
      }

      return item;
    },

    convertDateToIso(date) {
      if (!date) return null;

      const originalDate = date;
      const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

      if (isoDatePattern.test(originalDate)) {
        return originalDate;
      } else {
        return new Date(originalDate).toISOString().split("T")[0]; // extract only the date part
      }
    },

    handleInputError(event, index) {
      this.inputErrorIndex[index] = event;
      this.inputError = !!this.inputErrorIndex.find((input) => input);
    },
  },

  watch: {
    schema() {
      this.editingItem = false;
      this.inputError = false;
      this.$emit("showItem", 0);
      this.$emit("itemOpen", false);
      this.$emit("editingNewItem", false);
      this.loadData();
    },

    itemOpen() {
      this.dragDelay = this.itemOpen ? 86400000 : 0;

      if (this.itemOpen) {
        this.inputErrorIndex = Array(this.schema.length - 1).fill(null); // do not include index
      }
    },

    items: {
      handler(newVal, oldVal) {
        this.localItems = JSON.parse(JSON.stringify(newVal));

        if (!this.itemOpen) return;

        if (
          JSON.stringify(newVal[this.showItem]) ===
          JSON.stringify(this.itemCopy)
        ) {
          this.editingItem = false;
        } else {
          this.editingItem = true;
        }
      },
      immediate: true,
      deep: true,
    },

    saveNewItemOrder() {
      if (this.saveNewItemOrder) {
        this.saveAllItems();
        this.$emit("saveNewItemOrder", false);
      }
    },
  },
};
</script>
