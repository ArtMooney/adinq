import { createApp } from "vue";
import "./css/fonts.css";
import "./css/tailwind.css";
import App from "./App.vue";
import createRouter from "../../borashv/src/routes";
import { VueHeadMixin, createHead } from "@unhead/vue";

const head = createHead();
createApp(App).use(head).use(createRouter()).mixin(VueHeadMixin).mount("#app");
