<script setup lang="ts">
import AsideMenuItem from "@/components/common/AsideMenuItem.vue";
import AsideSubMenu from "@/components/common/AsideSubMenu.vue";
import type { RouteRecordNormalized } from "vue-router";

defineProps<{
  menu: RouteRecordNormalized;
}>();
</script>

<template>
  <el-sub-menu :index="menu.path">
    <template #title>
      <el-icon v-if="menu.meta?.icon">
        <component :is="menu.meta.icon" />
      </el-icon>
      <span>{{ menu.meta.title }}</span>
    </template>
    <component :is="_menu.children?.length ? AsideSubMenu : AsideMenuItem" v-for="_menu in menu.children"
      :key="_menu.path" :menu="_menu"></component>
  </el-sub-menu>
</template>
