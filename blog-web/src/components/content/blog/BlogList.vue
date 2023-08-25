<script setup lang="ts">
import BlogItem from "./BlogItem.vue";
const { blogList } = defineProps<{
  blogList: Array<BlogItem>;
}>();
</script>
<template>
  <!--content-->
  <BlogItem v-for="item in blogList" :key="item.id" :blog-item="item" />
  <!--分页-->
</template>
