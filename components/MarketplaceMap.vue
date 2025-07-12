<template>
  <div class="h-screen w-full overflow-auto bg-[pink]/50 p-8">
    <h1 class="mb-4 text-2xl">Marknadsplats Data</h1>

    <div class="flex gap-4">
      <input
        v-model="searchTerm"
        @keyup.enter="getMarkers"
        placeholder="Sök ort (t.ex. Stockholm)"
      />

      <button @click="getMarkers" class="primary">Sök</button>
      <button @click="resetSearch" class="primary">Rensa</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MarketplaceMap",

  data() {
    return {
      searchTerm: "",
      markers: [],
      loading: false,
    };
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
      this.searchTerm = "";
      this.markers = [];
    },
  },
};
</script>
