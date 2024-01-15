<script setup lang="ts">
import { useUserStore } from "@/stores";
import { useRouter } from "vue-router";
import useForm from '@/hooks/useForm'

const { ruleForm, ruleFormRef, rules } = useForm<ILogin>({
  formData: {
    username: "",
    password: ""
  },
  formRule: {
    username: [{ required: true, trigger: "blur", message: "账号不能为空!" }],
    password: [{ required: true, trigger: "blur", message: "密码不能为空!" }],
  }
})
const { redirect } = defineProps<{
  redirect?: string;
}>();
const userStore = useUserStore();
const router = useRouter();

const onLogin = () => {
  ruleFormRef.value.validate().then(async (valid: boolean) => {
    if (valid) {
      userStore.user_login(ruleForm).then(() => {
        router.push(redirect ? { path: redirect } : { path: "/" });
      });
    }
  })

};
</script>
<template>
  <div class="login w-full h-screen">
    <el-row>
      <el-col :lg="14" :sm="0"></el-col>
      <el-col :lg="6" :sm="24" class="pt-[30vh] px-10">
        <h1 class="text-5xl mb-3">hello！</h1>
        <p class="text-xl">欢迎来到博客后台管理系统！</p>
        <p class="text-xl">基于vue3.3 + element-plus开发</p>
        <el-form class="mt-4" ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules">
          <el-form-item prop="username">
            <el-input class="h-10" prefix-icon="User" placeholder="请输入用户名" v-model="ruleForm.username" @keydown.enter="onLogin" />
          </el-form-item>
          <el-form-item prop="password" class="">
            <el-input class="h-10" prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="ruleForm.password" @keydown.enter="onLogin" />
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="onLogin" class="w-60 h-12">登录</el-button>
      </el-col>
      <el-col :lg="2" :sm="0"></el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.login {
  background: url('/image/background.jpg') 50% fixed no-repeat;
  background-size: cover;
}
</style>
