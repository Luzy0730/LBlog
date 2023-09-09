import { useRouterStore } from "@/stores/index";
import router from "@/router";
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token") || "";
  const routerStore = useRouterStore();
  routerStore.currentRoutePath = to.path;
  if (token || /\S/.test(token)) {
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
