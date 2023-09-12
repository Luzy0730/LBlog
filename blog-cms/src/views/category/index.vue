<script setup lang="ts">
import {
  queryCategory,
  enableCategory,
  deleteCategory,
} from "@/api/services/category";
import CategoryDialog from "@/components/content/category/CategoryDialog.vue";
const categoryDialogRef = ref();

const instance = getCurrentInstance();

const tableData = ref([]);
// 查询分类列表
const onQueryCategory = () => {
  queryCategory().then((res) => {
    tableData.value = res.data;
  });
};

// 分类是否启用
const onEnableCategory = async (category: ICategory) => {
  const { id, is_enable } = category;
  try {
    await enableCategory({ id, is_enable });
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
    onQueryCategory();
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
    onQueryCategory();
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
  onQueryCategory();
});
</script>
<template>
  <el-row justify="space-between">
    <el-col :span="8"></el-col>
    <el-col :span="8">
      <el-button type="primary" class="float-right" @click="onCreateCategory"
        >新增</el-button
      >
    </el-col>
  </el-row>
  <el-table :data="tableData" class="mt-5">
    <el-table-column prop="id" label="分类id" width="150" align="center" />
    <el-table-column
      prop="name"
      label="分类名称"
      min-width="150"
      align="center"
    />
    <el-table-column
      prop="color"
      label="分类颜色"
      min-width="150"
      align="center"
    />
    <el-table-column
      prop="icon"
      label="分类图标"
      min-width="150"
      align="center"
    />
    <el-table-column
      prop="is_enable"
      label="是否启用"
      min-width="150"
      align="center"
    >
      <template #default="{ row }">
        <el-switch
          v-model="row.is_enable"
          :active-value="1"
          :inactive-value="0"
          @change="onEnableCategory(row)"
        />
      </template>
    </el-table-column>
    <el-table-column prop="" label="操作" width="200" align="center">
      <template #default="{ row }">
        <el-button type="primary" link @click="onUpdateCategory(row)"
          >编辑</el-button
        >
        <el-popconfirm title="确定删除吗?" @confirm="onDeleteCategory(row)">
          <template #reference>
            <el-button type="primary" link>删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <CategoryDialog ref="categoryDialogRef" @confirm="onQueryCategory" />
</template>
