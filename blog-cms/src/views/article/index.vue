<script setup lang="ts">
import ArticleDialog from "@/components/content/article/ArticleDialog.vue";
import { queryArticle, enableArticle } from "@/api/services/article";

const articleDialogRef = ref();

const paginationOption = ref({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

const tableData = ref<IArticle[]>([]);
// 查询文章列表
const onQueryArticle = () => {
  queryArticle(paginationOption.value).then((res) => {
    tableData.value = res.data.list;
    paginationOption.value.total = res.data.total
  });
};

const instance = getCurrentInstance();
// 文章是否上线
const onEnableArticle = async (category: ICategory) => {
  const { id, is_enable } = category;
  try {
    await enableArticle({ id, is_enable });
    instance?.proxy?.$message({
      type: "success",
      message: "操作成功",
    });
  } catch (error) {
    instance?.proxy?.$message({
      type: "error",
      message: "操作失败",
    });
  } finally {
    onQueryArticle();
  }
};

// 修改文章
const onUpdateArticle = (article: IArticle) => {
  articleDialogRef.value.update({
    ...article,
    tagIds: article.tags.map((tag) => tag.id),
    categoryId: article.category.id,
  });
};

// 新增文章
const onCreateArticle = () => {
  articleDialogRef.value.create();
};

onMounted(() => {
  onQueryArticle();
});
</script>
<template>
  <el-row justify="space-between">
    <el-col :span="8"></el-col>
    <el-col :span="8">
      <el-button type="primary" class="float-right" @click="onCreateArticle">新增</el-button>
      <el-button type="primary" class="float-right mr-3" @click="onQueryArticle">刷新</el-button>
    </el-col>
  </el-row>
  <el-table :data="tableData" class="mt-5">
    <el-table-column prop="id" label="文章id" min-width="100" align="center" fixed="left" />
    <el-table-column prop="title" label="文章标题" min-width="150" align="center" fixed="left" />
    <el-table-column prop="category" label="分类" min-width="150" align="center">
      <template #default="{ row }">
        <el-tag :style="{ color: '#fff', backgroundColor: row.category.color }">
          <Icon :name="row.category.icon" />
          {{ row.category.name }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="tags" label="标签" min-width="150" align="center">
      <template #default="{ row }">
        <el-tag :style="{ color: '#fff', backgroundColor: tag.color }" v-for="tag in row.tags" :key="tag.id">{{ tag.name
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="is_enable" label="上线" min-width="150" align="center">
      <template #default="{ row }">
        <el-switch v-model="row.is_enable" :active-value="1" :inactive-value="0" @change="onEnableArticle(row)" />
      </template>
    </el-table-column>
    <el-table-column prop="createTime" label="创建时间" min-width="150" align="center" />
    <el-table-column prop="updateTime" label="更新时间" min-width="150" align="center" />
    <el-table-column prop="" label="操作" width="110" align="center" fixed="right">
      <template #default="{ row }">
        <el-button type="primary" link @click="onUpdateArticle(row)">编辑</el-button>
        <el-button type="primary" link>删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination background layout="prev, pager, next" v-model:current-page="paginationOption.pageNum"
    :total="paginationOption.total" :page-size="paginationOption.pageSize" />
  <ArticleDialog ref="articleDialogRef" @confirm="onQueryArticle" />
</template>
