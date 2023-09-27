<script setup lang="ts">
import ArticleDialog from "@/components/content/article/ArticleDialog.vue";
import { queryArticle, enableArticle, deleteArticle } from "@/api/services/article";

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

const timeFormat = computed(() => (time: string) => instance?.proxy?.$dayjs(time).format('YYYY-MM-DD HH:mm:ss'))

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

// 删除文章
const onDeleteArticle = async (article: IArticle) => {
  const { id } = article;
  try {
    await deleteArticle({ id });
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
}

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
    <el-table-column label="文章信息" width="350" fixed="left">
      <template #default="{ row }">
        <div class="flex flex-col">
          <div>标题：{{ row.title }}</div>
          <div class="flex">
            <span>分类：</span>
            <el-tag disable-transitions :style="{ color: '#fff', backgroundColor: row.category.color }">
              <Icon :name="row.category.icon" />
              {{ row.category.name }}
            </el-tag>
          </div>
          <div class="flex">
            <span>标签：</span>
            <el-tag disable-transitions :style="{ color: '#fff', backgroundColor: tag.color }" v-for="tag in row.tags"
              :key="tag.id">{{
                tag.name }}</el-tag>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="is_enable" label="发布" min-width="150" align="center">
      <template #default="{ row }">
        <el-switch v-model="row.is_enable" :active-value="1" :inactive-value="0" @change="onEnableArticle(row)" />
      </template>
    </el-table-column>
    <el-table-column label="时间" min-width="250" align="center">
      <template #default="{ row }">
        <div class="flex flex-col">
          <div>创建时间：{{ timeFormat(row.createTime) }}</div>
          <div>更新时间：{{ timeFormat(row.updateTime) }}</div>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="" label="操作" width="110" align="center" fixed="right">
      <template #default="{ row }">
        <el-button type="primary" link @click="onUpdateArticle(row)">编辑</el-button>
        <el-popconfirm title="确定删除吗?" @confirm="onDeleteArticle(row)">
          <template #reference>
            <el-button type="primary" link>删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination background layout="prev, pager, next" v-model:current-page="paginationOption.pageNum"
    :total="paginationOption.total" :page-size="paginationOption.pageSize" @current-change="onQueryArticle" />
  <ArticleDialog ref="articleDialogRef" @confirm="onQueryArticle" />
</template>
