import { defineStore } from "pinia";

export const useStaticContentStore = defineStore("staticContent", {
  state: () => ({
    content: [],
    error: null,
  }),

  getters: {
    getContentByTitle: (state) => (title) => {
      return state.content.find((item) => item.title === title) || {};
    },
  },

  actions: {
    async loadContent() {
      if (this.content.length > 0) {
        return;
      }

      const config = useRuntimeConfig();
      const authHeaders = {
        Authorization:
          "Basic " +
          btoa(config.public.userName + ":" + config.public.userPass),
      };

      try {
        const { data, error } = await useFetch("/cms/static", {
          method: "GET",
          headers: authHeaders,
          default: () => [],
          key: "all-static-content",
        });

        if (error.value) {
          this.error = error.value;
        } else if (data.value) {
          this.content = data.value;
        }
      } catch (err) {
        this.error = err;
      }
    },
  },
});
