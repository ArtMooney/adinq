<template>
  <div class="h-screen w-full overflow-auto bg-[coral] p-8">
    <h1 class="mb-4 text-2xl">Marknadsplats Data</h1>

    <div class="mb-4">
      <input
        v-model="searchTerm"
        @keyup.enter="fetchData"
        placeholder="Sök ort (t.ex. Stockholm)"
        class="mr-2 rounded border px-4 py-2"
      />
      <button
        @click="fetchData"
        class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Sök
      </button>
      <button
        @click="resetSearch"
        class="ml-2 rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
      >
        Rensa
      </button>
    </div>

    <div class="mb-4 rounded bg-white p-4">
      <p><strong>Status:</strong> {{ status }}</p>
      <p><strong>Antal markörer:</strong> {{ markerCount }}</p>
    </div>

    <div v-if="markers.length > 0" class="rounded bg-white p-4">
      <h2 class="mb-2 font-bold">Första 5 markörerna:</h2>
      <div
        v-for="(marker, index) in markers.slice(0, 5)"
        :key="index"
        class="mb-4 border-b p-2"
      >
        <p><strong>Titel:</strong> {{ marker.title }}</p>
        <p><strong>Typ:</strong> {{ marker.type }}</p>
        <p><strong>Koordinater:</strong> {{ marker.lat }}, {{ marker.lng }}</p>
        <p v-if="marker.description">
          <strong>Beskrivning:</strong> {{ marker.description }}
        </p>
      </div>
    </div>

    <details v-if="markers.length > 0" class="mt-4 rounded bg-white p-4">
      <summary class="cursor-pointer font-bold">Visa rå JSON-data</summary>
      <pre class="mt-2 overflow-auto">{{
        JSON.stringify(markers, null, 2)
      }}</pre>
    </details>
  </div>
</template>

<script>
export default {
  name: "MarketplaceMap",

  data() {
    return {
      searchTerm: "",
      markers: [],
      status: "Redo att söka",
      markerCount: 0,
      loading: false,
    };
  },

  async mounted() {
    this.getMarkers();
  },

  methods: {
    async getMarkers() {
      this.loading = true;

      try {
        const response = await $fetch(
          `https://data.adinq.se/external/mp-data/?prjname=${encodeURIComponent(this.searchTerm)}`,
          { responseType: "text" },
        );

        const func = new Function(`var markers; ${response} return markers;`);

        this.markers = func() || [];

        this.markers = this.markers.map((marker) => ({
          ...marker,
          title: this.fixEncoding(marker.title),
          description: this.fixEncoding(marker.description),
          lat: parseFloat(marker.lat),
          lng: parseFloat(marker.lng),
        }));

        console.log(this.markers);
        return this.markers;
      } catch (error) {
        console.error("Error:", error);
        this.markers = [];
      } finally {
        this.loading = false;
      }
    },

    fixEncoding(text) {
      return text
        .replace(/Ã¥/g, "å")
        .replace(/Ã¤/g, "ä")
        .replace(/Ã¶/g, "ö")
        .replace(/Ã…/g, "Å")
        .replace(/Ã„/g, "Ä")
        .replace(/Ã–/g, "Ö")
        .replace(/Ã©/g, "é")
        .replace(/Ã¸/g, "ø")
        .replace(/Ã /g, "à");
    },

    resetSearch() {
      this.searchTerm = "Borås";
      this.markers = [];
      this.markerCount = 0;
      this.status = "Redo att söka";
    },
  },
};
</script>
