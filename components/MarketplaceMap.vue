<template>
  <ClientOnly>
    <div
      class="flex-cols relative mx-[calc(-50vw+50%)] flex min-h-screen w-screen"
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

      <div
        class="absolute top-4 right-4 z-600 min-h-52 grow cursor-pointer overflow-x-hidden overflow-y-auto rounded border border-white/25 shadow-xl"
      >
        <div
          class="relative w-96 max-w-96 rounded bg-neutral-900 p-4 pb-12 sm:p-8"
        >
          <Icon
            name="la:search-location"
            class="relative mb-3 h-10 max-h-10 min-h-10 w-10 max-w-10 min-w-10 text-zinc-500"
            :style="{ color: '#e44b50' }"
          ></Icon>

          <input
            v-model="searchCity"
            type="search"
            placeholder="Sök..."
            class="mb-6 w-full placeholder-neutral-400"
          />

          <div
            v-if="searchCity"
            v-for="marker in filteredMarkers"
            :key="marker.title"
            class="w-full text-sm leading-6 whitespace-nowrap text-neutral-300 hover:text-white"
          >
            {{ marker.title }}
          </div>

          <div
            v-if="!searchCity"
            class="text-sm leading-6 whitespace-nowrap text-neutral-300"
          >
            Visar alla marknadsplatser
          </div>
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

    filteredMarkers() {
      return [
        ...this.markers.filter((marker) => {
          return marker.title
            .toLowerCase()
            .includes(this.searchCity.toLowerCase());
        }),
      ].sort((a, b) => a.title.localeCompare(b.title));
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
