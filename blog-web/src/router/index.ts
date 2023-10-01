import { createRouter, createWebHistory } from "vue-router";
import { BasicLayoutVue } from "@/layouts";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
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
          path: '/blog/:id(\\d+)',
          name: 'blog',
          component: () => import('@/views/blog/Blog.vue'),
          meta: { title: '博客' }
        },
        {
          path: "/about",
          name: "about",
          component: () => import("@/views/about/About.vue"),
          meta: { title: "关于我" },
        },
        {
          path: "/404",
          name: 'not found',
          component: () => import("@/views/404/NotFound.vue"),
          meta: { title: "未找到页面" }
        },
        {
          path: '/:type/:name',
          name: 'type',
          component: () => import('@/views/home/Home.vue'),
        },
        {
          path: "/:catchAll(.*)",
          redirect: '/404'
        },
      ],
    },
  ],
});

export default router;
