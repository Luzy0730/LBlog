import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import type { State } from "../types/router.type";
const state: State = () => {
  return {
    fullRoutes: [],
    menuRoutes: [],
  };
};
export const useRouterStore = defineStore("router", {
  state,
  actions: {
    init_fullRoutes() {
      const routes = useRouter().getRoutes();
      this.fullRoutes = routes;
      this.init_menuRoutes();
    },
    init_menuRoutes() {
      const menuFilter = this.fullRoutes.filter(
        (route) => !["/", "/blank"].includes(route.path) && !route.meta.notMenu
      );
      const menuRoutes: any[] = [];
      menuFilter.forEach((menu) => {
        if (!menuRoutes.length) {
          menuRoutes.push(menu);
        } else {
          if (menu.children?.length) {
            menu.children.forEach((item: any, index: number) => {
              const findIndex = menuRoutes.findIndex(
                (route) => route.name === item.name
              );
              if (findIndex > -1) {
                menu.children[index] = menuRoutes[findIndex];
                menuRoutes.splice(findIndex, 1);
              }
            });
          }
          menuRoutes.push(menu);
        }
      });
      this.menuRoutes = menuRoutes;
    },
  },
});
