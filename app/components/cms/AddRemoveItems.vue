<template>
  <div
    class="mx-auto my-12 flex max-w-screen-md flex-wrap justify-center gap-4 text-center text-base select-none"
  >
    <div>Add, edit or remove content below</div>

    <div class="flex w-full justify-between">
      <div
        @click="addItem()"
        class="cursor-pointer rounded border border-white/25 bg-[#548b63] px-2 py-1 text-sm hover:bg-[#6bad7d]"
      >
        + Add new item
      </div>

      <div class="relative flex text-sm">
        <div
          @click="showDateList = !showDateList"
          class="cursor-pointer rounded border border-white/25 bg-[#534d75] px-2 py-1 hover:bg-[#5f587f]"
        >
          Sort list by date
        </div>

        <div
          v-if="showDateList"
          @click="showDateList = false"
          class="fixed inset-0 z-0 bg-transparent"
        ></div>

        <div
          v-if="showDateList"
          class="absolute top-0 right-0 z-10 mt-8 min-w-56 rounded bg-black p-4"
        >
          <div class="mb-2 justify-self-end">Choose date field</div>

          <div v-if="getDateList.length < 1" class="w-full text-right">-</div>
          <div
            v-for="date of getDateList"
            @click="sortDateFields(date.fieldName)"
            class="w-full cursor-pointer py-1 text-right hover:bg-white/25"
          >
            {{ date.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddRemoveItems",

  emits: [
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
    items: {
      type: Array,
      required: false,
      default: [],
    },
    schema: {
      type: Array,
      required: false,
      default: [],
    },
    editingNewItem: {
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
      showDateList: false,
      order: false,
    };
  },

  computed: {
    getDateList() {
      const dateList = [];

      for (const field of this.schema) {
        if (field.type === "date" || field.name.split("|")[0] === "datum") {
          dateList.push({
            name: field.name.split("|")[0],
            fieldName: field.name,
          });
        }
      }

      return dateList;
    },
  },

  methods: {
    addItem() {
      if (this.editingNewItem) return;

      const index = this.items.length;
      let fields = {};
      const items = JSON.parse(JSON.stringify(this.items));

      for (const field of this.schema) {
        if (field.type === "boolean") {
          fields[field.name] = false;
        } else if (field.type === "file") {
          fields[field.name] = [];
        } else if (field.name.split("|")[1] === "to-from") {
          fields[field.name] = [];
        } else if (field.type === "single_select") {
          fields[field.name] = null;
        } else {
          fields[field.name] = "";
        }
      }

      fields.index = index.toString();

      items.push({
        ...fields,
        id: "",
      });

      this.$emit("items", items);
      this.$emit("showItem", index);
      this.$emit("itemOpen", true);
      this.$emit("editingNewItem", true);

      this.$router.push({
        hash: `#list-item-${items.length - 1}`,
      });
    },

    async sortDateFields(fieldName) {
      if (this.schema.length > 0) {
        this.order = !this.order;

        let items = await this.listRows(
          this.schema[0].table_id,
          fieldName,
          this.order,
        );

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
        this.$emit("saveNewItemOrder", true);
        this.showDateList = false;
      }
    },

    async listRows(tableid, orderBy, asc, search) {
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
            asc: asc,
            order_by: orderBy,
            search: search,
          }),
        });
      } catch (err) {
        console.log(err);
      }
    },
  },

  watch: {
    schema() {
      this.order = false;
    },
  },
};
</script>
