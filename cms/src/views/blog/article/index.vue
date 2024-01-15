<script setup lang="ts">
import { useRouter } from 'vue-router'
import Search from '@/components/content/element/Search.vue';
import TableLimit from '@/components/content/element/TableLimit.vue'
import { queryArticle, enableArticle, deleteArticle } from "@/api/services/article";
import { queryAllCategory } from "@/api/services/category";
const router = useRouter()

const categoryOptions = ref<Pick<ICategory, "id" | "name">[]>([]);
const loading = ref(false)
const tableData = ref<IArticle[]>([]);
const tableField = [
  { label: 'id', prop: 'id', args: { width: '100', align: 'center' } },
  { label: '文章信息', args: { minWidth: '350' }, slotKey: 'info' },
  { label: '状态', args: { width: '200', align: 'center' }, slotKey: 'state' },
  { label: '时间', args: { width: '250' }, slotKey: 'time' },
  { label: '操作', args: { width: '250' }, slotKey: 'action' },
]
const pagination = ref<IPagination>({
  page: 1,
  pageSize: 10,
  total: 0
});
const searchList = reactive([
  { type: 'input', props: { placeholder: '标题名称' }, filed: 'title' },
  { type: 'select', props: { placeholder: '分类', clearable: true }, filed: 'state', options: computed(() => categoryOptions.value.map(category => ({ label: category.name, value: category.id }))) },
  { type: 'select', props: { placeholder: '是否启用', clearable: true }, filed: 'state', options: [{ label: '是', value: 1 }, { label: '否', value: 0 }] },
  { type: 'button', value: '查询', events: { click: () => onQueryArticle() } },
  { type: 'button', value: '重置', events: { click: () => resetQuery() } },
])
const searchForm = reactive({
  title: undefined,
  state: undefined
})

const resetQuery = () => {
  Object.assign(searchForm, {
    title: undefined,
    state: undefined
  })
  onQueryArticle()
}

const instance = getCurrentInstance();
const timeFormat = computed(() => (time: string) => instance?.proxy?.$dayjs(time).format('YYYY-MM-DD HH:mm:ss'))

onMounted(() => {
  onQueryArticle();
  queryAllCategory().then((res) => {
    categoryOptions.value = res.data.data;
  });
});

// 查询文章列表
function onQueryArticle() {
  loading.value = true
  queryArticle({
    ...searchForm,
    page: pagination.value.page,
    pageSize: pagination.value.pageSize
  }).then((res) => {
    tableData.value = res.data.data;
    pagination.value.total = res.data.total
  }).finally(() => {
    loading.value = false
  });
};

// 文章是否上线
async function onEnableArticle(article: IArticle) {
  try {
    await enableArticle({
      id: article.id,
      state: article.state === 1 ? 0 : 1
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

// 预览文章
const previewArticle = (id: number) => {
  const { href } = router.resolve(`/platform/preview/${id}`, router.currentRoute.value);
  window.open(href, '_blank');
}

</script>
<template>
  <TableLimit :tableField="tableField" :tableData="tableData" v-model:pagination="pagination" @pagination-change="onQueryArticle">
    <template #search>
      <Search :searchList="searchList" :searchForm="searchForm" />
    </template>
    <template #info="{ row }">
      <div class="flex flex-col">
        <div>标题：{{ row.title }}</div>
        <div class="flex" v-if="row.category">
          <span>分类：</span>
          <el-tag disable-transitions :style="{ color: '#fff', backgroundColor: row.category.color }">
            <Icon :name="row.category.icon" />
            {{ row.category.name }}
          </el-tag>
        </div>
        <div class="flex">
          <span>标签：</span>
          <el-tag disable-transitions :style="{ color: '#fff', backgroundColor: tag.color }" v-for="tag in row.tags" :key="tag.id">{{
            tag.name }}</el-tag>
        </div>
      </div>
    </template>
    <template #state="{ row }">
      <el-text class="mx-1" :type="row.state === 1 ? 'success' : 'danger'">{{ row.state === 1 ? "已发布" :
        "已下架" }}</el-text>
    </template>
    <template #time="{ row }">
      <div class="flex flex-col">
        <div>创建时间：{{ timeFormat(row.create_time) }}</div>
        <div>更新时间：{{ timeFormat(row.update_time) }}</div>
      </div>
    </template>
    <template #action="{ row }">
      <el-button type="primary" link @click="previewArticle(row.id)">预览</el-button>
      <el-button type="primary" link @click="() => router.push({ name: 'platform', params: { id: row.id } })">修改</el-button>
      <el-button type="primary" link @click="onEnableArticle(row)">{{ row.state === 1 ? "下架" : "发布" }}</el-button>
      <el-popconfirm title="确定删除吗?" @confirm="onDeleteArticle(row)">
        <template #reference>
          <el-button type="primary" link>删除</el-button>
        </template>
      </el-popconfirm>
    </template>
  </TableLimit>
</template>
