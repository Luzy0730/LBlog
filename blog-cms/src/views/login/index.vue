<script setup lang="ts">
import { useUserStore } from "@/stores";
import { useRouter } from "vue-router";
const { redirect } = defineProps<{
  redirect: string;
}>();
const userStore = useUserStore();
const router = useRouter();

const onLogin = () => {
  userStore.user_login().then(() => {
    router.push(redirect ? { path: redirect } : { path: "/" });
  });
};
</script>
<template>
  <div>
    <el-button type="primary" @click="onLogin">登录</el-button>
  </div>
</template>
