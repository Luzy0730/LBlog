<script setup lang="ts">
import type { RouteRecordNormalized } from "vue-router";
import Icon from "@/components/content/icon/index.vue";

defineProps<{
  menu: RouteRecordNormalized;
}>();
</script>

<template>
  <el-menu-item :index="menu.path">
    <Icon v-if="menu.meta?.icon" :name="(menu.meta?.icon as string)" size="16" class="mr-2" />
    <template #title>{{ menu.meta.title }}</template>
  </el-menu-item>
</template>
