<script setup lang="ts">
import { queryArticles, type IQueryArticlesParams } from '@/api/services/article'
import BlogList from "@/components/content/blog/BlogList.vue";
import { useRoute, useRouter } from 'vue-router'
import useTitle from '@/hooks/useTitle'

const props = defineProps<{
  keyword?: string;
}>();

const blogList = ref<Array<BlogItem>>([]);

const route = useRoute()
const router = useRouter()
const typeList: string[] = ['tag', 'category', 'search']

const pagination = ref<IPagination>({
  pageNum: 1,
  pageSize: 5,
  total: 0
})
const params = ref<IQueryArticlesParams>({
  keyword: undefined,
  tagName: undefined,
  categoryName: undefined,
})

const onQueryArticles = async () => {
  return queryArticles({
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
  onQueryArticles().then(() => {
    window.scrollTo({
      top: route.name === 'home' ? window.innerHeight : 0,
      behavior: 'smooth',
    });
  })
}

watch(() => route.params, newVal => {
  // 初始化筛选
  pagination.value.pageNum = 1
  pagination.value.total = 0
  params.value = {
    keyword: undefined,
    tagName: undefined,
    categoryName: undefined,
  }
  // 判断是否为指定类型分类页
  const { type, name } = route.params
  if (!type && !name) {
    if (route.name === 'home') {
      onQueryArticles()
    }
  } else {
    // 当匹配type不属于type列表 跳转404
    if (!typeList.includes(type as string)) {
      router.replace('/404')
    } else {
      nextTick(() => {
        switch (type) {
          case 'search':
            params.value.keyword = props.keyword
            useTitle("搜索")
            break;
          case 'tag':
            params.value.tagName = (name as string)
            useTitle("标签")
            break;
          case 'category':
            params.value.categoryName = (name as string)
            useTitle("分类")
            break;
          default:
            break;
        }
        onQueryArticles()
      })
    }
  }
}, {
  immediate: true
})
</script>
<template>
  <BlogList :blog-list="blogList" :pagination="pagination" @current-change="onCurrentChange" />
</template>
