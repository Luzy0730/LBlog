<script setup lang="ts">
import type { RouteRecordNormalized } from "vue-router";
defineProps<{
  menu: RouteRecordNormalized;
}>();
</script>

<template>
  <el-menu-item :index="menu.path">
    <el-icon v-if="menu.meta?.icon">
      <component :is="menu.meta.icon" />
    </el-icon>
    <template #title>{{ menu.meta.title }}</template>
  </el-menu-item>
</template>
