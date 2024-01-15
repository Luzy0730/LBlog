<script setup lang="ts">
import NotFound from "@/components/content/NotFound.vue";
import BlogItem from '@/components/content/blog/BlogItem.vue';
import { useRoute } from 'vue-router'
import { queryArticleDetail } from '@/api/services/article'
import useTitle from '@/hooks/useTitle'
const route = useRoute()

const blogInfo = ref<BlogItem>()
const loading = ref(false)
watch(() => route.params, newVal => {
  const { id } = route.params
  if (id) {
    loading.value = true
    queryArticleDetail({ id: +id }).then(res => {
      blogInfo.value = res.data
      useTitle(blogInfo.value ? blogInfo.value.title : "未找到页面")
    }).finally(() => {
      loading.value = false
    })
  }
}, {
  immediate: true
})

</script>
<template>
  <NotFound v-if="!blogInfo" :loading="loading" />
  <BlogItem v-else :blog-item="blogInfo" :is-detail="true" />
</template>