<script setup lang="ts">
import LayoutHeader from "./components/LayoutHeader.vue";
import LayoutAside from "./components/LayoutAside.vue";
import LayoutFooter from "./components/LayoutFooter.vue";
import LayoutMain from "./components/LayoutMain.vue";
defineOptions({
  name: "BasicLayout",
});
</script>

<template>
  <el-container>
    <el-aside width="200px">
      <LayoutAside />
    </el-aside>
    <el-container>
      <el-header>
        <LayoutHeader />
      </el-header>
      <el-main>
        <LayoutMain />
      </el-main>
      <el-footer>
        <LayoutFooter />
      </el-footer>
    </el-container>
  </el-container>
</template>
