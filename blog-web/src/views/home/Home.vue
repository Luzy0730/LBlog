<script setup lang="ts">
import { queryArticles, type IQueryArticlesParams } from '@/api/services/article'
import BlogList from "@/components/content/blog/BlogList.vue";
import { useRoute, useRouter } from 'vue-router'

const blogList = ref<Array<BlogItem>>([]);

const route = useRoute()
const router = useRouter()
const typeList: string[] = ['tag', 'category']

const pagination = ref<IPagination>({
  pageNum: 1,
  pageSize: 5,
  total: 0
})
const params = ref<IQueryArticlesParams>({
  tagName: undefined,
  categoryName: undefined,
})

const onQueryArticles = () => {
  queryArticles({
    ...params.value,
    pageNum: pagination.value.pageNum,
    pageSize: pagination.value.pageSize,
  }).then(res => {
    blogList.value = res.data.list
    pagination.value.total = res.data.total
  })
}

const onCurrentChange = (pageNum: number) => {
  pagination.value.pageNum = pageNum
  onQueryArticles()
}

watch(() => route.params, newVal => {
  pagination.value.pageNum = 1
  pagination.value.total = 0
  const { type, name } = route.params
  if (!type && !name) {
    onQueryArticles()
  } else {
    // 当匹配type不属于type列表 跳转404
    if (!typeList.includes(type as string)) {
      router.replace('/404')
    } else {
      if (type === 'tag') {
        params.value.tagName = (name as string)
      }
      if (type === 'category') {
        params.value.categoryName = (name as string)
      }
      onQueryArticles()
    }
  }
}, {
  immediate: true
})
</script>
<template>
  <BlogList :blog-list="blogList" :pagination="pagination" @current-change="onCurrentChange" />
</template>
