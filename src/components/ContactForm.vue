<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50" v-if="isOpen">
    <div class="bg-white max-w-2xl mx-auto mt-20 p-8 rounded-lg">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">Kontakta oss</h2>
        <button @click="close" class="text-gray-500 hover:text-gray-700">
          <XIcon class="h-6 w-6" />
        </button>
      </div>

      <form @submit.prevent="submitForm" class="space-y-4">
        <input
          v-model="form.name"
          type="text"
          placeholder="Namn"
          required
          class="w-full p-2 border rounded"
        />
        <input
          v-model="form.email"
          type="email"
          placeholder="Emailaddress"
          required
          class="w-full p-2 border rounded"
        />
        <textarea
          v-model="form.message"
          placeholder="Meddelande"
          required
          class="w-full p-2 border rounded h-32"
        ></textarea>

        <button
          type="submit"
          class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Skicka
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { XIcon } from "lucide-vue-next";

export default {
  components: { XIcon },

  data() {
    return {
      isOpen: false,
      form: {
        name: "",
        email: "",
        message: "",
      },
    };
  },

  methods: {
    close() {
      this.isOpen = false;
    },

    async submitForm() {
      try {
        // Implementation for form submission
        await this.sendForm(this.form);
        this.close();
      } catch (error) {
        console.error("Form submission error:", error);
      }
    },
  },
};
</script>
