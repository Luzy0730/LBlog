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
          path: "/article",
          name: "article",
          component: () => import("@/views/article/index.vue"),
          meta: {
            title: "文章管理",
            icon: "HomeFilled",
          },
        },
        {
          path: "/category",
          name: "category",
          component: () => import("@/views/category/index.vue"),
          meta: {
            title: "分类管理",
            icon: "HomeFilled",
          },
        },
        {
          path: "/tag",
          name: "tag",
          component: () => import("@/views/tag/index.vue"),
          meta: {
            title: "标签管理",
            icon: "HomeFilled",
          },
        },
        {
          path: "/404",
          name: "404",
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
    // {
    //   path: "/*catchAll(.*)",
    //   name: "error",
    //   redirect: "404",
    // },
  ],
});
export default router;
