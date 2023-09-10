<script setup lang="ts">
import { queryArticleTag, updateArticleTag } from "@/api/services/tag";

const instance = getCurrentInstance();

const tableData = ref([]);

// 查询标签列表
const onSearchTagList = () => {
  queryArticleTag().then((res) => {
    tableData.value = res.data;
  });
};

// 标签是否启用
const onChangeTagEnable = async (tag: any) => {
  const { id, is_enable } = tag;
  try {
    await updateArticleTag({ id, is_enable });
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
    onSearchTagList();
  }
};

onMounted(() => {
  onSearchTagList();
});
</script>
<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="标签id" width="150" align="center" />
      <el-table-column
        prop="name"
        label="标签名称"
        min-width="150"
        align="center"
      />
      <el-table-column
        prop="color"
        label="标签颜色"
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
            @change="onChangeTagEnable(row)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" width="200" align="center">
        <el-button type="primary" link>编辑</el-button>
        <el-button type="primary" link>删除</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>
