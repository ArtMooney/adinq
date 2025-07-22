<template>
  <ClientOnly>
    <div
      class="relative mx-[calc(-50vw+50%)] flex min-h-screen w-screen flex-col"
      @touchstart="handleStart"
      @touchend="handleEnd"
      @touchmove="handleMove"
      tabindex="0"
    >
      <div
        class="absolute top-4 right-4 z-[1000] flex gap-4 bg-neutral-400 p-8"
      >
        <input
          v-model="searchTerm"
          @keyup.enter="getMarkers"
          placeholder="Sök ort (t.ex. Stockholm)"
        />

        <button @click="getMarkers" class="primary">Sök</button>
        <button @click="resetSearch" class="primary">Rensa</button>
        <div class="mt-4">{{ activeTouches }}</div>
        <div class="mt-4">{{ showOverlay }}</div>
      </div>

      <LMap
        ref="map"
        class="relative grow transform-gpu"
        :zoom="zoom"
        :center="center"
        :use-global-leaflet="false"
        :options="{
          dragging: false,
          touchZoom: false,
          scrollWheelZoom: false,
        }"
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

      <!--      <div v-if="showOverlay" class="absolute inset-0 bg-black/50"></div>-->
    </div>
  </ClientOnly>
</template>

<script>
export default {
  name: "MarketplaceMap",

  data() {
    return {
      searchTerm: "",
      markers: [],
      loading: false,
      zoom: 6,
      isCommandOrControlPressed: false,
      activeTouches: 0,
      scrollTimeout: null,
      showOverlay: false,
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

  mounted() {
    this.getMarkers();

    window.addEventListener("keydown", this.checkCommandOrControl);
    window.addEventListener("keyup", this.checkCommandOrControl);
  },

  beforeUnmount() {
    window.removeEventListener("keydown", this.checkCommandOrControl);
    window.removeEventListener("keyup", this.checkCommandOrControl);
  },

  methods: {
    handleStart(event) {
      this.activeTouches = event.touches.length;

      this.updateOverlayVisibility();
    },

    handleEnd(event) {
      this.activeTouches = event.touches.length;

      this.updateOverlayVisibility();
    },

    handleMove(event) {
      event.preventDefault();
      this.updateOverlayVisibility();
    },

    checkCommandOrControl(event) {
      // const wasPressed = this.isCommandOrControlPressed;
      // this.isCommandOrControlPressed = event.metaKey || event.ctrlKey;
      //
      // if (wasPressed !== this.isCommandOrControlPressed) {
      //   this.updateOverlayVisibility(event);
      // }
    },

    updateOverlayVisibility() {
      this.showOverlay = this.activeTouches >= 2;

      // this.showOverlay =
      //   this.isCommandOrControlPressed || this.activeTouches >= 2;
    },

    enableMapDragging() {
      if (!this.$refs.map?.leafletObject) return;

      const map = this.$refs.map.leafletObject;

      map.dragging.enable();
      map.touchZoom.enable();
      map.scrollWheelZoom.enable();
    },

    disableMapDragging() {
      if (!this.$refs.map?.leafletObject) return;

      const map = this.$refs.map.leafletObject;

      map.dragging.disable();
      map.touchZoom.disable();
      map.scrollWheelZoom.disable();
    },

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

        // console.log(this.markers);

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

  watch: {
    showOverlay() {
      if (this.showOverlay) {
        this.enableMapDragging();
      } else {
        this.disableMapDragging();
      }
    },
  },
};
</script>
