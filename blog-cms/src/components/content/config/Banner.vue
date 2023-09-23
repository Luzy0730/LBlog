<script setup lang="ts">
import { queryConfigBanner, updateConfigBanner } from '@/api/services/config'
import BannerDialog, { type IBanner } from './BannerDialog.vue';
const title = ref("LL's Blog")
const bannerList = ref<IBanner[]>([])

const bannerDialogRef = ref()

// 新增
const onCreate = () => {
  bannerDialogRef.value.create()
}
const onUpdate = (row: IBanner) => {
  bannerDialogRef.value.update(row)
}

const onRefresh = async () => {
  return queryConfigBanner().then(({ data }) => {
    const banner = data.banner ? JSON.parse(data.banner) : {}
    bannerList.value = banner.list || []
    title.value = banner.title || ""
  })
}
// 删除
const onDelete = (index: number) => {
  bannerList.value.splice(index, 1)
}
// 弹窗新增和更新事件
const onCreateBanner = (banner: IBanner) => {
  bannerList.value.push(banner)
}
const onUpdateBanner = (banner: IBanner) => {
  const find = bannerList.value.find(item => item.id === banner.id)
  if (find) {
    Object.assign(find, banner)
  }
}

const onConfirm = async () => {
  const list = bannerList.value.sort((a, b) => a.sort - b.sort)
  return updateConfigBanner({
    banner: JSON.stringify({
      title: title.value,
      list
    })
  })
}

onMounted(() => {
  onRefresh()
})

defineExpose({
  onConfirm,
  onRefresh
})

</script>

<template>
  <BannerDialog ref="bannerDialogRef" @update="onUpdateBanner" @create="onCreateBanner" />
  <el-card>
    <el-input v-model="title" placeholder="标题" />
  </el-card>
  <el-row class="mt-3">
    <el-col :span="24">
      <el-button class="float-right" @click="onCreate">新增</el-button>
    </el-col>
  </el-row>
  <el-table class="mt-3" border :data="bannerList" show-overflow-tooltip>
    <el-table-column prop="sort" label="序号" width="100" align="center" />
    <el-table-column prop="url" label="图片" width="250" align="center">
      <template #default="{ row }">
        <el-image :src="row.url" fit="cover"></el-image>
      </template>
    </el-table-column>
    <el-table-column prop="url" label="图片地址" min-width="250" align="center" />
    <el-table-column prop="" label="操作" width="120" align="center" fixed="right">
      <template #default="{ row, $index }">
        <el-button type="primary" link @click="onUpdate(row)">编辑</el-button>
        <el-popconfirm title="确定删除吗?" @confirm="() => onDelete($index)">
          <template #reference>
            <el-button type="primary" link>删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>