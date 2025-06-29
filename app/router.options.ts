export default {
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    if (to.hash) {
      setTimeout(() => {
        window.history.replaceState(
          history.state,
          "",
          window.location.pathname + window.location.search,
        );
      }, 800);

      return {
        el: to.hash,
        top: 50,
        behavior: "smooth",
      };
    }

    return { top: 0 };
  },
};
