<script setup lang="ts">
import {
  queryCategories,
  enableCategory,
  deleteCategory,
} from "@/api/services/category";
import TableLimit from '@/components/content/element/TableLimit.vue'
import Search from '@/components/content/element/Search.vue';
import CategoryDialog from "@/components/content/category/CategoryDialog.vue";
const categoryDialogRef = ref();

const instance = getCurrentInstance();
const loading = ref(false)
const tableData = ref<ICategory[]>([]);
const tableField = [
  { label: '分类id', prop: 'id', args: { width: '150', align: 'center' } },
  { label: '分类名称', prop: 'name', args: { minWidth: '150' } },
  { label: '分类颜色', prop: 'color', args: { minWidth: '150' } },
  { label: '分类图标', prop: 'icon', args: { minWidth: '150', align: 'center' } },
  { label: '是否启用', slotKey: 'state', args: { minWidth: '150' } },
  { label: '操作', slotKey: 'action', args: { width: '200' } },
]
const pagination = ref<IPagination>({
  page: 1,
  pageSize: 10,
  total: 0
});
const searchList = reactive([
  { type: 'input', props: { placeholder: '分类名称' }, filed: 'name' },
  { type: 'select', props: { placeholder: '是否启用', clearable: true }, filed: 'state', options: [{ label: '是', value: 1 }, { label: '否', value: 0 }] },
  { type: 'button', value: '查询', events: { click: () => onQueryCategories() } },
  { type: 'button', value: '重置', events: { click: () => resetQuery() } },
  { type: 'button', value: '新增', props: { type: 'primary' }, events: { click: () => onCreateCategory() } }
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
  onQueryCategories()
}

// 查询分类列表
const onQueryCategories = () => {
  loading.value = true
  queryCategories({
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

// 分类是否启用
const onEnableCategory = async (category: ICategory) => {
  try {
    await enableCategory({
      id: category.id,
      state: category.state === 1 ? 0 : 1
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
    onQueryCategories();
  }
};

// 删除分类
const onDeleteCategory = async (category: ICategory) => {
  const { id } = category;
  try {
    await deleteCategory({ id });
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
    onQueryCategories();
  }
};

// 修改文章分类
const onUpdateCategory = (category: ICategory) => {
  categoryDialogRef.value.update(category);
};

// 新增分类
const onCreateCategory = () => {
  categoryDialogRef.value.create();
};

onMounted(() => {
  onQueryCategories();
});
</script>
<template>
  <TableLimit :tableData="tableData" :tableField="tableField" :pagination="pagination" :loading="loading"
    @pagination-change="onQueryCategories">
    <template #search>
      <Search :searchList="searchList" :searchForm="searchForm" />
    </template>
    <template #state="{ row }">
      <el-text class="mx-1" :type="row.state === 1 ? 'success' : 'danger'">{{ row.state === 1 ? "是" :
        "否" }}</el-text>
    </template>
    <template #action="{ row }">
      <el-button type="primary" link @click="onUpdateCategory(row)">修改</el-button>
      <el-button type="primary" link @click="onEnableCategory(row)">{{ row.state === 1 ? "废弃" : "启用" }}</el-button>
      <el-popconfirm title="确定删除吗?" @confirm="onDeleteCategory(row)">
        <template #reference>
          <el-button type="primary" link>删除</el-button>
        </template>
      </el-popconfirm>
    </template>
  </TableLimit>
  <CategoryDialog ref="categoryDialogRef" @confirm="onQueryCategories" />
</template>
