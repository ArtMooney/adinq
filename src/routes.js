import { createRouter, createWebHistory } from "vue-router";

export default () =>
  createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: "/",
        name: "Home",
        component: () => import("./pages/Home.vue"),
        props: true,
      },
      {
        path: "/case",
        name: "Case",
        component: () => import("./pages/Case.vue"),
      },
      {
        path: "/contact",
        name: "Contact",
        component: () => import("./pages/Contact.vue"),
      },
      {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("./pages/NotFound.vue"),
      },
    ],
    scrollBehavior(to, from, savedPosition) {
      if (to.hash) {
        return {
          el: to.hash,
          behavior: "smooth",
        };
      }
    },
  });
