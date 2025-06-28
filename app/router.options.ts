export default {
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    if (to.hash) {
      return {
        el: to.hash,
        top: 50,
        behavior: "smooth",
      };
    }

    return { top: 0 };
  },
};
