export const useCmsSeo = (seoContentTitle) => {
  const config = useRuntimeConfig();
  const imageBaseUrl = config.public.imageBaseUrl;
  const publicSiteUrl = config.public.publicSiteUrl;
  const staticContentStore = useStaticContentStore();

  const staticContentSEO = computed(() => {
    return staticContentStore.getContentByTitle(seoContentTitle).content;
  });

  useSeoMeta({
    title: () => staticContentSEO.value.title,
    description: () => staticContentSEO.value.description,
    ogTitle: () => staticContentSEO.value.ogTitle,
    ogDescription: () => staticContentSEO.value.ogDescription,
    ogImage: () =>
      `${imageBaseUrl}/cms-files/${staticContentSEO.value.ogImage}`,
    ogUrl: `${publicSiteUrl}`,
    ogType: "website",
    ogSiteName: "Adinq",
    ogLocale: "sv_SE",
    twitterCard: "summary_large_image",
    twitterTitle: () => staticContentSEO.value.twitterTitle,
    twitterDescription: () => staticContentSEO.value.twitterDescription,
    twitterImage: () =>
      `${imageBaseUrl}/cms-files/${staticContentSEO.value.twitterImage}`,
    robots: "index, follow",
    author: "Adinq",
  });
};
