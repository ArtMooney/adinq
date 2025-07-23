<template>
  <ClientOnly>
    <div
      @touchstart="handleStart"
      @touchend="handleEnd"
      @touchmove="handleMove"
      class="relative mx-[calc(-50vw+50%)] flex min-h-screen w-screen flex-col"
      tabindex="0"
    >
      <div
        class="pointer-events-none absolute top-4 right-4 z-[1000] flex gap-4 bg-neutral-400 p-8"
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
        :class="[
          'pointer-events-none absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-300 ease-in-out',
        ]"
      >
        Använd ⌘ + scrolla för att zooma på kartan
      </div>
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
      isScrolling: false,
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
    window.addEventListener("scroll", this.handleScroll);
  },

  beforeUnmount() {
    window.removeEventListener("keydown", this.checkCommandOrControl);
    window.removeEventListener("keyup", this.checkCommandOrControl);
    window.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    handleScroll() {
      this.isScrolling = true;

      clearTimeout(this.scrollTimeout);

      this.scrollTimeout = setTimeout(() => {
        this.isScrolling = false;
      }, 150);
    },

    handleStart(event) {
      this.activeTouches = event.touches.length;

      if (event.touches.length >= 2) {
        event.preventDefault();
      }

      this.updateOverlayVisibility();
    },

    handleEnd(event) {
      this.activeTouches = event.touches.length;

      this.updateOverlayVisibility();
    },

    handleMove(event) {
      if (event.touches.length >= 2) {
        event.preventDefault();
      }

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
};
</script>
