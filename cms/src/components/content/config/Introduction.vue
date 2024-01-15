<script setup lang="ts">
import { queryConfigIntroduction, updateConfigIntroduction } from '@/api/services/config'
import { type UploadFile } from 'element-plus'
import useForm from '@/hooks/useForm'
interface IIntroduction {
  avatar: string;
  name: string;
  github?: string;
  bilibili?: string;
  netease?: string;
  rollText: string;
}
const loading = ref(false)
const { ruleForm, ruleFormRef, rules } = useForm<IIntroduction>({
  formData: {
    avatar: "",
    name: "",
    github: "",
    bilibili: "",
    netease: "",
    rollText: "",
  },
  formRule: {
    avatar: [{ required: true, trigger: "blur", message: "头像不能为空!" }],
    name: [{ required: true, trigger: "blur", message: "昵称不能为空!" }],
    rollText: [{ required: true, trigger: "blur", message: "签名不能为空!" }],
  }
})

const onChange = (uploadFile: UploadFile) => {
  const fileReader = new FileReader();
  fileReader.onload = () => {
    const srcData = fileReader.result as string;
    ruleForm.avatar = srcData
  }
  fileReader.readAsDataURL(uploadFile.raw as File)
}

const onRefresh = async () => {
  loading.value = true
  return queryConfigIntroduction().then(({ data }) => {
    const introduction = data ? JSON.parse(data.introduction) : {}
    Object.assign(ruleForm, introduction)
  }).finally(() => {
    loading.value = false
  })
}

const onConfirm = async () => {
  return ruleFormRef.value.validate().then(async (valid: boolean) => {
    if (valid) {
      const introduction = JSON.stringify(ruleForm)
      const data = { introduction }
      await updateConfigIntroduction(data)
    }
    return valid
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
  <el-form v-loading="loading" ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px">
    <el-form-item label="头像" prop="avatar">
      <el-upload action="" :auto-upload="false" class="w-[150px] h-[150px] block" :show-file-list="false"
        :on-change="onChange">
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