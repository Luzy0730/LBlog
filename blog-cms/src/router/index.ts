import { createRouter, createWebHistory } from "vue-router";
import { BasicLayout, BlankLayout } from "@/layouts";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "root-basic",
      component: BasicLayout,
      redirect: "/dashboard",
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("@/views/dashboard/index.vue"),
          meta: {
            title: "首頁",
            icon: "HomeFilled",
          },
        },
        {
          path: "/test",
          name: "test",
          component: BlankLayout,
          meta: {
            title: "菜单嵌套测试",
            icon: "Menu",
          },
          children: [
            {
              path: "dashboard",
              name: "testDashboard",
              component: () => import("@/views/dashboard/index.vue"),
              meta: {
                title: "首頁",
                icon: "Share",
              },
            },
          ],
        },
        {
          path: "/404",
          name: "404 not found",
          component: () => import("@/views/exception/404/index.vue"),
          meta: {
            title: "404",
            notMenu: true,
          },
        },
      ],
    },
    {
      path: "/blank",
      name: "root-blank",
      component: BlankLayout,
      redirect: "/login",
      children: [
        {
          path: "/login",
          name: "login",
          props: (route) => ({ redirect: route.query.redirect }),
          component: () => import("@/views/login/index.vue"),
          meta: {
            title: "登录",
            notMenu: true,
          },
        },
      ],
    },
  ],
});
export default router;
