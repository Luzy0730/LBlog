<script setup lang="ts">
import { queryUsers, type UpdateUserParmas, enableUser, deleteUser } from '@/api/services/user';
import TableLimit from '@/components/content/element/TableLimit.vue'
import MemberDialog from '@/components/content/member/MemberDialog.vue';
import PasswordDialog from '@/components/content/member/passwordDialog.vue';

const tableData = ref<IUser[]>([]);
const tableField = [
  { label: 'id', prop: 'id', args: { width: '100', align: 'center' } },
  { label: '头像', slotKey: 'avatar', args: { width: '150', align: 'center' } },
  { label: '用户信息', slotKey: 'info', args: { minWidth: '150' } },
  { label: '状态', slotKey: 'state', args: { width: '150', align: 'center' } },
  { label: '时间', slotKey: 'time', args: { width: '300' } },
  { label: '操作', slotKey: 'action', args: { width: '300' } },
]
const pagination = ref<IPagination>({
  pageNum: 1,
  pageSize: 10,
  total: 0
});

const instance = getCurrentInstance();
const timeFormat = computed(() => (time: string) => instance?.proxy?.$dayjs(time).format('YYYY-MM-DD HH:mm:ss'))

const memberDialogRef = ref()
const onEditUser = (row: UpdateUserParmas) => {
  memberDialogRef.value.update(row)
}
const passwordDialogRef = ref()
const onEditPassword = (row: UpdateUserParmas) => {
  passwordDialogRef.value.update(row)
}

function onQueryUsers() {
  queryUsers({
    pageNum: pagination.value.pageNum,
    pageSize: pagination.value.pageSize,
  }).then((res) => {
    tableData.value = res.data.list;
    pagination.value.total = res.data.total;
  });
}

async function onEnableUser(user: IUser) {
  try {
    await enableUser({
      id: user.id,
      isEnable: user.isEnable === 1 ? 0 : 1
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
    onQueryUsers();
  }
}

// 删除用戶
async function onDeleteUser(user: IUser) {
  const { id } = user;
  try {
    await deleteUser({ id });
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
    onQueryUsers();
  }
}

onMounted(() => {
  onQueryUsers()
})
</script>

<template>
  <PasswordDialog ref="passwordDialogRef" />
  <MemberDialog ref="memberDialogRef" @success="onQueryUsers" />
  <TableLimit :tableData="tableData" :tableField="tableField" :pagination="pagination" @pagination-change="onQueryUsers">
    <template #avatar="{ row }">
      <el-image style="width: 100px; height: 100px" :src="row.avatar" fit="cover" />
    </template>
    <template #info="{ row }">
      <div class="flex flex-col">
        <div>昵称：{{ row.nickname }}</div>
        <div>用户名：{{ row.username }}</div>
        <div>身份：{{ row.isAdmin ? "管理员" : "用户" }}</div>
      </div>
    </template>
    <template #state="{ row }">
      <el-text class="mx-1" :type="row.isEnable === 1 ? 'success' : 'danger'">{{ row.isEnable === 1 ? "启用" : "禁用"
      }}</el-text>
    </template>
    <template #time="{ row }">
      <div class="flex flex-col">
        <div>注册时间：{{ timeFormat(row.createTime) }}</div>
      </div>
    </template>
    <template #action="{ row }">
      <el-button type="primary" link @click="onEditUser(row)">修改</el-button>
      <el-divider direction="vertical" />
      <el-button type="primary" link @click="onEnableUser(row)">{{ row.isEnable === 1 ? "禁用" : "启用" }}</el-button>
      <el-divider direction="vertical" />
      <el-button type="primary" link @click="onEditPassword(row)">修改密码</el-button>
      <el-divider direction="vertical" />
      <el-popconfirm title="确定删除吗?" @confirm="onDeleteUser(row)">
        <template #reference>
          <el-button type="primary" link>删除</el-button>
        </template>
      </el-popconfirm>
    </template>
  </TableLimit>
</template>