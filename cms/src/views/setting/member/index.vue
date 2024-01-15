<script setup lang="ts">
import { queryUsers, type UpdateUserParmas, enableUser, deleteUser } from '@/api/services/user';
import TableLimit from '@/components/content/element/TableLimit.vue'
import MemberDialog from '@/components/content/member/MemberDialog.vue';
import PasswordDialog from '@/components/content/member/passwordDialog.vue';
import Search from '@/components/content/element/Search.vue';

const loading = ref(false)
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
  page: 1,
  pageSize: 10,
  total: 0
});
const searchList = reactive([
  { type: 'input', props: { placeholder: '请输入昵称' }, filed: 'nickname' },
  { type: 'input', props: { placeholder: '请输入用户名' }, filed: 'username' },
  { type: 'select', props: { placeholder: '是否启用', clearable: true }, filed: 'state', options: [{ label: '是', value: 1 }, { label: '否', value: 0 }] },
  { type: 'button', value: '查询', events: { click: () => onQueryUsers() } },
  { type: 'button', value: '重置', events: { click: () => resetQuery() } },
  { type: 'button', value: '新增', props: { type: 'primary' }, events: { click: () => memberDialogRef.value.create() } }
])
const searchForm = reactive({
  nickname: undefined,
  username: undefined,
  state: undefined
})

const resetQuery = () => {
  Object.assign(searchForm, {
    nickname: undefined,
    username: undefined,
    state: undefined
  })
  onQueryUsers()
}

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
  loading.value = true
  queryUsers({
    ...searchForm,
    page: pagination.value.page,
    pageSize: pagination.value.pageSize,
  }).then((res) => {
    tableData.value = res.data.data;
    pagination.value.total = res.data.total;
  }).finally(() => {
    loading.value = false
  });
}

async function onEnableUser(user: IUser) {
  try {
    await enableUser({
      id: user.id,
      state: user.state === 1 ? 0 : 1
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
  <TableLimit :tableData="tableData" :tableField="tableField" :loading="loading" :pagination="pagination" @pagination-change="onQueryUsers">
    <template #search>
      <Search :searchList="searchList" :searchForm="searchForm" />
    </template>
    <template #avatar="{ row }">
      <el-image style="width: 50px; height: 50px" :src="row.avatar || '/image/avatar.png'" fit="cover" />
    </template>
    <template #info="{ row }">
      <div class="flex flex-col">
        <div>昵称：{{ row.nickname }}</div>
        <div>用户名：{{ row.username }}</div>
      </div>
    </template>
    <template #state="{ row }">
      <el-text class="mx-1" :type="row.state === 1 ? 'success' : 'danger'">{{ row.state === 1 ? "启用" : "禁用"
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
      <el-button type="primary" link @click="onEnableUser(row)">{{ row.state === 1 ? "禁用" : "启用" }}</el-button>
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