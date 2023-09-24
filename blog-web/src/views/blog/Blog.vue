<script setup lang="ts">
import NotFound from "@/components/content/NotFound.vue";
import BlogItem from '@/components/content/blog/BlogItem.vue';
import { useRoute } from 'vue-router'
import { queryArticleDetail } from '@/api/services/article'
import useTitle from '@/hooks/useTitle'
const route = useRoute()

const blogInfo = ref<BlogItem>()
watch(() => route.params, newVal => {
  const { id } = route.params
  if (id) {
    queryArticleDetail({ id: +id }).then(res => {
      blogInfo.value = res.data
      useTitle(blogInfo.value ? blogInfo.value.title : "未找到页面")
    })
  }
}, {
  immediate: true
})

</script>
<template>
  <NotFound v-if="!blogInfo" />
  <BlogItem v-else :blog-item="blogInfo" :is-detail="true" />
</template>