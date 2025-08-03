<!--<script setup>-->
<!--import { listFields } from "~/utils/listFields.js";-->
<!--import { getLocalStorageClient } from "~/utils/getLocalStorage.js";-->
<!--</script>-->

<template>
  <div
    class="mx-auto mt-8 flex max-w-screen-md flex-wrap justify-center gap-4 text-base"
  >
    <div v-for="(table, index) of tables">
      <div
        @click="changeTable(index)"
        :class="[
          tableIndex === index
            ? 'cursor-pointer border-b-2 border-white hover:bg-gradient-to-r hover:from-[#ff6363] hover:via-[#b776e5] hover:to-white hover:bg-clip-text hover:text-transparent'
            : 'cursor-pointer hover:bg-gradient-to-r hover:from-[#ff6363] hover:via-[#b776e5] hover:to-white hover:bg-clip-text hover:text-transparent',
        ]"
      >
        {{ table.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableList",

  data() {
    const config = useRuntimeConfig();

    return {
      userName: config.public.userName,
      userPass: config.public.userPass,
      tableIndex: 0,
      login: {},
      tables: [],
    };
  },

  async created() {
    if (getLocalStorage("borashv-cms")) {
      this.login = getLocalStorage("borashv-cms");
    }

    this.$emit("loadingFlag", true);

    this.tables = await this.listTables();
    const schema = await listFields(this.tables[this.tableIndex].id);

    this.$emit("schema", schema);
  },

  methods: {
    async changeTable(index) {
      this.$emit("loadingFlag", true);

      this.tableIndex = index;
      const schema = await listFields(this.tables[this.tableIndex].id);

      this.$emit("schema", schema);
    },

    async listTables() {
      const res = await fetch("/list-tables", {
        method: "POST",
        headers: {
          Authorization: "Basic " + btoa(`${this.userName}:${this.userPass}`),
        },
        body: JSON.stringify({
          email: this.login.email,
          password: this.login.password,
        }),
      });

      return await res.json();
    },
  },
};
</script>
