<script setup lang="ts">
import AsideMenuItem from "@/components/common/AsideMenuItem.vue";
import AsideSubMenu from "@/components/common/AsideSubMenu.vue";
import type { RouteRecordNormalized } from "vue-router";
import Icon from "@/components/content/icon/index.vue";

defineProps<{
  menu: RouteRecordNormalized;
}>();
</script>

<template>
  <el-sub-menu :index="menu.path">
    <template #title>
      <Icon v-if="menu.meta?.icon" :name="(menu.meta?.icon as string)" size="16" class="mr-2" />
      <span>{{ menu.meta.title }}</span>
    </template>
    <component :is="_menu.children?.length ? AsideSubMenu : AsideMenuItem" v-for="_menu in menu.children"
      :key="_menu.path" :menu="(_menu as RouteRecordNormalized)"></component>
  </el-sub-menu>
</template>
