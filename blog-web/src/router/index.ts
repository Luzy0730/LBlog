import { createRouter, createWebHistory } from "vue-router";
import { BasicLayoutVue } from "@/layouts";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: BasicLayoutVue,
      redirect: "/home",
      children: [
        {
          path: "/home",
          name: "home",
          component: () => import("@/views/home/Home.vue"),
          meta: { title: "首页" },
        },
        {
          path: "/about",
          name: "about",
          component: () => import("@/views/about/About.vue"),
          meta: { title: "关于我" },
        },
      ],
    },
  ],
});

export default router;
