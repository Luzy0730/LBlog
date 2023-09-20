<script setup lang="ts">
const title = ref("LL's Blog")
const bannerList = ref([{
  id: 1,
  url: 'https://lblog-aliyun.oss-cn-beijing.aliyuncs.com/bg1.jpg'
}, {
  id: 1,
  url: 'https://lblog-aliyun.oss-cn-beijing.aliyuncs.com/bg2.png'
}, {
  id: 1,
  url: 'https://lblog-aliyun.oss-cn-beijing.aliyuncs.com/bg3.jpg'
}])
</script>

<template>
  <el-card>
    <el-input v-model="title" placeholder="标题" />
  </el-card>
</template>