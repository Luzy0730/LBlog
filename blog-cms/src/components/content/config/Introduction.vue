<script setup lang="ts">
import useForm from '@/hooks/useForm'
interface IIntroduction {
  avatar: string;
  name: string;
  github?: string;
  bilibili?: string;
  netease?: string;
  rollText: string;
}
const { ruleForm, ruleFormRef, rules } = useForm<IIntroduction>({
  formData: {
    avatar: "https://lblog-aliyun.oss-cn-beijing.aliyuncs.com/avatar.jpg",
    name: "LL",
    github: "https://github.com/Lzy0730",
    bilibili: "https://space.bilibili.com/2192338",
    netease: "https://music.163.com/#/user/home?id=433024891",
    rollText: "个人简介：我是真菜",
  },
  formRule: {
    avatar: [{ required: true, trigger: "blur", message: "头像不能为空!" }],
    name: [{ required: true, trigger: "blur", message: "昵称不能为空!" }],
    rollText: [{ required: true, trigger: "blur", message: "签名不能为空!" }],
  }
})
</script>
<template>
  <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px">
    <el-form-item label="头像" prop="avatar">
      <el-upload action="" :auto-upload="false" class="w-[150px] h-[150px] block" :show-file-list="false">
        <img v-if="ruleForm.avatar" :src="ruleForm.avatar" />
        <el-icon v-else class="avatar-uploader-icon">
          <Plus />
        </el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item label="昵称" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item label="签名" prop="rollText">
      <el-input v-model="ruleForm.rollText" />
    </el-form-item>
    <el-form-item label="GitHub" prop="github">
      <el-input v-model="ruleForm.github" />
    </el-form-item>
    <el-form-item label="哔哩哔哩" prop="bilibili">
      <el-input v-model="ruleForm.bilibili" />
    </el-form-item>
    <el-form-item label="网易云" prop="netease">
      <el-input v-model="ruleForm.netease" />
    </el-form-item>
  </el-form>
</template>