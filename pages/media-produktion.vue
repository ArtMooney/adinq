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

const config = useRuntimeConfig();

const { data: gallery, error } = await useFetch("/api/media-productions", {
  method: "GET",
  headers: {
    Authorization:
      "Basic " + btoa(config.public.userName + ":" + config.public.userPass),
  },
  default: () => [],
});

const galleryStores = gallery.value.filter(
  (qcard) => qcard.filmtyp.value === "butiksfilm",
);

const galleryBigscreens = gallery.value.filter(
  (qcard) => qcard.filmtyp.value === "storbildsfilm",
);
</script>

<template>
  <Heading>
    <template #heading-content>
      <NuxtImg
        src="raychan-NWyxR75AkFY-unsplash.jpg"
        alt=""
        class="h-full w-full object-cover"
        sizes="1000px md:2000px"
        width="3992"
        height="6240"
        densities="x1"
        format="webp"
      />

      <div class="absolute inset-0 bg-[#2f3f4d]/50"></div>

      <div
        class="absolute inset-0 flex flex-col items-center justify-center text-center"
      >
        <h1 class="mx-10 mb-8 md:mx-30">
          Vi producerar er reklamfilm eller slide för storbildsskärmar!
        </h1>

        <div class="max-w-3xl px-8 text-lg lg:text-2xl">
          - Vi kan hjälpa er med allt under samma tak!
        </div>

        <NuxtLink
          :to="{ path: '/media-produktion', hash: '#info' }"
          class="absolute bottom-8 flex w-full items-center justify-center"
        >
          <Icon
            name="qlementine-icons:chevron-double-down-16"
            class="h-12 min-h-12 w-12 min-w-12 cursor-pointer opacity-70 hover:opacity-100"
          ></Icon>
        </NuxtLink>
      </div>
    </template>
  </Heading>

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

    <h3 id="media-gallery" class="mt-32 text-center">
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
        format="webp"
      />

      <IconBlob
        icon="ph:film-reel-light"
        icon-color="#e09963"
        message="En bild säger mer än tusen ord. 10-20 sekunder säger ännu mer. I kombination med enkla, personliga och kärnfulla budskap kan vi hjälpa dig att stärka ditt varumärke hos både befintliga och nya kunder. Effektfulla filmer som passar perfekt att dela på sociala medier."
        link="/media-produktion#media-gallery"
      ></IconBlob>

      <IconBlob
        icon="bi:camera-reels"
        icon-color="#67ac6e"
        message="Perfekt för dina kampanjer. På en bra grund är det enkelt att byta budskap under året."
        link="/media-produktion#media-gallery"
      ></IconBlob>

      <IconBlob
        icon="teenyicons:headset-outline"
        icon-color="#ac67a6"
        message="Att önska sina kunder en Glad Påsk, Trevlig Sommar eller God Jul har ett mycket stort värde och stärker din image. Kundvård på ett mycket enkelt sätt och vi hjälper dig gärna!"
        link="/kundutlatanden"
      ></IconBlob>

      <IconBlob
        icon="hugeicons:contact-01"
        icon-color="#6293a5"
        message="Kontakta oss för mer info"
        link="/kontakta-oss"
      ></IconBlob>
    </div>
  </div>
</template>

<script>
export default {
  name: "MediaProduktion",
};
</script>
