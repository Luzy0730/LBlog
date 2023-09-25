<script setup lang="ts">
const categoryModule: { [key: string]: any } = ref({
  about: () => import('@/components/content/config/About.vue'),
  banner: () => import('@/components/content/config/Banner.vue'),
  sitInfo: () => import('@/components/content/config/SitInfo.vue'),
  introduction: () => import('@/components/content/config/Introduction.vue'),
  empty: () => import('@/components/content/config/Empty.vue')
})


const categoryList = [
  { title: '关于我', name: 'about', icon: 'account-pin-box-line' },
  { title: '首页轮播', name: 'banner', icon: 'account-pin-box-line' },
  { title: '站点信息', name: 'sitInfo', icon: 'account-pin-box-line' },
  { title: '个人介绍', name: 'introduction', icon: 'account-pin-box-line' },
]

const categoryName = ref("empty")
const AsyncComp = computed(() => defineAsyncComponent(categoryModule.value[categoryName.value]))
const asyncCompRef = ref()

const instance = getCurrentInstance()
const saveLoading = ref(false)
const refreshLoading = ref(false)

const onRefreshConfig = async () => {
  try {
    refreshLoading.value = true
    await asyncCompRef.value.onRefresh()
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
    refreshLoading.value = false
  }
}

const onSaveConfig = async () => {
  saveLoading.value = true
  try {
    asyncCompRef.value.onConfirm().then((valid?: boolean) => {
      if (!valid) return
      const instance = getCurrentInstance();
      instance?.proxy?.$message({
        type: "success",
        message: "操作成功",
      });
      onRefreshConfig()
    })
  } finally {
    saveLoading.value = false
  }
}

</script>

<template>
  <el-row :gutter="20" v-show="categoryName === 'empty'">
    <el-col :span="4" v-for="category in categoryList" :key="category.title">
      <el-card class="cursor-pointer" @click="categoryName = category.name">
        <Icon :name="category.icon" />
        {{ category.title }}
      </el-card>
    </el-col>
  </el-row>
  <div v-show="categoryName !== 'empty'">
    <el-row class="mb-3">
      <el-button @click="categoryName = 'empty'">返回</el-button>
      <el-button type="primary" @click="onRefreshConfig" :loading="refreshLoading">刷新</el-button>
      <el-button type="success" @click="onSaveConfig" :loading="saveLoading">保存</el-button>
    </el-row>
    <Suspense>
      <AsyncComp ref="asyncCompRef" />
    </Suspense>
  </div>
</template>

