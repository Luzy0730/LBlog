<script  lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { queryAllCategory } from "@/api/services/category";
import { queryAllTags } from "@/api/services/tag";
import { queryArticleDetail, createArticle, updateArticle, type IUpdateArticleData } from "@/api/services/article";
import WangEditor from "@/components/content/editor/WangEditor.vue";
import { usePlatformStore } from "@/stores/index";

const platformStore = usePlatformStore()
const route = useRoute()
const router = useRouter()
const instance = getCurrentInstance();

const categoryOptions = ref<Pick<ICategory, "id" | "name">[]>([]);
const tagOptions = ref<Pick<ITag, "id" | "name">[]>([]);
const contentRef = ref()
const descriptionRef = ref()

const initArticleInfo = () => ({
  id: -1,
  title: "",
  categoryId: undefined,
  description: "",
  content: "",
  tagIds: [],
  words: 0
})
const articleInfo = ref<IUpdateArticleData>(initArticleInfo())

onMounted(() => {
  queryAllCategory().then((res) => {
    categoryOptions.value = res.data.data;
  });
  queryAllTags().then((res) => {
    tagOptions.value = res.data.data;
  });
})

watch(() => route, val => {
  const id = route.params.id
  if (id) {
    queryArticleDetail({ id: +id }).then((res) => {
      if (!res.data) return router.replace('/platform')
      const { id, title, category, tags, content, description, words } = res.data
      contentRef.value.setContent(content)
      descriptionRef.value.setContent(description)
      articleInfo.value.content = content
      articleInfo.value.description = description
      articleInfo.value.title = title
      articleInfo.value.categoryId = category?.id
      articleInfo.value.tagIds = tags.map(tag => tag.id)
      articleInfo.value.words = words
      articleInfo.value.id = id
    });
  } else {
    articleInfo.value = initArticleInfo()
    contentRef.value?.setContent("")
    descriptionRef.value?.setContent("")
  }
}, {
  deep: true,
  immediate: true
})

// 更新文章信息表单
const updateArticleInfo = () => {
  const contentRet = contentRef.value.getContent()
  const descriptionRet = descriptionRef.value.getContent()
  articleInfo.value.content = contentRet.html
  articleInfo.value.words = contentRet.length
  articleInfo.value.description = descriptionRet.html
}

const submit = async () => {
  updateArticleInfo()
  const api = articleInfo.value.id === -1 ? createArticle : updateArticle
  try {
    await api({
      ...articleInfo.value,
      tagIds: articleInfo.value.tagIds
    })
    instance?.proxy?.$message({
      type: "success",
      message: "操作成功",
    });
    router.back()
  } catch (error) {
    instance?.proxy?.$message({
      type: "error",
      message: "操作失败",
    });
  }
}

// 预览文章
const previewArticle = () => {
  updateArticleInfo()
  platformStore.save_article({
    ...articleInfo.value,
    views: 0,
    tags: articleInfo.value.tagIds.map(tagId => tagOptions.value.find(tag => tag.id === tagId)) as IArticle['tags'],
    category: categoryOptions.value.find(category => category.id === articleInfo.value.categoryId) as IArticle['category']
  })
  const { href } = router.resolve(`/platform/preview`, router.currentRoute.value);
  window.open(href, '_blank');
}
</script>
<template>
  <el-scrollbar>
    <div class="px-[200px]">
      <el-input class="h-16 text-2xl" v-model="articleInfo.title" placeholder="请输入标题" />
      <WangEditor placeholder="请输入正文" class="mt-6" ref="contentRef" />
      <el-divider />
      <WangEditor placeholder="请输入描述" :height="200" class="mt-6" ref="descriptionRef" />
      <el-divider />
      <div class="flex mt-4">
        <el-select class="mr-4" v-model="articleInfo.categoryId" placeholder="请选择分类">
          <el-option v-for="category in categoryOptions" :key="category.id" :label="category.name" :value="category.id">
          </el-option>
        </el-select>
        <el-select v-model="articleInfo.tagIds" placeholder="请选择标签" multiple>
          <el-option v-for="tag in tagOptions" :key="tag.id" :label="tag.name" :value="tag.id">
          </el-option>
        </el-select>
      </div>
      <div class="flex mt-4">
        <el-button type="primary" @click="submit">提交文章</el-button>
        <!-- <el-button>手机端预览</el-button> -->
        <el-button @click="previewArticle">网页端预览</el-button>
      </div>
    </div>
  </el-scrollbar>
</template>