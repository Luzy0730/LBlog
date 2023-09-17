<script setup lang="ts">
import BlogItem from '@/components/content/blog/BlogItem.vue';
import { useRoute } from 'vue-router'
import { queryArticleDetail } from '@/api/services/article'
const route = useRoute()

const blogInfo = ref<BlogItem>()
watch(() => route.params, newVal => {
  const { id } = route.params
  if (id) {
    queryArticleDetail({ id: +id }).then(res => {
      blogInfo.value = res.data
    })
  }
}, {
  immediate: true
})

</script>
<template>
  <BlogItem :blog-item="blogInfo" :is-detail="true" />
</template>