import { useRouterStore } from "@/stores/index";
import useTitle from '@/hooks/useTitle'
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
      const find = routerStore.fullRoutes.find(route => route.path === to.path)
      if (find?.children.length) {
        next({ path: find.children[0].path })
      } else {
        next()
      }
    }
  } else {
    if (to.path === "/login") {
      next();
    } else {
      next({ name: "login", query: { redirect: to.fullPath } });
    }
  }
  useTitle(to.meta.title as string)
});
