<script setup lang="ts">
import IconList from "./IconList.vue";

const dialogVisible = ref(false);

</script>

<template>
  <el-button type="primary" @click="dialogVisible = true">图标</el-button>
  <el-dialog v-model="dialogVisible" title="图标选择器" width="80%">
    <IconList />
  </el-dialog>
</template>
