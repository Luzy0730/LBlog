import { createRouter, createWebHistory } from "vue-router";
import { BasicLayout, BlankLayout } from "@/layouts";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "root-basic",
      component: BasicLayout,
      children: [
        {
          path: "/blog",
          name: "blog",
          component: BlankLayout,
          meta: {
            title: "博客",
            icon: "file-copy-2-line",
          },
          children: [
            {
              path: "/blog/article",
              name: "article",
              component: () => import("@/views/blog/article/index.vue"),
              meta: {
                title: "博客管理",
              },
            },
            {
              path: "/blog/category",
              name: "category",
              component: () => import("@/views/blog/category/index.vue"),
              meta: {
                title: "分类管理",
              },
            },
            {
              path: "/blog/tag",
              name: "tag",
              component: () => import("@/views/blog/tag/index.vue"),
              meta: {
                title: "标签管理",
              },
            },
          ]
        },
        {
          path: "/tools",
          name: "tools",
          component: BlankLayout,
          meta: {
            title: "工具",
            icon: "tools-fill",
          },
          children: [
            {
              path: "/tools/icon",
              name: "icon",
              component: () => import("@/views/tools/icon/index.vue"),
              meta: {
                title: "清新小图标",
              },
            },
          ]
        },
        {
          path: "/setting",
          name: "setting",
          component: BlankLayout,
          meta: {
            title: "设置",
            icon: "settings-4-line",
          },
          children: [
            {
              path: "/setting/member",
              name: "member",
              component: () => import("@/views/setting/member/index.vue"),
              meta: {
                title: "博客成员",
              },
            },
            {
              path: "/setting/config",
              name: "config",
              component: () => import("@/views/setting/config/index.vue"),
              meta: {
                title: "系统设置",
              },
            },
          ]
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
        {
          path: "/test",
          name: "test",
          component: () => import("@/views/test/index.vue"),
          meta: {
            title: "测试页",
            icon: "HomeFilled",
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
    {
      path: "/:catchAll(.*)",
      redirect: '/404',
      meta: {
        notMenu: true
      }
    },
  ],
});
export default router;
