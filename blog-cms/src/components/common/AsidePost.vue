<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="border-b-[1px] h-[60px] leading-[60px] text-center text-2xl">
    <el-button type="primary" class="w-[135px] h-[40px]" @click="() => router.push('/platform')">
      <icon name="upload-2-fill"></icon>投稿
    </el-button>
  </div>
</template>
