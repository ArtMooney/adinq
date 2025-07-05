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
    class="relative mx-[calc(-50vw+50%)] min-h-80 w-screen"
    :style="{
      height: `${windowHeight - navHeight}px`,
    }"
  >
    <NuxtImg
      src="noelle-rebekah-iD6o6fydAWE-unsplash.jpg"
      alt=""
      class="h-full w-full object-cover"
      sizes="1000px md:2000px"
      width="3888"
      height="2592"
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
        <Icon
          name="qlementine-icons:chevron-double-down-16"
          class="h-12 min-h-12 w-12 min-w-12 cursor-pointer opacity-70 hover:opacity-100"
        ></Icon>
      </NuxtLink>
    </div>
  </div>

  <div id="varfor" class="mx-4 my-32 flex flex-col gap-8 sm:mx-8">
    <div
      class="relative mx-auto flex w-full flex-col items-center justify-center gap-8 text-center sm:max-w-lg lg:mb-0 lg:max-w-4xl"
    >
      <Icon
        name="fluent:comment-quote-20-regular"
        class="absolute -top-16 -left-16 h-20 max-h-20 min-h-20 w-20 max-w-20 min-w-20"
        style="color: #aaaaaa"
      ></Icon>

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
        src="birmingham-museums-trust-BPWZ01FtySg-unsplash.jpg"
        alt=""
        class="absolute inset-0 h-full w-full object-cover opacity-15"
        sizes="1000px md:2000px"
        width="2912"
        height="2032"
        format="webp"
      />

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
  name: "VarforOss",

  inject: ["navbarHeight"],

  data() {
    return {
      windowHeight: 0,
    };
  },

  computed: {
    navHeight() {
      return this.navbarHeight();
    },
  },

  mounted() {
    this.windowHeight = window.innerHeight;
    window.addEventListener("resize", this.handleResize);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    handleResize() {
      this.windowHeight = window.innerHeight;
    },
  },
};
</script>
