<script setup lang="ts">
import { queryArticle } from '@/api/services/article'
import BlogList from "@/components/content/blog/BlogList.vue";

const blogList = ref<Array<BlogItem>>([]);

queryArticle().then(res => {
  blogList.value = res.data.list
})

</script>
<template>
  <BlogList :blog-list="blogList" />
</template>
