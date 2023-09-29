<script setup lang="ts">
import { queryUsers } from '@/api/services/user';

const instance = getCurrentInstance();

const timeFormat = computed(() => (time: string) => instance?.proxy?.$dayjs(time).format('YYYY-MM-DD HH:mm:ss'))

const tableData = ref<IUser[]>([]);

onMounted(() => {
  queryUsers().then((res) => {
    tableData.value = res.data.list;
  });
})
</script>

<template>
  <el-table :data="tableData" class="mt-5">
    <el-table-column prop="id" label="用户id" width="100" align="center" fixed="left" />
    <el-table-column prop="avatar" label="头像" width="150" align="center">
      <template #default="{ row }">
        <el-image style="width: 100px; height: 100px" :src="row.avatar" fit="cover" />
      </template>
    </el-table-column>
    <el-table-column label="用户信息" min-width="150" align="left">
      <template #default="{ row }">
        <div class="flex flex-col">
          <div>昵称：{{ row.nickname }}</div>
          <div>用户名：{{ row.username }}</div>
          <div>身份：{{ row.isAdmin ? "管理员" : "用户" }}</div>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="is_enable" label="状态" width="150" align="center">
      <template #default="{ row }">
        <el-text class="mx-1" :type="row.isEnable === 1 ? 'success' : 'danger'">{{ row.isEnable === 1 ? "启用" : "禁用"
        }}</el-text>
      </template>
    </el-table-column>
    <el-table-column label="时间" width="300" align="left">
      <template #default="{ row }">
        <div class="flex flex-col">
          <div>创建时间：{{ timeFormat(row.createTime) }}</div>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="" label="操作" width="300" align="left" fixed="right">
      <template #default="{ row }">
        <el-button type="primary" link>修改</el-button>
        <el-divider direction="vertical" />
        <el-button type="primary" link>禁用</el-button>
        <el-divider direction="vertical" />
        <el-button type="primary" link>修改密码</el-button>
        <el-divider direction="vertical" />
        <el-button type="primary" link>删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>