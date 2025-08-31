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

  props: {
    login: {
      type: Object,
      required: true,
    },
  },

  data() {
    const config = useRuntimeConfig();

    return {
      userName: config.public.userName,
      userPass: config.public.userPass,
      tableIndex: 0,
      tables: [],
    };
  },

  async mounted() {
    this.$emit("loadingFlag", true);

    this.tables = await this.listTables();
    console.log("TABLES", this.tables);

    const schema = await this.listFields(this.tables[this.tableIndex].id);
    console.log("SCHEMA", schema);

    this.$emit("schema", schema);
  },

  methods: {
    async changeTable(index) {
      this.$emit("loadingFlag", true);

      this.tableIndex = index;
      const schema = await this.listFields(this.tables[this.tableIndex].id);

      this.$emit("schema", schema);
    },

    async listTables() {
      console.log("LIST TABLES", this.login);
      try {
        return await $fetch("/api/cms/tables", {
          method: "POST",
          headers: {
            Authorization: "Basic " + btoa(this.userName + ":" + this.userPass),
          },
          body: JSON.stringify({
            email: this.login.email,
            password: this.login.password,
          }),
        });
      } catch (err) {}
    },

    async listFields(tableid) {
      try {
        return await $fetch("/api/cms/fields", {
          method: "POST",
          headers: {
            Authorization: "Basic " + btoa(this.userName + ":" + this.userPass),
          },
          body: JSON.stringify({
            email: this.login.email,
            password: this.login.password,
            table_id: tableid,
          }),
        });
      } catch (err) {}
    },
  },
};
</script>
