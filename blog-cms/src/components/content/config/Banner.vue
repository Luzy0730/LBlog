<script setup lang="ts">
import { queryConfigBanner, updateConfigBanner } from '@/api/services/config'
import BannerDialog, { type IBanner } from './BannerDialog.vue';
const title = ref("LL's Blog")
const bannerList = ref([{
  sort: 1,
  id: 1,
  url: 'https://lblog-aliyun.oss-cn-beijing.aliyuncs.com/bg1.jpg'
}, {
  sort: 2,
  id: 2,
  url: 'https://lblog-aliyun.oss-cn-beijing.aliyuncs.com/bg2.png'
}, {
  sort: 3,
  id: 3,
  url: 'https://lblog-aliyun.oss-cn-beijing.aliyuncs.com/bg3.jpg'
}])

const bannerDialogRef = ref()
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
  <BannerDialog ref="bannerDialogRef" @update="onUpdateBanner" />
  <el-card>
    <el-input v-model="title" placeholder="标题" />
  </el-card>
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
      </template>
    </el-table-column>
  </el-table>
</template>