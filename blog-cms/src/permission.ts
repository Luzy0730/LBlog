import { useUserStore, useRouterStore } from "@/stores/index";
import router from "@/router";
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const routerStore = useRouterStore();
  if (userStore.token || /\S/.test(userStore.token)) {
    if (!routerStore.fullRoutes.length) {
      routerStore.init_fullRoutes();
    }
    if (to.path === "/login") {
      next("/");
    } else {
      next();
    }
  } else {
    if (to.path === "/login") {
      next();
    } else {
      next({ name: "login", query: { redirect: to.fullPath } });
    }
  }
});
