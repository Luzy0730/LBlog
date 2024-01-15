<script setup lang="ts">
import { queryTags, enableTag, deleteTag } from "@/api/services/tag";
import TableLimit from '@/components/content/element/TableLimit.vue'
import TagDialog from "@/components/content/tag/TagDialog.vue";
import Search from '@/components/content/element/Search.vue';
const tagDialogRef = ref();


const instance = getCurrentInstance();
const loading = ref(false)
const tableData = ref<ITag[]>([]);
const tableField = [
  { label: '标签id', prop: 'id', args: { width: '150', align: 'center' } },
  { label: '标签名称', prop: 'name', args: { minWidth: '150' } },
  { label: '标签颜色', prop: 'color', args: { minWidth: '150' } },
  { label: '是否启用', slotKey: 'state', args: { minWidth: '150' } },
  { label: '操作', slotKey: 'action', args: { width: '200' } },
]
const pagination = ref<IPagination>({
  page: 1,
  pageSize: 10,
  total: 0
});

const searchList = reactive([
  { type: 'input', props: { placeholder: '标签名称' }, filed: 'name' },
  { type: 'select', props: { placeholder: '是否启用', clearable: true }, filed: 'state', options: [{ label: '是', value: 1 }, { label: '否', value: 0 }] },
  { type: 'button', value: '查询', events: { click: () => onQueryTags() } },
  { type: 'button', value: '重置', events: { click: () => resetQuery() } },
  { type: 'button', value: '新增', props: { type: 'primary' }, events: { click: () => onCreateTag() } }
])
const searchForm = reactive({
  name: undefined,
  state: undefined
})

const resetQuery = () => {
  Object.assign(searchForm, {
    name: undefined,
    state: undefined
  })
  onQueryTags()
}
// 查询标签列表
const onQueryTags = () => {
  loading.value = true
  queryTags({
    page: pagination.value.page,
    pageSize: pagination.value.pageSize
  }).then((res) => {
    tableData.value = res.data.data;
    pagination.value.total = res.data.total
  }).finally(() => {
    loading.value = false
  });;
};

// 标签是否启用
const onEnableTag = async (tag: ITag) => {
  try {
    await enableTag({
      id: tag.id,
      state: tag.state === 1 ? 0 : 1
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
    onQueryTags();
  }
};

// 删除标签
const onDeleteTag = async (tag: ITag) => {
  const { id } = tag;
  try {
    await deleteTag({ id });
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
    onQueryTags();
  }
};

// 修改文章标签
const onUpdateTag = (tag: ITag) => {
  tagDialogRef.value.update(tag);
};

// 新增文章标签
const onCreateTag = () => {
  tagDialogRef.value.create();
};

onMounted(() => {
  onQueryTags();
});
</script>
<template>
  <TableLimit :tableData="tableData" :tableField="tableField" :loading="loading" :pagination="pagination" @pagination-change="onQueryTags">
    <template #search>
      <Search :searchList="searchList" :searchForm="searchForm" />
    </template>
    <template #state="{ row }">
      <el-text class="mx-1" :type="row.state === 1 ? 'success' : 'danger'">{{ row.state === 1 ? '已发布' : '已下架'
      }}</el-text>
    </template>
    <template #action="{ row }">
      <el-button type="primary" link @click="onUpdateTag(row)">修改</el-button>
      <el-button type="primary" link @click="onEnableTag(row)">{{ row.state === 1 ? "下架" : "发布" }}</el-button>
      <el-popconfirm title="确定删除吗?" @confirm="onDeleteTag(row)">
        <template #reference>
          <el-button type="primary" link>删除</el-button>
        </template>
      </el-popconfirm>
    </template>
  </TableLimit>
  <TagDialog ref="tagDialogRef" @confirm="onQueryTags" />
</template>
