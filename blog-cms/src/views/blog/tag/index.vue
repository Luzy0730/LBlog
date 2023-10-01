<script setup lang="ts">
import { queryTags, enableTag, deleteTag } from "@/api/services/tag";
import TableLimit from '@/components/content/element/TableLimit.vue'
import TagDialog from "@/components/content/tag/TagDialog.vue";
const tagDialogRef = ref();

const instance = getCurrentInstance();

const tableData = ref<ITag[]>([]);
const tableField = [
  { label: '标签id', prop: 'id', args: { width: '150', align: 'center' } },
  { label: '标签名称', prop: 'name', args: { minWidth: '150' } },
  { label: '标签颜色', prop: 'color', args: { minWidth: '150' } },
  { label: '是否启用', slotKey: 'is_enable', args: { minWidth: '150' } },
  { label: '操作', slotKey: 'action', args: { width: '200' } },
]
const pagination = ref<IPagination>({
  pageNum: 1,
  pageSize: 10,
  total: 0
});

// 查询标签列表
const onQueryTags = () => {
  queryTags({
    pageNum: pagination.value.pageNum,
    pageSize: pagination.value.pageSize
  }).then((res) => {
    tableData.value = res.data.list;
    pagination.value.total = res.data.total
  });
};

// 标签是否启用
const onEnableTag = async (tag: ITag) => {
  try {
    await enableTag({
      id: tag.id,
      is_enable: tag.is_enable === 1 ? 0 : 1
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
  <TableLimit :tableData="tableData" :tableField="tableField" :pagination="pagination" @pagination-change="onQueryTags">
    <template #search>
      <el-row justify="space-between">
        <el-col :span="8"></el-col>
        <el-col :span="8">
          <el-button type="primary" class="float-right" @click="onCreateTag">新增</el-button>
        </el-col>
      </el-row>
    </template>
    <template #is_enable="{ row }">
      <el-text class="mx-1" :type="row.is_enable === 1 ? 'success' : 'danger'">{{ row.is_enable === 1 ? '已发布' : '已下架'
      }}</el-text>
    </template>
    <template #action="{ row }">
      <el-button type="primary" link @click="onUpdateTag(row)">修改</el-button>
      <el-button type="primary" link @click="onEnableTag(row)">{{ row.is_enable === 1 ? "下架" : "发布" }}</el-button>
      <el-popconfirm title="确定删除吗?" @confirm="onDeleteTag(row)">
        <template #reference>
          <el-button type="primary" link>删除</el-button>
        </template>
      </el-popconfirm>
    </template>
  </TableLimit>
  <TagDialog ref="tagDialogRef" @confirm="onQueryTags" />
</template>
