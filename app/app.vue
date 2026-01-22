<script setup>
import { useStaticContentStore } from "~/stores/static-content.js";

const config = useRuntimeConfig();
const siteUrl = config.public.publicSiteUrl;
const staticContentStore = useStaticContentStore();
await staticContentStore.loadContent();

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
        "@type": ["AdvertisingAgency", "LocalBusiness"],
        "@id": "https://www.adinq.se/#organization",
        name: "ADinQ AB",
        legalName: "ADinQ AB",
        alternateName: "ADinQ",
        url: "https://www.adinq.se",
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/adinq_vit.svg`,
          width: 250,
          height: 60,
        },
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/adinq-presentation-poster.webp`,
          width: 1200,
          height: 630,
        },

        telephone: "+46-33-722-24-00",
        email: "info@adinq.se",

        address: {
          "@type": "PostalAddress",
          streetAddress: "Fabriksgatan 11, plan 3",
          addressLocality: "Borås",
          addressRegion: "Västra Götalands län",
          postalCode: "503 38",
          addressCountry: "SE",
        },

        geo: {
          "@type": "GeoCoordinates",
          latitude: "57.71735",
          longitude: "12.94223",
        },

        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:00",
            closes: "17:00",
          },
        ],

        description:
          "Vi hjälper företag att nå ut digitalt med DOOH (Digital Out of Home Media). Lokalt, regionalt eller rikstäckande - vi har lösningen för er digitala marknadsföring.",

        sameAs: [
          "https://www.facebook.com/ADinQAB/?fref=ts",
          "https://www.linkedin.com/company/adinq-ab/?originalSubdomain=se",
          "https://www.youtube.com/channel/UCnc_HP_7V8zWUTZBpGRdp2w/videos",
        ],

        areaServed: [
          {
            "@type": "Country",
            name: "Sverige",
          },
          {
            "@type": "City",
            name: "Göteborg",
          },
          {
            "@type": "City",
            name: "Stockholm",
          },
          {
            "@type": "City",
            name: "Malmö",
          },
          {
            "@type": "City",
            name: "Borås",
          },
        ],

        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "DOOH Marknadsföringstjänster",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "ButiksTV",
                description:
                  "Dynamisk digital skärmreklam för butiker och gallerior. Nå kunderna direkt vid köpögonblicket med skräddarsytt innehåll som stärker varumärket och driver försäljning.",
                serviceType: "ButiksTV",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Digital Out of Home Reklam",
                description:
                  "DOOH kampanjer för lokala, regionala och rikstäckande marknadsföring via digitala skyltar och skärmar i offentliga miljöer.",
                serviceType: "Digital Out of Home reklam",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Medieproduktion",
                description:
                  "Professionell produktion av digitalt innehåll anpassat för ButiksTV och DOOH-kampanjer.",
                serviceType: "Medieproduktion",
              },
            },
          ],
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
