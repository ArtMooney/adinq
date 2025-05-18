<script setup>
useHead({
  htmlAttrs: {
    lang: "sv",
  },

  script: [
    {
      key: "schema-org-data",
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Säkra besiktningar",
        image: "https://sakrabesiktningar.se/images/logo.png",
        url: "https://sakrabesiktningar.se",
        telephone: "0760-05 75 15",
        email: "info@sakrabesiktningar.se",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Varlabergsvägen 29",
          addressLocality: "Kungsbacka",
          postalCode: "434 39",
          addressCountry: "SE",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 57.49,
          longitude: 12.05062,
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "17:00",
        },
        description:
          "Vi utför ackrediterad och oberoende besiktning av hissar, portar och lyftanordningar. Vi bidrar till ert arbete med att göra era anordningar säkra, funktionsdugliga samt att de uppfyller gällande krav från lagstiftning.",
        sameAs: ["", ""],
        priceRange: "",
        areaServed: [
          "Kungsbacka",
          "Göteborg",
          "Halland",
          "Västra Götaland",
          "Sverige",
        ],
        serviceType: [
          "Besiktning av hissar",
          "Besiktning av portar",
          "Besiktning av lyftanordningar",
        ],
        makesOffer: {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Ackrediterad besiktning",
            description:
              "Ackrediterad och oberoende besiktning av hissar, portar och lyftanordningar",
          },
        },
      }),
    },
  ],
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
