<script setup lang="ts">
import BlogItem from "./BlogItem.vue";
import Pagination from "./Pagination.vue";
const { blogList, pagination } = defineProps<{
  blogList: Array<BlogItem>;
  pagination: IPagination;
}>();

const emit = defineEmits<{
  (event: "current-change", pageNum: number): void;
}>();

const onCurrentChange = (pageNum: number) => {
  emit('current-change', pageNum)
}
</script>
<template>
  <!--content-->
  <BlogItem v-for="item in blogList" :key="item.id" :blog-item="item" />
  <!--分页-->
  <Pagination :pagination="pagination" @current-change="onCurrentChange" />
</template>
