<script setup lang="ts">
import { useRoute } from 'vue-router'
import { queryArticleDetail } from "@/api/services/article";
import { usePlatformStore } from "@/stores/index";
import { type IUpdateArticleData } from "@/api/services/article";
const platformStore = usePlatformStore()
import PreviewPart from './PreviewPart.vue';
const route = useRoute()

const contentHTML = ref<string>('')
const descriptionHtml = ref<string>('')
const blogExtraInfo = ref({})

const updateArticleInfo = (data: IArticle) => {
  const { content, description, title, category, createTime, updateTime, tags, views, words } = data
  contentHTML.value = content as string
  descriptionHtml.value = description as string
  blogExtraInfo.value = { title, category, createTime, updateTime, tags, views, words }
}

watch(() => route, val => {
  const id = route.params.id
  if (id) {
    queryArticleDetail({ id: +id }).then((res) => {
      updateArticleInfo(res.data)
    });
  } else {
    const articleInfo = platformStore.articleInfo
    updateArticleInfo(articleInfo)
  }
}, {
  immediate: true
})


</script>
<template>
  <PreviewPart :descriptionHtml="descriptionHtml" :blogExtraInfo="blogExtraInfo" />
  <PreviewPart :contentHtml="contentHTML" :blogExtraInfo="blogExtraInfo" />
</template>
