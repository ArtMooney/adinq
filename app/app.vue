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
        "@type": "AdvertisingAgency",
        name: "ADinQ",
        image: "https://www.adinq.se/images/adinq-presentation-poster.webp",
        url: "https://www.adinq.se",
        telephone: "",
        email: "",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Fabriksgatan 11, plan 3",
          addressLocality: "Borås",
          postalCode: "503 38",
          addressCountry: "SE",
        },
        description:
          "Vi hjälper företag att nå ut digitalt med DOOH (Digital Out of Home Media). Lokalt, regionalt eller rikstäckande - vi har lösningen för er digitala marknadsföring.",
        sameAs: [],
        areaServed: ["Sverige", "Göteborg", "Stockholm", "Malmö"],
        serviceType: [
          "Digital Out of Home reklam",
          "DOOH kampanjer",
          "Digital marknadsföring",
          "Utomhusreklam",
          "Digital skyltning",
        ],
        makesOffer: {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "DOOH Marknadsföring",
            description:
              "Digital Out of Home Media lösningar för lokala, regionala och rikstäckande kampanjer",
          },
        },
        additionalType: "https://schema.org/MarketingService",
        knowsAbout: [
          "Digital Out of Home",
          "DOOH",
          "Digital reklam",
          "Utomhusreklam",
          "Digital marknadsföring",
        ],
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
