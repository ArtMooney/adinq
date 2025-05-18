<script setup>
useSeoMeta({
  title: "",
  description: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  twitterCard: "",
  twitterTitle: "",
  twitterDescription: "",
  twitterImage: "",
});

definePageMeta({
  ssr: true,
});
</script>

<template>
  <div
    class="relative mx-[calc(-50vw+50%)] w-screen"
    :style="{
      height: `calc(100${supportsDvh ? 'dvh' : 'vh'} - ${navHeight}px)`,
    }"
  >
    <NuxtImg
      src="raychan-NWyxR75AkFY-unsplash.jpg"
      alt=""
      class="h-full w-full object-cover"
      sizes="1000px md:2000px"
      width="3992"
      height="6240"
      densities="x1"
    />

    <div class="absolute inset-0 bg-[#365e80]/70"></div>

    <div
      class="absolute inset-0 flex flex-col items-center justify-center bg-amber-700/15 text-center"
    >
      <h1
        class="mx-10 -mt-96 mb-8 text-3xl sm:text-4xl md:mx-20 md:text-5xl md:leading-12 lg:text-6xl lg:leading-16"
      >
        Vi producerar er reklamfilm eller slide för storbildsskärmar!
      </h1>
      <div class="px-8 text-lg lg:text-2xl">
        - Vi kan hjälpa er med allt under samma tak!
      </div>

      <NuxtLink
        :to="{ path: '/media-produktion', hash: '#info' }"
        class="absolute bottom-24 flex w-full items-center justify-center sm:bottom-16"
      >
        <Icon
          name="qlementine-icons:chevron-double-down-16"
          class="h-12 min-h-12 w-12 min-w-12 cursor-pointer opacity-70 hover:opacity-100"
        ></Icon>
      </NuxtLink>
    </div>
  </div>

  <div id="info" class="mx-4 my-20 flex flex-col gap-8 sm:mx-8">
    <div class="grid items-center gap-8 lg:grid-cols-2">
      <div class="mx-8 mb-8 flex flex-col gap-6 lg:mb-0">
        <p>
          Stort eller litet företag? Vi har lösningar för det mesta. Nej vi kan
          inte trolla men vi har en bred kompetens och vi försöker alltid skapa
          bästa möjliga produktion utifrån ditt företags behov och plånbok här
          och nu. Vi hjälper er gärna!
        </p>
        <p>
          Vi gör både reklamfilmer och material till storbildsskärmar i olika
          storlek och komplexitet för våra digitala utomhusmedier.
        </p>
        <p>
          Tänk på att nyttan med en bra film är större än bara en enskild
          kampanj. Ni kan även fritt använda er film i sociala medier och nå
          ännu fler människor samtidigt som ni stärker ert varumärke.
        </p>
      </div>

      <VideoBlob video-Link="https://qcard.adinq.se/?i=1747390713"></VideoBlob>
    </div>

    <h3 class="mt-32 text-center">
      Mer information om våra marknadsföringskanaler
    </h3>

    <p v-if="galleryStores.length > 0" class="text-center">
      Några exempelfilmer som vi producerat. Ni kan hitta fler genom att klicka
      på Youtube-länken i övre högra hörnet.
    </p>

    <QcardGallery
      v-if="galleryStores.length > 0"
      :galleryData="galleryStores"
    ></QcardGallery>

    <p v-if="galleryBigscreens.length > 0" class="mt-20 text-center">
      Några exempel på produktioner för storbildsskärmar.
    </p>

    <QcardGallery
      v-if="galleryBigscreens.length > 0"
      :galleryData="galleryBigscreens"
    ></QcardGallery>

    <div class="relative mt-32 grid gap-8 p-8">
      <NuxtImg
        src="birmingham-museums-trust-BPWZ01FtySg-unsplash.jpg"
        alt=""
        class="absolute inset-0 h-full w-full object-cover opacity-15"
        sizes="1000px md:2000px"
        width="2912"
        height="2032"
      />

      <IconBlob
        icon="ph:film-reel-light"
        icon-color="#e09963"
        message="En bild säger mer än tusen ord. 10-20 sekunder säger ännu mer. I kombination med enkla, personliga och kärnfulla budskap kan vi hjälpa dig att stärka ditt varumärke hos både befintliga och nya kunder. Effektfulla filmer som passar perfekt att dela på sociala medier."
        link="/"
      ></IconBlob>

      <IconBlob
        icon="bi:camera-reels"
        icon-color="#67ac6e"
        message="Perfekt för dina kampanjer. På en bra grund är det enkelt att byta budskap under året."
        link="/"
      ></IconBlob>

      <IconBlob
        icon="teenyicons:headset-outline"
        icon-color="#ac67a6"
        message="Att önska sina kunder en Glad Påsk, Trevlig Sommar eller God Jul har ett mycket stort värde och stärker din image. Kundvård på ett mycket enkelt sätt och vi hjälper dig gärna!"
        link="/"
      ></IconBlob>

      <IconBlob
        icon="hugeicons:contact-01"
        icon-color="#6293a5"
        message="Kontakta oss för mer info"
        link="/"
      ></IconBlob>
    </div>
  </div>
</template>

<script>
export default {
  name: "MediaProduktion",

  inject: ["navbarHeight"],

  data() {
    const config = useRuntimeConfig();
    return {
      userName: config.public.userName,
      userPass: config.public.userPass,
      supportsDvh: null,
      galleryStores: [],
      galleryBigscreens: [],
      error: false,
    };
  },

  computed: {
    navHeight() {
      return this.navbarHeight();
    },
  },

  async created() {
    try {
      const gallery = await $fetch("/api/get-mediaproduktioner", {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa(this.userName + ":" + this.userPass),
        },
      });

      this.galleryStores = gallery.filter(
        (qcard) => qcard.filmtyp.value === "butiksfilm",
      );

      this.galleryBigscreens = gallery.filter(
        (qcard) => qcard.filmtyp.value === "storbildsfilm",
      );
    } catch (err) {
      this.error = true;
    }
  },

  mounted() {
    this.supportsDvh = CSS.supports("height", "100dvh");
  },
};
</script>
