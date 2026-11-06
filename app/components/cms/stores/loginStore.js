import { defineStore } from "pinia";

export const useLoginStore = defineStore("loginStore", {
  state: () => ({
    user: null,
    expiresAt: null,
    pending: false,
    initialized: false,
  }),

  getters: {
    isValid() {
      return Boolean(this.user && this.expiresAt > Date.now());
    },
  },

  actions: {
    async initialize() {
      this.pending = true;

      try {
        const session = await $fetch("/cms/session");
        this.user = session.user;
        this.expiresAt = session.expiresAt;
      } catch (error) {
        this.user = null;
        this.expiresAt = null;

        if (error.status !== 401) throw error;
      } finally {
        this.pending = false;
        this.initialized = true;
      }
    },

    async login(email, password) {
      this.pending = true;

      try {
        const session = await $fetch("/cms/login", {
          method: "POST",
          body: { email, password },
        });

        this.user = session.user;
        this.expiresAt = session.expiresAt;
        this.initialized = true;
      } finally {
        this.pending = false;
      }
    },

    async logout() {
      this.pending = true;

      try {
        await $fetch("/cms/logout", { method: "POST" });
        this.user = null;
        this.expiresAt = null;
      } finally {
        this.pending = false;
      }
    },
  },
});
