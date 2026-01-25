<script setup>
import IconQlementineIconsChevronDoubleDown16 from "~icons/qlementine-icons/chevron-double-down-16";
import IconFluentCommentQuote20Regular from "~icons/fluent/comment-quote-20-regular";

const staticContentStore = useStaticContentStore();
const staticContent = computed(
  () => staticContentStore.getContentByTitle("page - Varfor oss").content,
);

useCmsSeo("SEO page - Varfor oss");

definePageMeta({
  ssr: true,
});
</script>

<template>
  <Heading>
    <template #heading-content>
      <NuxtImg
        src="crowd-at-concert.jpg"
        alt=""
        class="h-full w-full object-cover"
        sizes="500px sm:640px md:768px lg:1024px xl:1280px 2xl:1536px"
        width="2000"
        height="1333"
        densities="x1"
        format="webp"
      />

      <div class="absolute inset-0 bg-[#1a2d38]/50"></div>

      <div
        class="absolute inset-0 flex flex-col items-center justify-center text-center"
      >
        <h1 class="mx-10 mb-8 md:mx-30">{{ staticContent.header.title }}</h1>

        <NuxtLink
          :to="{ path: '/varfor-oss', hash: '#varfor' }"
          class="absolute bottom-8 flex w-full items-center justify-center"
        >
          <IconQlementineIconsChevronDoubleDown16
            class="h-12 min-h-12 w-12 min-w-12 cursor-pointer opacity-70 hover:opacity-100"
          ></IconQlementineIconsChevronDoubleDown16>
        </NuxtLink>
      </div>
    </template>
  </Heading>

  <div id="varfor" class="mx-4 my-32 flex flex-col gap-8 sm:mx-8">
    <div
      class="relative mx-auto flex w-full flex-col items-center justify-center gap-8 text-center sm:max-w-lg lg:mb-0 lg:max-w-4xl"
    >
      <IconFluentCommentQuote20Regular
        class="h-20 max-h-20 min-h-20 w-20 max-w-20 min-w-20 sm:absolute sm:-top-16 sm:-left-16"
        style="color: #aaaaaa"
      ></IconFluentCommentQuote20Regular>

      <p v-html="formatText(staticContent.quote.text)"></p>
    </div>

    <div class="relative mt-32 grid gap-8 p-8">
      <NuxtImg
        src="background-bricks-flowers.jpg"
        alt=""
        class="absolute inset-0 h-full w-full object-cover opacity-15"
        sizes="500px sm:640px md:768px lg:1024px xl:1280px 2xl:1536px"
        width="2003"
        height="3000"
        format="webp"
      />

      <IconBlob
        icon="hugeicons:contact-01"
        icon-color="#6293a5"
        :message="formatText(staticContent.iconBlob.text)"
        link="/kontakta-oss"
      ></IconBlob>
    </div>

    <MarketingChannels></MarketingChannels>
  </div>
</template>

<script>
export default {
  name: "VarforOss",
};
</script>
