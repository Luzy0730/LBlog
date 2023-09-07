import { createRouter, createWebHistory } from "vue-router";
// import BasicLayout from "@/layouts/BasicLayout.vue";
import { BasicLayout, BlankLayout } from "@/layouts";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: BasicLayout,
      redirect: "/dashboard",
      children: [
        {
          path: "/dashboard",
          name: "首页",
          component: () => import("@/views/dashboard/index.vue"),
        },
      ],
    },
    {
      path: "/404",
      component: BlankLayout,
      children: [
        {
          path: "/404",
          name: "404 not found",
          component: () => import("@/views/exception/404/index.vue"),
        },
      ],
    },
  ],
});

export default router;
