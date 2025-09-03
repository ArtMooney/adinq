<template>
  <div
    class="mx-auto mt-8 flex max-w-screen-md flex-wrap justify-center gap-4 text-base"
  >
    <label class="flex w-full flex-col gap-2">
      <p class="font-semibold text-white/50 italic">
        Choose content table to edit
      </p>

      <select v-model="tableIndex">
        <option v-for="(table, index) of tables" :value="index">
          {{ table.name }}
        </option>
      </select>
    </label>
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
    const schema = await this.listFields(this.tables[this.tableIndex].id);

    this.$emit("schema", schema);
  },

  methods: {
    async listTables() {
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
      } catch (err) {
        if (err.status === 401) {
          deleteLocalStorage("adinq-cms");
          location.reload();
        }
      }
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
      } catch (err) {
        if (err.status === 401) {
          deleteLocalStorage("adinq-cms");
          location.reload();
        }
      }
    },
  },

  watch: {
    async tableIndex() {
      this.$emit("loadingFlag", true);
      const schema = await this.listFields(this.tables[this.tableIndex].id);
      this.$emit("schema", schema);
    },
  },
};
</script>
