<template>
  <NuxtLink
    :to="route"
    class="group relative flex cursor-pointer flex-row-reverse items-center gap-2 xl:flex-row"
  >
    <div
      class="absolute inset-0 transform-gpu bg-linear-to-r from-red-400 to-red-800 opacity-0 blur-xl transition-opacity duration-300 ease-in-out group-hover:opacity-90"
      :class="[currentPath === route && 'opacity-60']"
    ></div>

    <div
      v-if="icon"
      class="relative flex h-7 min-h-7 w-7 min-w-7 items-center justify-center rounded-full border-2 border-white/15 bg-neutral-800 p-1"
    >
      <component
        v-if="iconComponent"
        :is="iconComponent"
        class="h-full w-full"
      ></component>
    </div>

    <div
      class="transform-gpu whitespace-nowrap opacity-80 transition-opacity duration-300 ease-in-out hover:opacity-100"
    >
      {{ text }}
    </div>
  </NuxtLink>
</template>

<script>
import IconHeroiconsHome from "~icons/heroicons/home";
import IconPhFilmSlateLight from "~icons/ph/film-slate-light";
import IconFluentPeople32Regular from "~icons/fluent/people-32-regular";
import IconFamiconsChatbubbleEllipsesOutline from "~icons/famicons/chatbubble-ellipses-outline";
import IconProiconsChatQuestion from "~icons/proicons/chat-question";
import IconHugeiconsmMoneyBag01 from "~icons/hugeicons/money-bag-01";

export default {
  name: "NavbarLink",

  props: {
    text: {
      type: String,
      required: false,
    },
    icon: {
      type: String,
      required: false,
    },
    route: {
      type: String,
      required: false,
      default: "/",
    },
  },

  computed: {
    currentPath() {
      return this.$route.path;
    },

    iconComponent() {
      return this.iconMap[this.icon] || null;
    },
  },

  data() {
    return {
      iconMap: {
        "heroicons:home": IconHeroiconsHome,
        "ph:film-slate-light": IconPhFilmSlateLight,
        "fluent:people-32-regular": IconFluentPeople32Regular,
        "famicons:chatbubble-ellipses-outline":
          IconFamiconsChatbubbleEllipsesOutline,
        "proicons:chat-question": IconProiconsChatQuestion,
        "hugeicons:money-bag-01": IconHugeiconsmMoneyBag01,
      },
    };
  },
};
</script>
