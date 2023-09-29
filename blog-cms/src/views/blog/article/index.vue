<script setup lang="ts">
import TableLimit from '@/components/content/element/TableLimit.vue'
import ArticleDialog from "@/components/content/article/ArticleDialog.vue";
import { queryArticle, enableArticle, deleteArticle } from "@/api/services/article";

const tableData = ref<IArticle[]>([]);
const tableField = [
  { label: 'id', prop: 'id', args: { width: '100', align: 'center' } },
  { label: '文章信息', args: { minWidth: '350' }, slotKey: 'info' },
  { label: '状态', args: { width: '200', align: 'center' }, slotKey: 'state' },
  { label: '时间', args: { width: '250' }, slotKey: 'time' },
  { label: '操作', args: { width: '250' }, slotKey: 'action' },
]
const pagination = ref<IPagination>({
  pageNum: 1,
  pageSize: 10,
  total: 0
});

const instance = getCurrentInstance();
const timeFormat = computed(() => (time: string) => instance?.proxy?.$dayjs(time).format('YYYY-MM-DD HH:mm:ss'))

onMounted(() => {
  onQueryArticle();
});

// 查询文章列表
function onQueryArticle() {
  queryArticle({
    pageNum: pagination.value.pageNum,
    pageSize: pagination.value.pageSize
  }).then((res) => {
    tableData.value = res.data.list;
    pagination.value.total = res.data.total
  });
};

// 文章是否上线
async function onEnableArticle(article: IArticle) {
  try {
    await enableArticle({
      id: article.id,
      is_enable: article.is_enable === 1 ? 0 : 1
    });
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

const articleDialogRef = ref();
// 修改文章
function onUpdateArticle(article: IArticle) {
  articleDialogRef.value.update({
    ...article,
    tagIds: article.tags.map((tag) => tag.id),
    categoryId: article.category.id,
  });
};

// 新增文章
function onCreateArticle() {
  articleDialogRef.value.create();
};

// 删除文章
async function onDeleteArticle(article: IArticle) {
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

</script>
<template>
  <TableLimit :tableField="tableField" :tableData="tableData" v-model:pagination="pagination"
    @pagination-change="onQueryArticle">
    <template v-slot:search>
      <el-row justify="space-between">
        <el-col :span="8"></el-col>
        <el-col :span="8">
          <el-button type="primary" class="float-right" @click="onCreateArticle">新增</el-button>
          <el-button type="primary" class="float-right mr-3" @click="onQueryArticle">刷新</el-button>
        </el-col>
      </el-row>
    </template>
    <template #info="{ row }">
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
    <template #state="{ row }">
      <el-text class="mx-1" :type="row.is_enable === 1 ? 'success' : 'danger'">{{ row.is_enable === 1 ? "已发布" :
        "已下架" }}</el-text>
    </template>
    <template #time="{ row }">
      <div class="flex flex-col">
        <div>创建时间：{{ timeFormat(row.createTime) }}</div>
        <div>更新时间：{{ timeFormat(row.updateTime) }}</div>
      </div>
    </template>
    <template #action="{ row }">
      <el-button type="primary" link @click="onUpdateArticle(row)">修改</el-button>
      <el-button type="primary" link @click="onEnableArticle(row)">{{ row.is_enable === 1 ? "下架" : "发布" }}</el-button>
      <el-popconfirm title="确定删除吗?" @confirm="onDeleteArticle(row)">
        <template #reference>
          <el-button type="primary" link>删除</el-button>
        </template>
      </el-popconfirm>
    </template>
  </TableLimit>
  <ArticleDialog ref="articleDialogRef" @confirm="onQueryArticle" />
</template>
