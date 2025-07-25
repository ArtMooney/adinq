<template>
  <ClientOnly>
    <div
      class="relative mx-[calc(-50vw+50%)] flex min-h-screen w-screen flex-row justify-between"
      tabindex="0"
    >
      <LMap
        v-if="gestureHandlingLoaded"
        class="relative min-h-screen"
        :zoom="zoom"
        :center="center"
        :use-global-leaflet="true"
        :options="{ gestureHandling: true }"
      >
        <LTileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        <LMarker :lat-lng="[59.3293, 18.0686]" />
        <LMarker
          v-for="marker in markers"
          :key="marker.title"
          :lat-lng="[marker.lat, marker.lng]"
        />
      </LMap>

      <div class="bg-neutral-500 p-4">
        <input
          v-model="searchCity"
          type="search"
          placeholder="Sök..."
          class="mb-4 w-full placeholder-neutral-400"
        />

        <div
          v-if="searchCity"
          v-for="marker in markers"
          :key="marker.title"
          class="mx-2 text-sm leading-6 whitespace-nowrap text-neutral-300 hover:text-white"
        >
          {{ marker.title }}
        </div>

        <div
          class="mx-2 text-sm leading-6 whitespace-nowrap text-neutral-300 hover:text-white"
        >
          Visar alla marknadsplatser
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script>
export default {
  name: "MarketplaceMap",

  data() {
    return {
      searchCity: "",
      markers: [],
      loading: false,
      zoom: 6,
      gestureHandlingLoaded: false,
    };
  },

  computed: {
    center() {
      if (this.markers.length === 0) return [59.3293, 18.0686];

      const avgLat =
        this.markers.reduce((sum, m) => sum + m.lat, 0) / this.markers.length;
      const avgLng =
        this.markers.reduce((sum, m) => sum + m.lng, 0) / this.markers.length;

      return [avgLat, avgLng];
    },
  },

  async created() {
    if (process.client) {
      this.loadGestureHandling();
    }

    await this.getMarkers();
  },

  methods: {
    async getMarkers() {
      this.loading = true;

      try {
        const response = await $fetch(
          `https://data.adinq.se/external/mp-data/?prjname=`,
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

    async loadGestureHandling() {
      try {
        const L = (await import("leaflet")).default;
        const { GestureHandling } = await import("leaflet-gesture-handling");
        await import(
          "leaflet-gesture-handling/dist/leaflet-gesture-handling.css"
        );

        L.Map.addInitHook("addHandler", "gestureHandling", GestureHandling);
      } catch (error) {
        console.error("Failed to load gesture handling:", error);
      } finally {
        this.gestureHandlingLoaded = true;
      }
    },
  },
};
</script>
