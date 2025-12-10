<script setup>
import IconQlementineIconsChevronDoubleDown16 from "~icons/qlementine-icons/chevron-double-down-16";
import IconFluentCommentQuote20Regular from "~icons/fluent/comment-quote-20-regular";

const config = useRuntimeConfig();
const imageBaseUrl = config.public.imageBaseUrl;

useSeoMeta({
  title: "Varför välja Adinq? | Tränga igenom mediebruset med DOOH",
  description:
    "Vi fångar ögonblicket då människor står still - sysslolösa en kort stund i vardagen. Varumärkesexponering på digitala annonsytor där människorna finns. Syns på rätt sätt!",
  ogTitle: "Varför välja Adinq? | Tränga igenom mediebruset med DOOH",
  ogDescription:
    "Vi fångar ögonblicket då människor står still och möjliggör varumärkesexponering där människorna finns.",
  ogImage: `${imageBaseUrl}/crowd-at-concert.jpg`,
  twitterCard: "summary_large_image",
  twitterTitle: "Varför välja Adinq? | Tränga igenom mediebruset",
  twitterDescription:
    "Vi fångar ögonblicket då människor står still och möjliggör varumärkesexponering där människorna finns.",
  twitterImage: `${imageBaseUrl}/crowd-at-concert.jpg`,
});

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
        <h1 class="mx-10 mb-8 md:mx-30">Varför välja oss?</h1>

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

      <p>
        "Hos människan, -det är här allt börjar. Att påverka och skapa
        förändring hos individen är mångas önskan. Många aktörer vill ha just
        din uppmärksamhet, men hur gör man egentligen för att tränga igenom
        mediebruset i dagens informationssamhälle?
      </p>
      <p>
        Vi på ADinQ tror inte att det finns ett enskilt svar. Flera saker spelar
        in, på grund av att allt börjar hos just människan. Samhället utvecklas
        i snabb takt på flera sätt, vilket i sin tur påverkar det mänskliga
        beteendet. För att hänga med krävs det att man anpassar sig.
      </p>
      <p>
        Vi möjliggör varumärkesexponering på platser där människorna finns. Vi
        fångar ögonblicket då människor står still, -sysslolösa en kort stund i
        vardagen. På digitala annonsytor i miljöer utanför människors hem. Vi
        hjälper er att synas på rätt sätt!"
      </p>
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
        message="Kontakta oss för mer info"
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
