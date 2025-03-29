<script setup>
import { ChevronDoubleDownIcon } from "@heroicons/vue/24/solid";
</script>

<template>
  <div class="relative overflow-hidden">
    <div
      class="absolute inset-0 -mt-12 flex flex-col items-center overflow-hidden"
    >
      <NuxtImg
        src="modern-office-elevators.jpg"
        alt="futuristic background image with lots of elevators"
        class="parallax-background h-[130rem] w-full object-cover sm:h-[130rem]"
        sizes="1000px md:2000px"
        width="2000"
        height="3000"
        densities="x1"
        placeholder
      />
    </div>

    <div class="absolute inset-0 flex items-center overflow-hidden opacity-30">
      <NuxtImg
        src="flat_clouds.png"
        alt="an extra background layer with clouds"
        class="parallax-clouds h-full w-full object-cover"
        sizes="1000px md:2000px"
        width="2000"
        height="3000"
        loading="lazy"
      />
    </div>

    <div
      class="relative mt-12 mb-20 flex h-[50vh] flex-col items-center justify-center px-8 text-center"
    >
      <h2 class="bg-white px-20 pt-5 pb-3 text-4xl md:text-6xl">
        Besiktning av
      </h2>
    </div>

    <div class="relative flex w-full justify-end">
      <ChevronDoubleDownIcon
        class="mr-4 mb-2 h-12 w-12 max-w-screen-2xl text-white transition-opacity duration-500 ease-in-out"
        :class="[fadeOutDownIcon && 'opacity-0']"
      />
    </div>

    <PointBlob
      class="relative mb-32 justify-end pl-4"
      title="Motordrivna portar"
      :point-lines="[
        '• Besiktningskrav enligt Boverkets föreskrift BFS 2011:12 med ändringar',
        '• Krav på första besiktning eller att det framgår av EG-försäkran om överensstämmelse att installationen ingår i CE-märkningen',
        '• Besiktningsintervall 24 månader',
        '• Omfattar olika typer av motordrivna portar så som takskjutportar, vikportar samt grindar',
        '• Undantaget krav på besiktning är portar i anslutning till småbostadshus',
      ]"
    />

    <PointBlob
      class="relative mb-32 justify-start pr-4"
      title="Lastbryggor"
      :point-lines="[
        '• Besiktningskrav enligt AFS 2023:11',
        '• Besiktningsintervall 24 månader',
        '• Första återkommande besiktning är 24 månader efter att anordningen togs i bruk första gången',
        '• Ofta högt slitage vid regelbunden användning',
      ]"
    />

    <PointBlob
      class="relative mb-32 justify-end pl-4"
      title="Mobila arbetsplattformar"
      :point-lines="[
        '• Besiktningskrav enligt AFS 2023:11',
        '• Besiktningsintervall: 12 månader',
        '• Första återkommande besiktning är 12 månader efter att maskinen togs i bruk för första gången',
      ]"
    />

    <PointBlob
      class="relative mb-32 justify-start pr-4"
      title="Plocktruckar"
      :point-lines="[
        '• Besiktningskrav enligt AFS 2023:11',
        '• Besiktningsintervall 12 månader',
        '• Första återkommande besiktning 12 månader efter att maskinen togs i bruk för första gången',
        '• Undantagna för besiktningskrav är plocktruckar vars lyfthöjd understiger 1,2 meter. Krav på periodisk kontroll av kunnig person kvarstår',
      ]"
    />

    <PointBlob
      class="relative mb-32 justify-end pl-4"
      title="Fordonslyftar"
      :point-lines="[
        '• Besiktningskrav enligt AFS 2023:11',
        '• Besiktningsintervall 12 mån',
        '• Vår erfarenhet är att fordonslyftar har fler allvarliga brister än andra typer av anordningar. Utför besiktning för att uppfylla lagkraven samt bidra till en säkrare arbetsplats',
        '• Undantagna kravet på besiktning är fordonslyftar vilka inte är avsedda för arbete där arbetstagaren befinner sig under fordonet. Krav på periodisk kontroll av kunnig person kvarstår',
      ]"
    />
  </div>

  <PointBlock
    title="Kranar"
    :point-lines="[
      '• Besiktningskrav enligt AFS 2023:11',
      '• Besiktningsintervall 12 mån',
      '• Arbete med kranar innebär ofta att tung last hanteras nära arbetstagare. En felfunktion av kranen kan därför leda till allvarliga konsekvenser',
      '• Kranar omfattar telfer på balk, svängkran på vägg, pelarsvängkran, traverssystem med mera',
      '• Definition av kran: En lyftanordning där lasten med hjälp av ett icke styrt lastbärande organ kan lyftas och sänkas vertikalt och dessutom förflyttas horisontellt.',
      '• Undantagna kravet på montagebesiktning är kranar som flyttas horisontellt med handkraft',
      '• Undantagna kravet på samtliga besiktningar är kranar vars maxlast understiger 500 kg. Krav på periodisk kontroll av kunnig person kvarstår',
      '• Vi utför även frivillig besiktning av kranar med maxlast understigande 500 kg för att ni ska uppfylla kravet på periodisk kontroll och bidra till en säkrare arbetsplats. (Besiktningstjänsten faller inte under företagets ackreditering av Swedac då besiktningen är frivillig.)',
    ]"
  />

  <PointBlock
    title="Hissar"
    :point-lines="[
      '• Återkommande besiktning av hissar så som personhissar, varuhissar eller plattformshissar med mera',
      '• Besiktningsintervall 12 – 24 månader',
    ]"
  />

  <PointBlock
    title="Övriga besiktningstjänster"
    :point-lines="[
      {
        accordionTitle: '<b>Lingångar och punktlyftar</b>',
        accordionLines: [
          '• Besiktningskrav enligt AFS 2023:11',
          '• Besiktningsintervall',
          '--- Maskindriven: 12 månaders',
          '--- Handdriven: 36 månaders',
        ],
      },
      '<br />',
      {
        accordionTitle:
          '<b>Tillfälligt personlyft med truck och arbetskorg</b>',
        accordionLines: [
          '• Besiktningskrav enligt AFS 2023:11',
          '• Krav på första besiktning för att säkerställa att trucken och korgen är säkra att kombinera för tillfälligt personlyft enligt gällande föreskrift',
          '• Inget krav på återkommande besiktning. Krav på periodisk kontroll av kunnig person kvarstår',
        ],
      },
      '<br />',
      {
        accordionTitle: '<b>Lyftbord</b>',
        accordionLines: [
          '• Inget besiktningskrav men krav finns på periodisk kontroll. (Besiktningstjänsten faller inte under företagets ackreditering av Swedac då besiktningen är frivillig.)',
          '• Lämpligt intervall 12 månader',
        ],
      },
      '<br />',
      {
        accordionTitle: '<b>Övriga personlyftande anordningar</b>',
        accordionLines: [
          '• Besiktningskrav enligt AFS 2023:11',
          '• Intervall 12 månader',
          '• Undantagna kravet på besiktning är övriga lyftanordningar med en lyfthöjd understigande 0,5 meter',
        ],
      },
    ]"
  />
</template>

<script>
export default {
  name: "Services",

  data() {
    return {
      fadeOutDownIcon: false,
    };
  },

  methods: {
    handleScroll() {
      const scrolled = window.scrollY;

      if (scrolled > 500) {
        this.fadeOutDownIcon = true;
      }

      const parallaxElements = document.querySelectorAll(
        ".parallax-background, .parallax-clouds",
      );

      parallaxElements.forEach(function (el, index) {
        const rate = index === 0 ? 0.65 : 0.5;
        const translateY = scrolled * rate;
        el.style.transform = `translateY(${translateY}px)`;
      });
    },
  },

  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
