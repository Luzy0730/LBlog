<script setup lang="ts">
import {
  queryCategories,
  enableCategory,
  deleteCategory,
} from "@/api/services/category";
import TableLimit from '@/components/content/element/TableLimit.vue'
import CategoryDialog from "@/components/content/category/CategoryDialog.vue";
const categoryDialogRef = ref();

const instance = getCurrentInstance();
const tableData = ref<ICategory[]>([]);
const tableField = [
  { label: '分类id', prop: 'id', args: { width: '150', align: 'center' } },
  { label: '分类名称', prop: 'name', args: { minWidth: '150' } },
  { label: '分类颜色', prop: 'color', args: { minWidth: '150' } },
  { label: '分类图标', prop: 'icon', args: { minWidth: '150', align: 'center' } },
  { label: '是否启用', slotKey: 'is_enable', args: { minWidth: '150' } },
  { label: '操作', slotKey: 'action', args: { width: '200' } },
]
const pagination = ref<IPagination>({
  pageNum: 1,
  pageSize: 10,
  total: 0
});

// 查询分类列表
const onQueryCategories = () => {
  queryCategories({
    pageNum: pagination.value.pageNum,
    pageSize: pagination.value.pageSize
  }).then((res) => {
    tableData.value = res.data.list;
    pagination.value.total = res.data.total
  });
};

// 分类是否启用
const onEnableCategory = async (category: ICategory) => {
  try {
    await enableCategory({
      id: category.id,
      is_enable: category.is_enable === 1 ? 0 : 1
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
  <TableLimit :tableData="tableData" :tableField="tableField" :pagination="pagination"
    @pagination-change="onQueryCategories">
    <template #search>
      <el-row justify="space-between">
        <el-col :span="8"></el-col>
        <el-col :span="8">
          <el-button type="primary" class="float-right" @click="onCreateCategory">新增</el-button>
        </el-col>
      </el-row>
    </template>
    <template #is_enable="{ row }">
      <el-text class="mx-1" :type="row.is_enable === 1 ? 'success' : 'danger'">{{ row.is_enable === 1 ? "已启用" :
        "已废弃" }}</el-text>
    </template>
    <template #action="{ row }">
      <el-button type="primary" link @click="onUpdateCategory(row)">修改</el-button>
      <el-button type="primary" link @click="onEnableCategory(row)">{{ row.is_enable === 1 ? "废弃" : "启用" }}</el-button>
      <el-popconfirm title="确定删除吗?" @confirm="onDeleteCategory(row)">
        <template #reference>
          <el-button type="primary" link>删除</el-button>
        </template>
      </el-popconfirm>
    </template>
  </TableLimit>
  <CategoryDialog ref="categoryDialogRef" @confirm="onQueryCategories" />
</template>
