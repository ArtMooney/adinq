<script setup>
useSeoMeta({
  title:
    "Kommersialisera din fastighet med DOOH | Storbildsskärmar & utomhusmedia",
  description:
    "Öka intäkterna från din fastighet med storbildsskärmar och DOOH utomhusmedia. Vi hjälper fastighetsägare, markägare och skärmägare med installation, montage och mediaförsäljning.",
  ogTitle: "Kommersialisera din fastighet med DOOH",
  ogDescription:
    "Öka intäkterna från din fastighet med storbildsskärmar och DOOH utomhusmedia. Installation, montage och mediaförsäljning.",
  ogImage: "https://www.adinq.se/city-stockholm.jpg",
  twitterCard: "summary_large_image",
  twitterTitle: "Kommersialisera din fastighet med DOOH",
  twitterDescription:
    "Öka intäkterna från din fastighet med storbildsskärmar och DOOH utomhusmedia.",
  twitterImage: "https://www.adinq.se/city-stockholm.jpg",
});

definePageMeta({
  ssr: true,
});
</script>

<template>
  <Heading>
    <template #heading-content>
      <NuxtImg
        src="city-stockholm.jpg"
        alt=""
        class="h-full w-full object-cover"
        sizes="1000px md:2000px"
        width="5472"
        height="3648"
        densities="x1"
        format="webp"
      />

      <div class="absolute inset-0 bg-[#29648b]/40"></div>

      <div
        class="absolute inset-0 flex flex-col items-center justify-center text-center"
      >
        <h1 class="mx-10 mb-8 md:mx-30">Kommersialisera din fastighet</h1>

        <div class="max-w-3xl px-8 text-lg lg:text-2xl">
          Vi hjälper dig att kommersialisera ytor och fastigheter samt att
          inkludera dem i vårt snabbväxande nätverk av utomhusmedia.
        </div>

        <NuxtLink
          :to="{ path: '/kommersialisera', hash: '#info' }"
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
    <div class="relative grid gap-8 p-4 sm:p-8">
      <NuxtImg
        src="background-bricks-flowers.jpg"
        alt=""
        class="absolute inset-0 h-full w-full object-cover opacity-15"
        sizes="1000px md:2000px"
        width="2912"
        height="2032"
        format="webp"
      />

      <IconBlob
        icon="streamline-ultimate-color:screen-curved"
        title="För skärmägare"
        message="Äger ni en eller flera storbildsskärmar eller annan utomhusmedia? Öka era intäkter genom att ansluta er till vårt snabbt växande nätverk av DOOH utomhusmedia där vi öppnar upp en värld av möjligheter för mediaförsäljning till annonsörer och varumärken av alla storlekar. Klicka nedan och kontakta oss så hjälper vi er."
        link=""
      ></IconBlob>

      <IconBlob
        icon="streamline-ultimate-color:business-deal-handshake-1"
        title="Hur vi jobbar"
        message="Vi har ett ingående samarbete med teknikbolaget LEDventure.se som är specialiserade på montage och utrustning för DOOH, som bland annat storbildsskärmar och LEDperimetrar."
        link=""
      ></IconBlob>

      <IconBlob
        icon="fxemoji:housebuilding"
        title="För fastighetsägare & markägare"
        message="Med storbildsskärmar på er fasad kan ni nyttja er byggnads potential mer än ni kanske trodde var möjligt. Det ger även liv och färg till fasaden och skapar intäktsmöjligheter om placeringen är bra där många ser skylten. Vi kan hjälpa er med allt från installation, montage och service när skärmen sitter på plats. Om ni inte bara vill ha egna budskap på skärmen så kan vi även hjälpa till med reklamförsäljning för att ni ska få ut det mesta av er storbildsinvestering."
        link=""
      ></IconBlob>
    </div>

    <MarketingChannels></MarketingChannels>
  </div>
</template>

<script>
export default {
  name: "Kommersialisera",
};
</script>
