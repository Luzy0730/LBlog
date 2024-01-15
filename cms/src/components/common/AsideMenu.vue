<script setup lang="ts">
import { useRouterStore } from "@/stores";
import { useRouter } from "vue-router";
import AsideMenuItem from "@/components/common/AsideMenuItem.vue";
import AsideSubMenu from "@/components/common/AsideSubMenu.vue";

const routerStore = useRouterStore();
const router = useRouter();

const isCollapse = ref(false);

const onSelectMenu = (path: string) => {
  router.push(path);
};
</script>

<template>
  <el-menu :default-active="routerStore.currentRoutePath" class="el-menu-vertical-demo" :collapse="isCollapse"
    @select="onSelectMenu">
    <component :is="menu.children?.length ? AsideSubMenu : AsideMenuItem" v-for="menu in routerStore.menuRoutes"
      :key="menu.path" :menu="menu"></component>
  </el-menu>
</template>
