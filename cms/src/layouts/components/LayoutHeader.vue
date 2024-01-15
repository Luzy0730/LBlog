<script setup lang="ts">
import { useUserStore } from "@/stores/index";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter()

const onCommand = (command: string) => {
  if (command === 'logout') {
    userStore.user_logout()
  }
}
</script>

<template>
  <div class="shadow-md h-full px-5 flex items-center justify-between select-none">
    <div></div>
    <div class="flex items-center">
      <div>欢迎回来,</div>
      <el-dropdown class="mx-4" trigger="click" @command="onCommand">
        <span class="el-dropdown-link text-sky-600">
          {{ userStore.userInfo.nickname }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-image class="w-10 h-10 rounded-[20px]" :src="userStore.userInfo.avatar || '/image/avatar.png'" fit="cover" />
    </div>
  </div>
</template>

<style lang="scss"></style>
